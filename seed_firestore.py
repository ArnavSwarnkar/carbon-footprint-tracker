import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
import os # To handle environment variables for service account key

# --- Configuration ---
# IMPORTANT: Replace 'path/to/your/serviceAccountKey.json' with the actual path to your Firebase service account key file.
# For better security, consider storing the path in an environment variable.
SERVICE_ACCOUNT_KEY_PATH = os.environ.get('FIREBASE_SERVICE_ACCOUNT_KEY', 'path/to/your/serviceAccountKey.json')

# --- Initialize Firebase Admin SDK ---
try:
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("Firebase Admin SDK initialized successfully.")
except Exception as e:
    print(f"Error initializing Firebase Admin SDK: {e}")
    print("Please ensure 'SERVICE_ACCOUNT_KEY_PATH' is correct and the JSON file is accessible.")
    exit()

# --- Sample Data ---

# 1. Sample User Data (for 'users' collection)
# Use a consistent UID for testing, or generate a random one if preferred
sample_user_uid = "test_user_uid_12345" # Replace with a real UID if you want to link to an existing auth user
sample_user_data = {
    "uid": sample_user_uid,
    "email": "test.user@example.com",
    "name": "Test User",
    "age": 25,
    "college": "Example University",
    "created_at": datetime.datetime.now(), # Firestore will convert Python datetime to Timestamp

    "preferences": {
        "weekly": {
            "geyser_hours": 5,
            "ac_hours": 8,
            "meat_kg": 1.0,
            "milk_liters": 4.0,
            "rice_kg": 2.0,
            "bike_km": 30,
            "car_km": 80,
            "metro_train_km": 15,
            "flights_count": 0,
            "plastic_bottles": 2,
            "plastic_bags": 1
        },
        "monthly": {
            "electricity_kwh": 90,
            "water_liters": 3500,
            "lpg_kg": 6,
            "online_orders": 3
        }
    },
    "preferred_weekly_day": "Monday",
    "preferred_monthly_day": "1"
}

# 2. Sample Carbon Coefficients (for 'carbon_coefficients' collection)
carbon_coefficients_data = {
    "geyser_hours_co2e_per_hour": 0.5,
    "ac_hours_co2e_per_hour": 1.2,
    "meat_co2e_per_kg": 27.0,
    "milk_co2e_per_liter": 1.1,
    "rice_co2e_per_kg": 0.4,
    "bike_co2e_per_km": 0.05,
    "car_co2e_per_km": 0.2,
    "metro_train_co2e_per_km": 0.03,
    "flights_co2e_per_flight": 200,
    "plastic_bottles_co2e_per_unit": 0.08,
    "plastic_bags_co2e_per_unit": 0.02,
    "electricity_co2e_per_kwh": 0.8,
    "water_co2e_per_liter": 0.0003,
    "lpg_co2e_per_kg": 2.98,
    "online_orders_co2e_per_order": 0.5
}

# 3. Sample Weekly Entry (for 'weekly_entries' collection)
sample_weekly_data = {
    "user_id": sample_user_uid,
    "week_identifier": "2025-W21",
    "entry_date": datetime.datetime.now(),
    "week_start_date": datetime.datetime(2025, 5, 19), # Example: Monday of Week 21, 2025

    "geyser_hours": 7,
    "ac_hours": 12,
    "meat_kg": 1.5,
    "milk_liters": 3.0,
    "rice_kg": 2.5,
    "bike_km": 20,
    "car_km": 30,
    "metro_train_km": 5,
    "flights_count": 0,
    "plastic_bottles": 5,
    "plastic_bags": 2,
    "calculated_carbon_footprint_kg": 0.0 # Placeholder, calculate based on coefficients
}

# 4. Sample Monthly Entry (for 'monthly_entries' collection)
sample_monthly_data = {
    "user_id": sample_user_uid,
    "month_identifier": "2025-05",
    "entry_date": datetime.datetime.now(),
    "month_start_date": datetime.datetime(2025, 5, 1), # Example: 1st of May 2025

    "electricity_kwh": 150,
    "water_liters": 5000,
    "lpg_kg": 7,
    "online_orders": 6,
    "calculated_carbon_footprint_kg": 0.0 # Placeholder, calculate based on coefficients
}

# 5. Sample User Suggestion (for 'user_suggestions' collection)
sample_suggestion_data = {
    "user_id": sample_user_uid,
    "generated_at": datetime.datetime.now(),
    "category": "Transport",
    "suggestion_text": "Consider using metro/train for commutes over 10km to reduce car emissions.",
    "potential_co2_reduction_kg": 5.2,
    "is_read": False,
    "action_taken": False
}


# --- Function to add/set documents ---

async def add_documents_to_firestore():
    print("\n--- Adding documents to Firestore ---")

    # Add/Set 'users' document
    try:
        await db.collection("users").document(sample_user_uid).set(sample_user_data)
        print(f"Document 'users/{sample_user_uid}' created/updated.")
    except Exception as e:
        print(f"Error setting user document: {e}")

    # Add/Set 'carbon_coefficients' document
    try:
        await db.collection("carbon_coefficients").document("current_coefficients").set(carbon_coefficients_data)
        print("Document 'carbon_coefficients/current_coefficients' created/updated.")
    except Exception as e:
        print(f"Error setting carbon coefficients: {e}")

    # Add 'weekly_entries' document
    try:
        doc_ref = await db.collection("weekly_entries").add(sample_weekly_data)
        print(f"Document 'weekly_entries/{doc_ref.id}' added.")
    except Exception as e:
        print(f"Error adding weekly entry: {e}")

    # Add 'monthly_entries' document
    try:
        doc_ref = await db.collection("monthly_entries").add(sample_monthly_data)
        print(f"Document 'monthly_entries/{doc_ref.id}' added.")
    except Exception as e:
        print(f"Error adding monthly entry: {e}")

    # Add 'user_suggestions' document
    try:
        doc_ref = await db.collection("user_suggestions").add(sample_suggestion_data)
        print(f"Document 'user_suggestions/{doc_ref.id}' added.")
    except Exception as e:
        print(f"Error adding user suggestion: {e}")

    print("\n--- Data seeding process complete. ---")
    print("You can verify the data in your Firebase Console -> Firestore Database.")
    print("Remember to set up Firestore Security Rules to protect your data!")

# --- Run the script ---
# Use asyncio to run the async function
import asyncio
asyncio.run(add_documents_to_firestore())
