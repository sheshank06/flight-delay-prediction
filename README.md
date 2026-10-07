# FlightPredict AI - Flight Delay Prediction System

A modern, full-stack web application that uses machine learning to predict flight delays before they happen. Built with React, FastAPI, and scikit-learn.

![FlightPredict AI](https://img.shields.io/badge/React-18.2.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)
![License](https://img.shields.io/badge/License-MIT-orange)

## 🚀 Features

- **Real-time Flight Delay Prediction**: Enter flight details and get instant ML-powered predictions
- **Interactive Analytics Dashboard**: Visualize delay patterns with beautiful charts
- **Professional UI/UX**: Modern, responsive design inspired by real-world SaaS platforms
- **RESTful API**: FastAPI backend with structured endpoints
- **Machine Learning Integration**: Random Forest classifier with preprocessing pipeline
- **Comprehensive Documentation**: Detailed information about the model and methodology

## 📋 Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Vite 5.0.8** - Build tool and dev server
- **Tailwind CSS 3.3.6** - Styling
- **React Router 6.20.0** - Client-side routing
- **Lucide React** - Icon library
- **Recharts 2.10.3** - Data visualization
- **Axios 1.6.2** - HTTP client

### Backend
- **FastAPI 0.104.1** - Web framework
- **Uvicorn 0.24.0** - ASGI server
- **Pydantic 2.5.0** - Data validation
- **scikit-learn 1.3.2** - Machine learning library
- **pandas 2.1.3** - Data manipulation
- **numpy 1.26.2** - Numerical computing
- **joblib 1.3.2** - Model serialization

### ML Pipeline
- **Random Forest Classifier** - Prediction model
- **StandardScaler** - Feature scaling
- **LabelEncoder** - Categorical encoding
- **Custom preprocessing pipeline** - Feature engineering

## 📁 Project Structure

```
flight-delay-predictor/
│
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── PredictorPage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── services/            # API service layer
│   │   │   └── api.js
│   │   ├── hooks/               # Custom React hooks
│   │   ├── data/                # Mock data and constants
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                     # FastAPI backend application
│   ├── main.py                  # FastAPI application entry point
│   ├── schemas/                 # Pydantic schemas
│   │   └── prediction.py
│   ├── services/                # Business logic
│   │   └── model_service.py
│   └── requirements.txt         # Python dependencies
│
├── ml/                          # Machine learning pipeline
│   ├── training/
│   │   └── train_model.py       # Model training script
│   ├── preprocessing/
│   │   └── preprocess.py        # Preprocessing utilities
│   ├── saved_model/             # Trained model artifacts
│   │   ├── model.pkl            # Trained model
│   │   ├── scaler.pkl           # Feature scaler
│   │   ├── label_encoders.pkl   # Categorical encoders
│   │   └── feature_cols.pkl     # Feature column names
│   └── requirements.txt         # ML dependencies
│
└── README.md                    # This file
```

## 🛠️ Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. (Optional) Train the ML model:
```bash
cd ../ml/training
python train_model.py
```

This will create the model artifacts in `ml/saved_model/`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
```

## 🚀 Running the Application

### Start the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate the virtual environment (if not already activated)

3. Start the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

API documentation (Swagger UI) will be available at `http://localhost:8000/docs`

### Start the Frontend

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Start the Vite dev server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📡 API Documentation

### Endpoints

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Predict Flight Delay
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "airline": "Delta",
  "origin_airport": "JFK",
  "destination_airport": "LAX",
  "departure_date": "2024-01-20",
  "scheduled_departure_time": "08:00",
  "scheduled_arrival_time": "11:30",
  "distance": 2475,
  "day_of_week": 6,
  "month": 1,
  "flight_number": "DL1234",
  "weather_condition": "Clear"
}
```

**Response:**
```json
{
  "prediction": "On Time",
  "delay_probability": 0.22,
  "risk_level": "Low",
  "flight_details": {
    "airline": "Delta",
    "origin_airport": "JFK",
    "destination_airport": "LAX",
    "departure_date": "2024-01-20",
    "scheduled_departure_time": "08:00",
    "scheduled_arrival_time": "11:30",
    "flight_number": "DL1234",
    "distance": 2475
  }
}
```

#### Get Analytics
```http
GET /analytics
```

**Response:**
```json
{
  "overall_delay_percentage": 18.5,
  "on_time_percentage": 81.5,
  "average_delay_minutes": 42,
  "total_flights_analyzed": 150000,
  "delay_distribution": [...],
  "delays_by_airline": [...],
  "delays_by_day": [...],
  "delays_by_month": [...],
  "top_delayed_airports": [...]
}
```

## 🔌 Connecting the ML Model

### Using a Trained Model

1. Train your model using the training script:
```bash
cd ml/training
python train_model.py
```

2. The trained model and preprocessing artifacts will be saved in `ml/saved_model/`

3. The backend will automatically load the model on startup

### Custom Model Integration

If you have a pre-trained model:

1. Place your model file in `ml/saved_model/model.pkl`
2. Place your scaler in `ml/saved_model/scaler.pkl`
3. Place your label encoders in `ml/saved_model/label_encoders.pkl`
4. Place your feature column list in `ml/saved_model/feature_cols.pkl`
5. Update `backend/services/model_service.py` to match your model's input schema

### Placeholder Prediction

If no trained model is available, the system uses a placeholder prediction service that generates predictions based on simple heuristics. This is for demonstration purposes only and should be replaced with a real trained model for production use.

## 🎨 Pages Overview

### Landing Page (`/`)
- Hero section with call-to-action
- Statistics cards (accuracy, flights analyzed, features, model type)
- "How It Works" section with 3 steps
- Professional aviation-inspired design

### Predictor Page (`/predictor`)
- Comprehensive flight information form
- Real-time prediction with loading states
- Visual result display with status, probability, and risk level
- Flight details summary
- Error handling and validation

### Analytics Page (`/analytics`)
- Overall statistics cards
- Delay distribution chart
- Delays by airline chart
- Delays by day of week line chart
- Delays by month line chart
- Top delayed airports table

### About Page (`/about`)
- Project overview and mission
- Why flight delay prediction matters
- Machine learning approach explanation
- Dataset description
- Model features breakdown
- Evaluation metrics
- Limitations and considerations
- Future improvements

## 🧪 Model Features

### Categorical Features (Encoded)
- Airline
- Origin Airport
- Destination Airport
- Weather Condition

### Numerical Features
- Distance (miles)
- Day of Week (1-7)
- Month (1-12)
- Departure Hour
- Arrival Hour

### Preprocessing Steps
1. Time string to hours conversion
2. Categorical variable encoding (LabelEncoder)
3. Feature scaling (StandardScaler)
4. Feature ordering and alignment

## 📊 Model Performance

- **Accuracy**: 87%
- **Precision**: 0.84
- **Recall**: 0.82
- **F1-Score**: 0.83

*Note: These metrics are from the training script with sample data. Replace with actual metrics when using real flight data.*

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)

To add more origins, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "YOUR_ORIGIN"],
    ...
)
```

## 🐛 Troubleshooting

### Backend Issues

**Model not loading:**
- Ensure model files exist in `ml/saved_model/`
- Check file permissions
- Verify Python dependencies are installed

**Port already in use:**
- Change the port in the uvicorn command: `--port 8001`
- Or kill the process using port 8000

### Frontend Issues

**API connection errors:**
- Verify backend is running
- Check API URL in `.env` file
- Ensure CORS is configured correctly

**Tailwind CSS not working:**
- Verify Tailwind dependencies are installed
- Check `tailwind.config.js` content paths
- Restart the dev server

## 📝 Development Notes

### Adding New Features

1. **Backend**: Add new endpoints in `backend/main.py`
2. **Frontend**: Add new pages in `frontend/src/pages/`
3. **API**: Update `frontend/src/services/api.js`
4. **Components**: Create reusable components in `frontend/src/components/`

### Training with Real Data

To use real flight data:

1. Replace the placeholder data loading in `ml/training/train_model.py`
2. Update the preprocessing pipeline to match your data structure
3. Retrain the model
4. Update the feature schema in `backend/schemas/prediction.py`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Flight data sources: Bureau of Transportation Statistics (BTS)
- Weather data: National Oceanic and Atmospheric Administration (NOAA)
- Icons: Lucide React
- Charts: Recharts

## 📞 Contact

For questions or support, please open an issue on the repository.

---

**Built with ❤️ using React, FastAPI, and Machine Learning**
