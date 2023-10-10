import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv("../.env")

api = "http://climateapi.scottpinkelman.com/api/v1/location/"

# variables for atlas connection
db_username = os.getenv("MONGODB_USER")
db_password = os.getenv("MONGODB_PASSWORD")
db_url = "mongodb+srv://" + db_username + ":" + db_password + "@cluster0.bno5m.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(db_url)
cities = client['uds']['cities']

for city in cities.find():
    response = requests.get(api + str(city['latitude']) + "/" + str(city['longitude'])).json()['return_values'][0]
    query = { "_id": city["_id"] }
    values = { "$set": { "climate_zone":  response['koppen_geiger_zone'], "zone_description": response['zone_description']} }
    cities.update_one(query, values)