import os
from dotenv import load_dotenv
import pandas as pd
from pymongo import MongoClient
from abbreviate_state import *

load_dotenv("../.env")

# must change cities.py to include counties to match with this data in the db

# variables for atlas connection
db_url = os.getenv("MONGODB_URL")

# Connect to DB
client = MongoClient(db_url)
cities = client["uds"]["cities"]

df = pd.read_json(
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-cities-demographics/exports/json?lang=en&timezone=America%2FNew_York"
)
df = df[["city", "state", "median_age"]]
df['state'] = df['state'].apply(abbreviate)
df = df.rename(columns={"city": "name"})
print(df)

for city in cities.find():
    name = city["name"].replace("St.", "Saint").replace("town", "").replace(" City", "")
    row = df[df['city'].str.contains("(?<![A-z])" + name) & df['state'].str.contains(city['state'])]
    if not row.empty:
        query = { "state": city['state'], "name": city['name'] }
        values = { "$set": { "median_age":  row.values[0][2] } }
        cities.update_one(query, values)
