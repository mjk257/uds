import requests
import os
from pymongo import MongoClient, UpdateOne
from dotenv import load_dotenv
from data_utils import *

# Load environment variables
load_dotenv("../.env")

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client['uds']['cities']

# Setup authorization headers for API requests
api_key = os.getenv("FLICKR_API_KEY")
url = "https://www.flickr.com/services/rest/?method="

# Call Flickr API and add image to DB
writes = []
for city in cities.find():
    params = {
        "method": "flickr.photos.search",
        "api_key": api_key,
        "text": city['name'] + ", " + city['state'] +  " City",
        "sort": "relevance",
        "format": "json",
        "nojsoncallback": 1
    }
    response = requests.get(url, params=params).json()
    photo = response['photos']['photo'][0]
    query = { "_id": city["_id"] }
    values = { "$set": { "image_url": "https://live.staticflickr.com/" + photo['server'] + "/" + photo['id'] + "_" + photo['secret'] + "_b.jpg" }}
    writes.append(UpdateOne(query, values))
cities.bulk_write(writes)