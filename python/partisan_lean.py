import pandas as pd
import os
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateMany
from data_utils import *

# Load environment variables
load_dotenv("../.env")

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client['uds']['cities']

# Ingest and clean partisan lean csv
df = pd.read_csv("https://github.com/fivethirtyeight/data/blob/master/partisan-lean/fivethirtyeight_partisan_lean_STATES.csv?raw=true")
df['state'] = df['state'].apply(abbreviate)

# Update DB with partisan lean values
writes = []
for row in df.to_dict("records"):
    query = { "state": row["state"] }
    values = { "$set": { "partisan_lean":  row['2022'] } }
    writes.append(UpdateMany(query, values))

cities.bulk_write(writes)