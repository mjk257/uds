import requests
import os
import numpy
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient

# function for getting the bounding box from coordinates
def get_gps_bounding_box(latitude, longitude, deg_lat, deg_lon):

    if latitude >= 0:
        if latitude + deg_lat >= 90.0:
            n = 90.0 * numpy.sign(latitude)
            s = latitude - deg_lat
        else:   
            n = latitude + deg_lat
            s = latitude - deg_lat

    else:
        if abs(latitude) + deg_lat >= 90.0:
            n = 90.0 * numpy.sign(latitude)
            s = (abs(latitude) - deg_lat) * numpy.sign(latitude)
        else:   
            n = latitude + deg_lat
            s = latitude - deg_lat

    if longitude >= 0:
        if longitude + deg_lon >= 180.0:
            w = 180.0 * numpy.sign(longitude)
            e = longitude - deg_lon
        else:   
            w = longitude + deg_lon
            e = longitude - deg_lon

    else:
        if abs(longitude) + deg_lon >= 180.0:
            w = 180.0 * numpy.sign(longitude)
            e = (abs(longitude) - deg_lon) * numpy.sign(longitude)
        else:   
            w = longitude + deg_lon
            e = longitude - deg_lon
            
    return ",".join([str(n), str(w), str(s), str(e)])

load_dotenv("../.env")

# Climate Zone API url
api = "http://climateapi.scottpinkelman.com/api/v1/location/"

# DB connection string
db_url = os.getenv("MONGODB_URL")

# Connect to DB
client = MongoClient(db_url)
cities = client['uds']['cities']

# Arrays to define summer and winter months
summer = [5, 6, 7]
winter = [0, 1, 11]

# Call API and add climate zone and zone description
for city in cities.find():
    zone_response = requests.get(api + str(city['latitude']) + "/" + str(city['longitude'])).json()['return_values'][0]

    lat = city['latitude']
    lon = city['longitude']

    stations_list = []

    # API to get weather stations for coordiantes
    params = {
        "dataset": "global-summary-of-the-month",
        "bbox": get_gps_bounding_box(lat, lon, 0.5, 0.5),
        "dataType": ",".join(["TAVG", "PRCP", "SNOW"])
    }
    url = "https://www.ncei.noaa.gov/access/services/search/v1/data"

    for i in range(3):
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                break
        except:
            pass 

    # Add stations to list
    for result in response.json()['results']:
        for station in result['stations']:
            stations_list.append(station["id"])

    # API to get monthly data from the stations
    url = "https://www.ncei.noaa.gov/access/services/data/v1/"
    params = {
        "dataset": "global-summary-of-the-month",
        "stations": ",".join(stations_list),
        "startDate": "1975-01-01",
        "endDate": "2022-01-01",
        "bbox": get_gps_bounding_box(lat, lon, 0.5, 0.5),
        "dataType": ",".join(["TAVG", "PRCP", "SNOW"]),
        "includeAttributes": "false",
        "format": "json",
        "units": "standard"
    }

    for i in range(3):
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                break
        except:
            pass 

    # Add monthly data to dataframe and clean
    df = pd.DataFrame(response.json())
    df = df[["TAVG", "DATE", "PRCP", "SNOW"]]
    df = df.dropna()
    df['TAVG'] = df['TAVG'].astype(float)
    df['PRCP'] = df['PRCP'].astype(float)
    df['SNOW'] = df['SNOW'].astype(float)
    df['DATE'] = df['DATE'].str.replace(r'^[^-]*-*', '', regex=True)
    df.reset_index(inplace = True, drop = True)

    # Update database entries with climate data
    query = { "_id": city["_id"] }
    values = { "$set": { "summer_temp":  int(df.groupby("DATE")['TAVG'].mean().take(summer, axis=0).mean()), 
                        "winter_temp": int(df.groupby("DATE")['TAVG'].mean().take(winter, axis=0).mean()), 
                        "annual_precipitation": int(df.groupby("DATE")['PRCP'].mean().sum()),
                       "annual_snow": int(df.groupby("DATE")['SNOW'].mean().sum()),
                       "climate_zone":  zone_response['koppen_geiger_zone'], 
                       "zone_description": zone_response['zone_description']} }
    cities.update_one(query, values)