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
term = ""
for city in cities.find():
    if(city['population'] > 500000):
        term = " Downtown"
    else:
        term = " Building"
    params = {
        "method": "flickr.photos.search",
        "api_key": api_key,
        "text": city['name'] + ", " + city['state'] +  term,
        "sort": "relevance",
        "format": "json",
        "accuracy": 11,
        "content-types": 0,
        "media": "photos",
        "min_taken_date": "01/01/2010",
        "lat": city['latitude'],
        "lon": city['longitude'],
        "radius": 25,
        "nojsoncallback": 1
    }
    for i in range(3):
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                break
        except:
            pass 
    photo = response.json()['photos']['photo'][0]
    query = { "_id": city["_id"] }
    values = { "$set": { "image_url": "https://live.staticflickr.com/" + photo['server'] + "/" + photo['id'] + "_" + photo['secret'] + "_b.jpg" }}
    writes.append(UpdateOne(query, values))
cities.bulk_write(writes)