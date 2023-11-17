import subprocess

print("Running full data ingestion script. This script will wipe the database selected in the .env file and will take some time to run.")
while True:
    if input('Do you wish to continue? [y/n] ') != 'y':
        break
    print("Installing dependencies...")
    subprocess.run(['pip', 'install', '-r', 'requirements.txt'])
    print("Dependencies installed. Running cities script...")
    subprocess.run(["python", "cities.py"])
    print("Cities script completed. Running RPP script...")
    subprocess.run(["python", "rpp.py"])
    print("RPP script completed. Running outdoor score script...")
    subprocess.run(["python", "outdoor_score.py"])
    print("Outdoor score script completed. Running median age script...")
    subprocess.run(["python", "median_age.py"])
    print("Median age script completed. Running partisan lean script...")
    subprocess.run(["python", "partisan_lean.py"])
    print("Partisan lean script completed. Running climate script...")
    subprocess.run(["python", "climate.py"])
    print("Climate script completed. Running AI description script...")
    # subprocess.run(["python", "ai_description.py"])
    subprocess.run(["python", "crime_rate.py"])
    print("AI description script completed. Running crime rate script...")
    subprocess.run(["python", "crime_rate.py"])
    print("Crime rate script completed. Running WalkScore script...")
    subprocess.run(["python", "walkscore.py"])
    print("WalkScore script completed. Running crime rate script...")
    subprocess.run(["python", "job_codes.py"])
    print("Job codes script completed. All scripts have finished.")
    break