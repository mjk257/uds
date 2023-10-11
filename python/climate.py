import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv("../.env")

# API url
api = "http://climateapi.scottpinkelman.com/api/v1/location/"

# DB connection string
db_url = os.getenv("MONGODB_URL")

# Connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# Call API and add climate zone and zone description
for city in cities.find():
    response = requests.get(api + str(city['latitude']) + "/" + str(city['longitude'])).json()['return_values'][0]
    query = { "_id": city["_id"] }
    values = { "$set": { "climate_zone":  response['koppen_geiger_zone'], "zone_description": response['zone_description']} }
    cities.update_one(query, values)