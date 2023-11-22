import os
from dotenv import load_dotenv
import pandas as pd
from pymongo import MongoClient, UpdateOne
from data_utils import *

# Load environment variables
load_dotenv("../.env")

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client["uds"]["cities"]

# Ingest & clean age data
df = pd.read_json(
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-cities-demographics/exports/json?lang=en&timezone=America%2FNew_York"
)
df = df[["city", "state", "median_age"]]
df['state'] = df['state'].apply(abbreviate)

# Update DB with age data
writes = []
for city in cities.find():
    name = city["name"].replace("St.", "Saint").replace("town", "").replace(" City", "")
    row = df[df['city'].str.contains("(?<![A-z])" + name) & df['state'].str.contains(city['state'])]
    if not row.empty:
        query = { "state": city['state'], "name": city['name'] }
        values = { "$set": { "median_age":  row.values[0][2] } }
        writes.append(UpdateOne(query, values))

cities.bulk_write(writes)