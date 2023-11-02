import pandas as pd
import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from abbreviate_state import *

load_dotenv("../.env")

# variables for atlas connection
db_url = os.getenv("MONGODB_URL")

# Connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# function to clean city name from census data
def clean_name(x):
    if("-" in x):
        return x.split("-")[0]
    if("/" in x):
        return x.split("/")[0]
    if("city" in x):
        return x.split(" city")[0]
    if("town" in x):
        return x.split(" town")[0]
    if("municipality" in x):
        return x.split(" municipality")[0]
    if("CDP" in x):
        return x.split("Urban ")[1].split(" CDP")[0]
    return x

# census API call
response = requests.get("http://api.census.gov/data/2019/pep/population?get=NAME,DENSITY,POP&for=place:*&key=25ec91bd81fdfa691c08dbaf06adc71c3a2918d6")

# clean census data
df = pd.DataFrame(response.json(), columns=['name', 'density', 'population', '0', '1'])
df = df.drop(['0', '1'], axis=1)
df = df.drop(0, axis=0)
df['population'] = df['population'].astype(int)
df = df[df['population'] > 100000]
df = df.sort_values('name')
df1 = df['name'].str.split(', ', expand=True)
df1 = df1.sort_values(0)
df = pd.concat([df, df1], axis=1)
df = df.drop(['name'], axis=1)
df = df.rename({0: "name", 1: "state"}, axis=1)
df['state'] = df['state'].apply(abbreviate)
df['name'] = df['name'].apply(clean_name)
df['density'] = df['density'].astype(float).astype(int)
df = df.sort_values('name')
df.reset_index(inplace = True, drop = True)

# add columns for latitude and longitude
df.insert(4, column='latitude', value=0)
df.insert(4, column='longitude', value=0)

# call geocoding API
for i, row in df.iterrows():
    api_url = "https://geocode.maps.co/search?city=" + df.at[i, 'name'].replace(" ", "+") + "&state=" + df.at[i, 'state'] + "&country=US"
    coordinates = requests.get(api_url)
    while coordinates.status_code != 200:
        coordinates = requests.get(api_url)
    df.at[i, 'latitude'] = float(coordinates.json()[0]['lat'])
    df.at[i, 'longitude'] = float(coordinates.json()[0]['lon'])

# add to database
for row in df.to_dict("records"):
    cities.replace_one({'name': row.get('name'), 'state': row.get('state')}, row, upsert=True)