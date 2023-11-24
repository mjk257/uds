import pandas as pd
import os
from data_utils import *
from pymongo import MongoClient, UpdateOne
from dotenv import load_dotenv

# Load environment variables
load_dotenv("../.env")

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client['uds']['cities']

# Ingest & clean static dataset
df = pd.read_excel("./static_datasets/offenses.xls", skiprows=[0, 1, 2])
df.drop(df.tail(10).index, inplace = True)
df = df.fillna(method='ffill', axis=0)
df['state'] = df['State'].str.title().replace('\d+', '', regex=True)
df['state'] = df['state'].apply(abbreviate)
df['name'] = df['City'].str.replace('\d+', '', regex=True)

# Calculate crime rate per 100,000 people
df['crime'] = (df['Violent\ncrime'].astype(float) / df['Population'].astype(float) * 100000).astype(int)
df = df[['state', 'name', 'crime']]

# Update database
writes = []
for city in cities.find():
    name = city["name"].replace("town", "").replace(" City", "")
    row = df[df['name'].str.contains("(?<![A-z])" + name) & df['state'].str.contains(city['state'])]
    if not row.empty:
        query = {'name': city['name'], 'state': city['state']}
        values = { "$set": { "crime_rate": row.values[0][2]}}
        writes.append(UpdateOne(query, values))

cities.bulk_write(writes)