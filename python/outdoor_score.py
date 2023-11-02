import pandas as pd
import os
from pymongo import MongoClient
from abbreviate_state import *
from dotenv import load_dotenv

load_dotenv("../.env")

db_url = os.getenv("MONGODB_URL")

# connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# url for % spent per state data
url = 'https://www.bea.gov/sites/default/files/2022-11/orsa1122-State.xlsx'

# import and clean protected areas dataset
df1 = pd.read_excel("./static_datasets/pad.xlsx")
df1 = df1[["State Name", "% of Total Area Protected as GAP 1-3"]]
df1 = df1.set_axis(['state', 'percent_coverage'], axis=1)
df1 = df1.drop([51])

# import and clean % spent per state dataset
df2 = pd.read_excel(url, skiprows=[0, 1, 2], header=None)
df2 = df2[[0, 2]]
df2 = df2.set_axis(['state', 'spent_percent'], axis=1)
df2 = df2.drop([51, 52])

# import and clean air quality dataset
df3 = pd.read_csv("./static_datasets/aqi.csv")
df3 = df3[["CBSA", "Median AQI"]]
df4 = df3['CBSA'].str.split(', ', expand=True)
df4 = df4.sort_values(0)
df3 = pd.concat([df3, df4], axis=1)
df3 = df3.drop(['CBSA'], axis=1)
city_df = df3.rename({0: "name", 1: "state"}, axis=1)
city_df = city_df[city_df["Median AQI"] > 0]

# import and clean chemical releases dataset
df5 = pd.read_csv("./static_datasets/release.csv", skiprows=[0, 1, 2, 3, 4], header=None)
df5 = df5.iloc[:-68]
df5 = df5[[1, 4]]
df5 = df5.rename({1: "state", 4: "lbs"}, axis=1)
df5.reset_index(drop=True, inplace=True)

# import and clean census state mileage dataset
df6 = pd.read_html("https://www.census.gov/geographies/reference-files/2010/geo/state-area.html", skiprows=[0, 1], header=None)[0]
df6 = df6.iloc[1:52, [0, 1]]
df6 = df6.set_axis(['state', 'sq_miles'], axis=1)
df6.reset_index(drop=True, inplace=True)

# merge state datasets together and clean
df7 = df5.join(df6, lsuffix="_left", rsuffix="_right")
df7 = df7.iloc[:, [0, 1, 3]]
df7 = df7.set_axis(['state', 'lbs', 'sq_miles'], axis=1)
df8 = pd.read_excel("./static_datasets/trails.xlsx")
df9 = pd.merge(df7, df8, on="state")
df = pd.merge(df1, df2, left_index=True, right_index=True, how="outer")
df = df[["state_x", "percent_coverage", "spent_percent"]]
df = df.set_axis(['state', 'percent_coverage', "spent_percent"], axis=1)
df["percent_coverage"] = df['percent_coverage']*100
df = df.join(df9, lsuffix="_left", rsuffix="_right")
df = df.drop(["state_right"], axis=1)
df['sq_miles'] = df['sq_miles'].astype(float)
df['lbs'] = df['lbs'].str.strip()
df['lbs'] = df['lbs'].str.replace(",", "").astype(float) / df['sq_miles']
df['trail_miles'] = df['trail_miles'].astype(float) / df['sq_miles']
state_df = df.rename({"state_left": "state"}, axis=1)
state_df['state'] = state_df['state'].apply(abbreviate)

# for every city, calculate outdoors score
for city in cities.find():
    row = city_df[city_df['name'].str.contains("(?<![A-z])" + city['name']) & city_df['state'].str.contains(city['state'])]
    row2 = state_df[state_df['state'] == city['state']]
    if not row.empty:
        outdoor_score = int(
                ((float(row2.values[0][1])*(100/state_df['percent_coverage'].max())*2) 
                             + (float(row2.values[0][2])*(100/state_df['spent_percent'].max())*1) 
                             + (1/float(row.values[0][0])*(100/(1/city_df['Median AQI'].min()))*0.5)
                             + (1/float(row2.values[0][3])*(100/(1/state_df['lbs'].min()))*1.5)
                             + (float(row2.values[0][5])*(100/state_df['trail_miles'].max())*1.5))
                             /6.5)
        query = {'name': city['name'], 'state': city['state']}
        values = { "$set": { "outdoor_score": outdoor_score}}
        cities.update_one(query, values)

# Remove cities without outdoor score
cities.delete_many({ "outdoor_score": {"$exists": False} })

# curve all the outdoor scores so that the highest is 100
max = cities.find_one(sort=[("outdoor_score", -1)])
for city in cities.find():
    query = {'name': city['name'], 'state': city['state']}
    normalized_score = int(city['outdoor_score'] + (100 - max["outdoor_score"]))
    values = { "$set": { "outdoor_score": normalized_score}}
    cities.update_one(query, values)