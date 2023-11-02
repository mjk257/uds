import openai as novaai
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv("../.env")

db_url = os.getenv("MONGODB_URL")

# connect to NovaAI
novaai.api_base = 'https://api.nova-oss.com/v1'
novaai.api_key = os.getenv("NOVAAI_API_KEY")

# connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# list of attributes to generate AI description from
attributes = "population, population density, climate, cost of living, job market, crime rate, walkability, public transport, politics, school system, outdoor recreation, and average age of population"

for city in cities.find():
    city_name = city.name + ", " + city.state
    # generate description
    completion = novaai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Give me a description of " + city_name + " as a place to live considering the following traits: " + attributes + ". Give me the output in one short, naturally flowing, 6-8 sentence paragraph. Don't include any numbers"}])
    query = { "_id": city["_id"] }
    values = { "$set": { "description":  completion.choices[0].message.content} }
    cities.update_one(query, values)