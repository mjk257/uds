import pandas as pd
import requests
import time
from pymongo import MongoClient

# method for formatting the state column
def transform(x):
    return x['code'][3:5]

# url for cities api
api_url = "https://countries-cities.p.rapidapi.com/location/country/US/city/list"

# url for atlas connection string (need to fill in credentials)
db_url = "mongodb+srv://admin:<password>@cluster0.qcqwyum.mongodb.net/?retryWrites=true&w=majority"

# headers for api request
headers = {
	"X-RapidAPI-Key": "5dbacafc35msh9a01b02148a72f9p12fda1jsn167dab8a827c",
	"X-RapidAPI-Host": "countries-cities.p.rapidapi.com"
}

# api limit of 1 request per second so wait between requests
# note that currently 341 cities with >100,000 and 100 results per page with free model
# so 4 requests but could increase in the future
response1 = requests.get(url, headers=headers, params={"page": "1", "population":"100000"})
time.sleep(2)
response2 = requests.get(url, headers=headers, params={"page": "2", "population":"100000"})
time.sleep(2)
response3 = requests.get(url, headers=headers, params={"page": "3", "population":"100000"})
time.sleep(2)
response4 = requests.get(url, headers=headers, params={"page": "4", "population":"100000"})

# convert api responses to pandas dataframes
df1 = pd.DataFrame.from_dict(response1.json()['cities'])
df2 = pd.DataFrame.from_dict(response2.json()['cities'])
df3 = pd.DataFrame.from_dict(response3.json()['cities'])
df4 = pd.DataFrame.from_dict(response4.json()['cities'])
df = pd.concat([df1, df2, df3, df4])

# format state column and drop unneeded data
df['state'] = df['division'].apply(transform)
df = df.drop(['division', 'country', 'geonameid'], axis=1)
df.reset_index(inplace = True, drop = True)

# import data into MongoDB collection
client = MongoClient(db_url)
db = client['uds']
db['cities'].insert_many(df.to_dict("records"))