import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient, UpdateOne

# Load environment variables
load_dotenv("../.env")

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client['uds']['cities']

# Retrieve WalkScore API Key
ws_api_key = os.getenv("WALKSCORE_API_KEY")

# Call WalkScore API & update DB
writes = []
for city in cities.find():
    url = "https://api.walkscore.com/score?format=json&&lat=" + str(city['latitude']) + "&lon=" + str(city['longitude']) + "&bike=1&wsapikey=" + ws_api_key
    response = requests.get(url).json()
    query = { "_id": city["_id"] }
    values = { "$set": { "walkscore":  response['walkscore'], 
                        "bikescore": response['bike']['score']} }
    writes.append(UpdateOne(query, values))

cities.bulk_write(writes)