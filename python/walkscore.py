import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv("../.env")

db_url = os.getenv("MONGODB_URL")

client = MongoClient(db_url)
cities = client['uds']['cities']

ws_api_key = os.getenv("WALKSCORE_API_KEY")
pt_api_key = os.getenv("PUBLIC_TRANSIT_API_KEY")

for city in cities.find():
    url1 = "https://api.walkscore.com/score?format=json&address=" + city['name'].replace(" ", "%20") + "%20" + city['state'] + "&lat=" + str(city['latitude']) + "&lon=" + str(city['longitude']) + "&transit=1&bike=1&wsapikey=" + ws_api_key
    response1 = requests.get(url1).json()
    url2 = "https://api.walkscore.com/transit/score/?format=json&city=" + city['name'].replace(" ", "%20") + "&state=" + city['state'] + "%20&lat=" + str(city['latitude']) + "&lon=" + str(city['longitude']) + "&wsapikey=" + pt_api_key
    response2 = requests.get(url2).json()
    query = { "_id": city["_id"] }
    values = { "$set": { "walkscore":  response1['walkscore'], 
                        "transitscore": response2['transit_score'], 
                        "bikescore": response1['bike']['score']} }
    cities.update_one(query, values)