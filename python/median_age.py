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
    "C:\Users\tyler\Downloads\us-cities-demographics.json"
)
df = df[df.YEAR == 4]
df = df.filter(["STNAME", "CTYNAME", "MEDIAN_AGE_TOT"])
df = df.rename(
    columns={"STNAME": "state", "CTYNAME": "county", "MEDIAN_AGE_TOT": "median_age"}
)
df["state"] = df["state"].apply(abbreviate)
