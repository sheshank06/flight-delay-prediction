from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os


# Pydantic Schemas
class FlightFeatures(BaseModel):
    airline: str = Field(..., description="Airline code or name")
    origin_airport: str = Field(..., description="Origin airport code")
    destination_airport: str = Field(..., description="Destination airport code")
    departure_date: str = Field(..., description="Departure date (YYYY-MM-DD)")
    scheduled_departure_time: str = Field(..., description="Scheduled departure time (HH:MM)")
    scheduled_arrival_time: str = Field(..., description="Scheduled arrival time (HH:MM)")
    distance: float = Field(..., description="Flight distance in miles")
    day_of_week: int = Field(..., ge=1, le=7, description="Day of week (1-7)")
    month: int = Field(..., ge=1, le=12, description="Month (1-12)")
    flight_number: str = Field(..., description="Flight number")
    weather_condition: Optional[str] = Field(None, description="Weather condition (optional)")


class PredictionResponse(BaseModel):
    prediction: str = Field(..., description="Prediction: 'Delayed' or 'On Time'")
    delay_probability: float = Field(..., ge=0, le=1, description="Probability of delay (0-1)")
    risk_level: str = Field(..., description="Risk level: 'Low', 'Medium', or 'High'")
    flight_details: dict = Field(..., description="Flight details for display")


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    timestamp: str


# Model Service
class ModelService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.label_encoders = {}
        self.model_loaded = False
        
    def load_model(self):
        """Load the trained ML model and preprocessing artifacts."""
        try:
            model_path = 'model.pkl'
            scaler_path = 'scaler.pkl'
            
            if os.path.exists(model_path):
                self.model = joblib.load(model_path)
                self.model_loaded = True
                
            if os.path.exists(scaler_path):
                self.scaler = joblib.load(scaler_path)
                
            return self.model_loaded
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def preprocess_features(self, flight_data: Dict[str, Any]) -> np.ndarray:
        """Preprocess flight data for model prediction."""
        features = np.array([
            flight_data.get('distance', 0),
            flight_data.get('day_of_week', 1),
            flight_data.get('month', 1),
        ]).reshape(1, -1)
        
        if self.scaler:
            features = self.scaler.transform(features)
            
        return features
    
    def predict(self, flight_data: Dict[str, Any]) -> Dict[str, Any]:
        """Make a prediction using the loaded model."""
        if not self.model_loaded:
            return self._placeholder_prediction(flight_data)
        
        try:
            features = self.preprocess_features(flight_data)
            prediction = self.model.predict(features)[0]
            probability = self.model.predict_proba(features)[0][1]
            
            risk_level = self._calculate_risk_level(probability)
            
            return {
                'prediction': 'Delayed' if prediction == 1 else 'On Time',
                'delay_probability': float(probability),
                'risk_level': risk_level
            }
        except Exception as e:
            print(f"Error making prediction: {e}")
            return self._placeholder_prediction(flight_data)
    
    def _placeholder_prediction(self, flight_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a placeholder prediction for demonstration."""
        day_of_week = flight_data.get('day_of_week', 1)
        month = flight_data.get('month', 1)
        
        base_probability = 0.3
        if day_of_week in [6, 7]:
            base_probability += 0.2
        if month in [12, 1, 7]:
            base_probability += 0.15
        
        probability = min(0.95, max(0.05, base_probability + np.random.uniform(-0.1, 0.1)))
        
        prediction = 'Delayed' if probability > 0.5 else 'On Time'
        risk_level = self._calculate_risk_level(probability)
        
        return {
            'prediction': prediction,
            'delay_probability': probability,
            'risk_level': risk_level
        }
    
    def _calculate_risk_level(self, probability: float) -> str:
        """Calculate risk level based on delay probability."""
        if probability < 0.3:
            return 'Low'
        elif probability < 0.6:
            return 'Medium'
        else:
            return 'High'


# Global model service instance
model_service = ModelService()


# FastAPI App
app = FastAPI(
    title="FlightPredict AI API",
    description="Machine Learning API for Flight Delay Prediction",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Load the ML model on startup."""
    model_service.load_model()


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        model_loaded=model_service.model_loaded,
        timestamp=datetime.utcnow().isoformat()
    )


@app.post("/predict", response_model=PredictionResponse)
async def predict_delay(flight_data: FlightFeatures):
    """Predict flight delay based on flight features."""
    try:
        flight_dict = flight_data.dict()
        result = model_service.predict(flight_dict)
        
        flight_details = {
            "airline": flight_data.airline,
            "origin_airport": flight_data.origin_airport,
            "destination_airport": flight_data.destination_airport,
            "departure_date": flight_data.departure_date,
            "scheduled_departure_time": flight_data.scheduled_departure_time,
            "scheduled_arrival_time": flight_data.scheduled_arrival_time,
            "flight_number": flight_data.flight_number,
            "distance": flight_data.distance
        }
        
        return PredictionResponse(
            prediction=result['prediction'],
            delay_probability=result['delay_probability'],
            risk_level=result['risk_level'],
            flight_details=flight_details
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/analytics")
async def get_analytics():
    """Get analytics data for the dashboard."""
    return {
        "overall_delay_percentage": 18.5,
        "on_time_percentage": 81.5,
        "average_delay_minutes": 42,
        "total_flights_analyzed": 150000,
        "delay_distribution": [
            {"range": "0-15 min", "count": 45000},
            {"range": "16-30 min", "count": 12000},
            {"range": "31-60 min", "count": 8000},
            {"range": "60+ min", "count": 5000}
        ],
        "delays_by_airline": [
            {"airline": "Delta", "delay_rate": 15.2},
            {"airline": "United", "delay_rate": 18.7},
            {"airline": "American", "delay_rate": 20.1},
            {"airline": "Southwest", "delay_rate": 16.8},
            {"airline": "JetBlue", "delay_rate": 19.3}
        ],
        "delays_by_day": [
            {"day": "Monday", "delay_rate": 16.5},
            {"day": "Tuesday", "delay_rate": 14.2},
            {"day": "Wednesday", "delay_rate": 15.8},
            {"day": "Thursday", "delay_rate": 17.3},
            {"day": "Friday", "delay_rate": 22.1},
            {"day": "Saturday", "delay_rate": 19.5},
            {"day": "Sunday", "delay_rate": 18.2}
        ],
        "delays_by_month": [
            {"month": "Jan", "delay_rate": 21.5},
            {"month": "Feb", "delay_rate": 18.2},
            {"month": "Mar", "delay_rate": 15.8},
            {"month": "Apr", "delay_rate": 14.5},
            {"month": "May", "delay_rate": 13.2},
            {"month": "Jun", "delay_rate": 16.8},
            {"month": "Jul", "delay_rate": 19.5},
            {"month": "Aug", "delay_rate": 18.7},
            {"month": "Sep", "delay_rate": 14.2},
            {"month": "Oct", "delay_rate": 13.8},
            {"month": "Nov", "delay_rate": 16.5},
            {"month": "Dec", "delay_rate": 24.3}
        ],
        "top_delayed_airports": [
            {"airport": "ORD", "name": "Chicago O'Hare", "delay_rate": 23.5},
            {"airport": "EWR", "name": "Newark Liberty", "delay_rate": 22.8},
            {"airport": "JFK", "name": "John F. Kennedy", "delay_rate": 21.2},
            {"airport": "SFO", "name": "San Francisco", "delay_rate": 20.5},
            {"airport": "LGA", "name": "LaGuardia", "delay_rate": 19.8}
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
