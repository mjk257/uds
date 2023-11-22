import os
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient, ReplaceOne

# Load environment variables
load_dotenv("../.env")

# Connect to DB
db_url = os.getenv("MONGODB_URL")
client = MongoClient(db_url)
jobs = client['uds']['jobs']

# Ingest & clean job code data
df = pd.read_excel("https://www.onetcenter.org/dl_files/database/db_28_0_excel/Occupation%20Data.xlsx")
df.rename(columns={"O*NET-SOC Code": "code", "Title": "title", "Description": "description"}, inplace=True)

# Add jobs to DB
writes = []
for row in df.to_dict("records"):
    writes.append(ReplaceOne({'title': row.get('title')}, row, upsert=True))

jobs.bulk_write(writes)