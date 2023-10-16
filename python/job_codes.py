import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv("../.env")

# variables for atlas connection
db_url = os.getenv("MONGODB_URL")

# Connect to DB
client = MongoClient(db_url)
jobs = client['uds']['jobs']

df = pd.read_excel("https://www.onetcenter.org/dl_files/database/db_28_0_excel/Occupation%20Data.xlsx")
df.rename(columns={"O*NET-SOC Code": "code", "Title": "title", "Description": "description"}, inplace=True)

for row in df.to_dict("records"):
    jobs.replace_one({'title': row.get('title')}, row, upsert=True)