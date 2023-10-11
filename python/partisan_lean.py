import pandas as pd
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from abbreviate_state import *

load_dotenv("../.env")

# DB connection string
db_url = os.getenv("MONGODB_URL")

# Connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# Import csv and clean
df = pd.read_csv("https://github.com/fivethirtyeight/data/blob/master/partisan-lean/fivethirtyeight_partisan_lean_STATES.csv?raw=true")
df['state'] = df['state'].apply(abbreviate)

# Update DB values
for row in df.to_dict("records"):
    query = { "state": row["state"] }
    values = { "$set": { "partisan_lean":  row['2022'] } }
    cities.update_many(query, values)