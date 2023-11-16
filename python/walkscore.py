import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv("../.env")

db_url = os.getenv("MONGODB_URL")

client = MongoClient(db_url)
cities = client['uds']['cities']

ws_api_key = os.getenv("WALKSCORE_API_KEY")

for city in cities.find():
    url = "https://api.walkscore.com/score?format=json&&lat=" + str(city['latitude']) + "&lon=" + str(city['longitude']) + "&bike=1&wsapikey=" + ws_api_key
    response = requests.get(url).json()
    query = { "_id": city["_id"] }
    values = { "$set": { "walkscore":  response['walkscore'], 
                        "bikescore": response['bike']['score']} }
    cities.update_one(query, values)