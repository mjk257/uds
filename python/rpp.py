import os
from dotenv import load_dotenv
import pandas as pd
from pymongo import MongoClient, UpdateOne
from data_utils import *

# Load environment variables
load_dotenv("../.env")

# Ingest and clean data for city RPPs
df = pd.read_excel("https://www.bea.gov/sites/default/files/2022-12/rpp1222.xlsx", sheet_name="Table 4", skiprows=[0, 1, 2, 3])
df = df.drop(["Unnamed: 2", "Unnamed: 3", "Unnamed: 4", "Unnamed: 5", "Unnamed: 6", "Unnamed: 7"], axis=1)
df = df.drop([0, 1, 2, 387, 388, 389, 390, 391, 392, 393], axis=0)
df = df.rename({"Unnamed: 0": "city", "Unnamed: 1": "rpp"}, axis=1)

# Reformat cities and states to match DB
df1 = df['city'].str.split(', ', expand=True)
df1 = df1.sort_values(0)
df = pd.concat([df, df1], axis=1)
df = df.drop(['city'], axis=1)
df = df.rename({0: "city", 1: "state"}, axis=1)
df.reset_index(inplace = True, drop = True)

# Ingest data for state RPPs
state_df = pd.read_excel("https://www.bea.gov/sites/default/files/2022-12/rpp1222.xlsx", sheet_name="Table 2", skiprows=[0, 1, 2])
state_df = state_df[["Unnamed: 0", "Unnamed: 1"]]
state_df = state_df.drop([0, 52, 53, 54, 55, 56, 57, 58], axis=0)
state_df = state_df.rename({"Unnamed: 0": "state", "Unnamed: 1": "rpp"}, axis=1)
state_df['state'] = state_df['state'].apply(abbreviate)

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client['uds']['cities']

# Update DB with RPP
writes = []
for city in cities.find():
    row = df[df['city'].str.contains("(?<![A-z])" + city['name']) & df['state'].str.contains(city['state'])]
    row2 = state_df[state_df['state'] == city['state']]
    rpp = 0
    # Use city RPP if present
    if not row.empty:
        rpp = row.values[0][0]
    # Otherwise use state RPP
    else:
        rpp = row2.values[0][1]
    query = {'name': city['name'], 'state': city['state']}
    values = { "$set": { "rpp": rpp}}
    writes.append(UpdateOne(query, values))

cities.bulk_write(writes)
