import os
from dotenv import load_dotenv
import pandas as pd
from pymongo import MongoClient

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

df = df.filter(["city", "state_code", "median_age"])
df = df.rename(
    columns={"state_code": "state", "city": "name"}
)
print(df)

for row in df.to_dict("records"):
    query = { "state": row["state"], "name": row['name'] }
    values = { "$set": { "median_age":  row['median_age'] } }
    cities.update_many(query, values)
