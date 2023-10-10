import pandas as pd
import requests
import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv("../.env")

# variables for atlas connection
db_username = os.getenv("MONGODB_USER")
db_password = os.getenv("MONGODB_PASSWORD")
db_url = "mongodb+srv://" + db_username + ":" + db_password + "@cluster0.bno5m.mongodb.net/?retryWrites=true&w=majority"

# connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# function to map state name to abbreviation
def abbreviate(x):
    return us_state_to_abbrev.get(x)

# function to clean city name from census data
def clean_name(x):
    if("-" in x):
        return x.split("-")[0]
    if("/" in x):
        return x.split("/")[0]
    if("city" in x):
        return x.split(" city")[0]
    if("town" in x):
        return x.split(" town")[0]
    if("municipality" in x):
        return x.split(" municipality")[0]
    if("CDP" in x):
        return x.split("Urban ")[1].split(" CDP")[0]
    return x

# dictionary for state name to abbreviation mappings
us_state_to_abbrev = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "U.S. Virgin Islands": "VI",
}

# census API call
response = requests.get("http://api.census.gov/data/2019/pep/population?get=NAME,DENSITY,POP&for=place:*&key=25ec91bd81fdfa691c08dbaf06adc71c3a2918d6")

# clean census data
df = pd.DataFrame(response.json(), columns=['name', 'density', 'population', '0', '1'])
df = df.drop(['0', '1'], axis=1)
df = df.drop(0, axis=0)
df['population'] = df['population'].astype(int)
df = df[df['population'] > 100000]
df = df.sort_values('name')
df1 = df['name'].str.split(', ', expand=True)
df1 = df1.sort_values(0)
df = pd.concat([df, df1], axis=1)
df = df.drop(['name'], axis=1)
df = df.rename({0: "name", 1: "state"}, axis=1)
df['state'] = df['state'].apply(abbreviate)
df['name'] = df['name'].apply(clean_name)
df = df.sort_values('name')
df.reset_index(inplace = True, drop = True)

# add columns for latitude and longitude
df.insert(4, column='latitude', value=0)
df.insert(4, column='longitude', value=0)

# call geocoding API
for i, row in df.iterrows():
    api_url = "https://geocode.maps.co/search?city=" + df.at[i, 'name'].replace(" ", "+") + "&state=" + df.at[i, 'state'] + "&country=US"
    coordinates = requests.get(api_url)
    while coordinates.status_code != 200:
        coordinates = requests.get(api_url)
    df.at[i, 'latitude'] = coordinates.json()[0]['lat']
    df.at[i, 'longitude'] = coordinates.json()[0]['lon']

# add to database
for row in df.to_dict("records"):
    cities.replace_one({'name': row.get('name'), 'state': row.get('state')}, row, upsert=True)