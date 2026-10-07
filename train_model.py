"""
Flight Delay Prediction Model Training Script
"""
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os


def load_data():
    """Load the flight delay dataset."""
    np.random.seed(42)
    n_samples = 10000
    
    data = {
        'airline': np.random.choice(['Delta', 'United', 'American', 'Southwest', 'JetBlue'], n_samples),
        'origin_airport': np.random.choice(['JFK', 'LAX', 'ORD', 'DFW', 'ATL'], n_samples),
        'destination_airport': np.random.choice(['LAX', 'JFK', 'SFO', 'MIA', 'SEA'], n_samples),
        'distance': np.random.uniform(500, 3000, n_samples),
        'day_of_week': np.random.randint(1, 8, n_samples),
        'month': np.random.randint(1, 13, n_samples),
        'scheduled_departure_time': np.random.choice(['06:00', '08:00', '12:00', '15:00', '18:00', '21:00'], n_samples),
        'scheduled_arrival_time': np.random.choice(['09:00', '11:00', '15:00', '18:00', '21:00', '00:00'], n_samples),
        'flight_number': [f'FL{i:04d}' for i in range(n_samples)],
        'weather_condition': np.random.choice(['Clear', 'Cloudy', 'Rain', 'Snow'], n_samples),
        'delayed': np.random.choice([0, 1], n_samples, p=[0.8, 0.2])
    }
    
    df = pd.DataFrame(data)
    return df


def preprocess_data(df):
    """Preprocess the data for training."""
    def time_to_hours(time_str):
        hours, minutes = map(int, time_str.split(':'))
        return hours + minutes / 60
    
    df['departure_hour'] = df['scheduled_departure_time'].apply(time_to_hours)
    df['arrival_hour'] = df['scheduled_arrival_time'].apply(time_to_hours)
    
    categorical_cols = ['airline', 'origin_airport', 'destination_airport', 'weather_condition']
    label_encoders = {}
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col + '_encoded'] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = le
    
    feature_cols = [
        'distance',
        'day_of_week',
        'month',
        'departure_hour',
        'arrival_hour',
        'airline_encoded',
        'origin_airport_encoded',
        'destination_airport_encoded',
        'weather_condition_encoded'
    ]
    
    X = df[feature_cols]
    y = df['delayed']
    
    return X, y, label_encoders, feature_cols


def train_model(X, y):
    """Train the Random Forest classifier."""
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42,
        class_weight='balanced'
    )
    
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    return model, scaler, accuracy


def save_model(model, scaler, label_encoders, feature_cols):
    """Save the trained model and preprocessing artifacts."""
    joblib.dump(model, 'model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(label_encoders, 'encoder.pkl')
    joblib.dump(feature_cols, 'feature_cols.pkl')
    print("\nModel saved to current directory")


def main():
    """Main training pipeline."""
    print("Loading data...")
    df = load_data()
    
    print("Preprocessing data...")
    X, y, label_encoders, feature_cols = preprocess_data(df)
    
    print("Training model...")
    model, scaler, accuracy = train_model(X, y)
    
    print("Saving model...")
    save_model(model, scaler, label_encoders, feature_cols)
    
    print("\nTraining complete!")
    print(f"Final accuracy: {accuracy:.4f}")


if __name__ == "__main__":
    main()
