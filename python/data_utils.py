import numpy

# Function to map state name to abbreviation
def abbreviate(x):
    return us_state_to_abbrev.get(x)

# Dictionary for state name to abbreviation mappings
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
    "District Of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
    "Northern Mariana Islands": "MP",
    "Puerto Rico": "PR",
    "United States Minor Outlying Islands": "UM",
    "U.S. Virgin Islands": "VI",
}

# Function to clean city name from census data
def clean_name(x):
    if("-" in x):
        x = x.split("-")[0]
    if("/" in x):
        x = x.split("/")[0]
    if("city" in x):
        x = x.split(" city")[0]
    if("town" in x):
        x = x.split(" town")[0]
    if("municipality" in x):
        x = x.split(" municipality")[0]
    if("CDP" in x):
        x = x.split("Urban ")[1].split(" CDP")[0]
    if("(" in x):
        x = x.split(" (")[0]
    return x

# Function for getting the bounding box from coordinates
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