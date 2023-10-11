import os
from dotenv import load_dotenv
import pandas as pd
from pymongo import MongoClient

load_dotenv("../.env")

# variables for atlas connection
db_username = os.getenv("MONGODB_USER")
db_password = os.getenv("MONGODB_PASSWORD")
db_url = "mongodb+srv://" + db_username + ":" + db_password + "@cluster0.bno5m.mongodb.net/?retryWrites=true&w=majority"

# Clean initial excel
df = pd.read_excel("https://www.bea.gov/sites/default/files/2022-12/rpp1222.xlsx", sheet_name="Table 4", skiprows=[0, 1, 2, 3])
df = df.drop(["Unnamed: 2", "Unnamed: 3", "Unnamed: 4", "Unnamed: 5", "Unnamed: 6", "Unnamed: 7"], axis=1)
df = df.drop([0, 1, 2, 387, 388, 389, 390, 391, 392, 393], axis=0)
df = df.rename({"Unnamed: 0": "city", "Unnamed: 1": "rpp"}, axis=1)

# Split city, state into two columns and remove dashed cities/states
df1 = df['city'].str.split(', ', expand=True)
df1 = df1.sort_values(0)
df = pd.concat([df, df1], axis=1)
df = df.drop(['city'], axis=1)
df = df.rename({0: "city", 1: "state"}, axis=1)
df.reset_index(inplace = True, drop = True)

# Access DB collection
client = MongoClient(db_url)
cities = client['uds']['cities']

# Add RPP
for city in cities.find():
    row = df[df['city'].str.contains("(?<![A-z])" + city['name']) & df['state'].str.contains(city['state'])]
    if not row.empty:
        query = {'name': city['name'], 'state': city['state']}
        values = { "$set": { "rpp": row.values[0][0]}}
        cities.update_one(query, values)

# Remove cities without RPP
cities.delete_many({ "rpp": {"$exists": False} })