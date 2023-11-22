import os
import google.generativeai as palm
from pymongo import MongoClient, UpdateOne
from dotenv import load_dotenv

# Load environment variables
load_dotenv("../.env")

# connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
cities = client['uds']['cities']

# Setup PaLM
api_key = os.getenv("PALM_API_KEY")
palm.configure(api_key=api_key)
models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name

# List of attributes to include in the description
attributes = "climate, cost of living, job market, crime rate, walkability, public transport, politics, and outdoor recreation"

# Prompt PaLM model and update DB with description
writes = []
for city in cities.find():
    city_name = city['name'] + ", " + city['state']
    prompt =  """
    You are an expert in United States cities.
    Give me a description of """ + city_name + """
    as a place to live considering the following attributes""" + attributes + """.
    Give me the output in a single, naturally flowing, paragraph.
    You are not allowed to include any numbers in your output.
    """

    completion = palm.generate_text(
        model=model,
        prompt=prompt,
        # The maximum length of the response
        max_output_tokens=200,
    )
    query = { "_id": city["_id"] }
    values = { "$set": { "description": completion.result}}
    writes.append(UpdateOne(query, values))

cities.bulk_write(writes)