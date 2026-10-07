import { useState } from 'react'
import { predictDelay } from './api.js'
import { Plane, Calendar, Clock, MapPin, AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react'

const Predictor = () => {
  const [formData, setFormData] = useState({
    airline: '',
    origin_airport: '',
    destination_airport: '',
    departure_date: '',
    scheduled_departure_time: '',
    scheduled_arrival_time: '',
    distance: '',
    day_of_week: '',
    month: '',
    flight_number: '',
    weather_condition: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const airlines = [
    'Delta', 'United', 'American', 'Southwest', 'JetBlue',
    'Alaska', 'Spirit', 'Frontier', 'Hawaiian', 'Allegiant'
  ]
  
  const airports = [
    'JFK', 'LAX', 'ORD', 'DFW', 'ATL', 'SFO', 'MIA', 'SEA', 'DEN', 'EWR',
    'BOS', 'PHX', 'IAD', 'CLT', 'LGA', 'IAH', 'MSP', 'DTW', 'PHL', 'FLL'
  ]
  
  const weatherConditions = ['Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Storm']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const payload = {
        ...formData,
        distance: parseFloat(formData.distance),
        day_of_week: parseInt(formData.day_of_week),
        month: parseInt(formData.month)
      }
      
      const response = await predictDelay(payload)
      setResult(response)
    } catch (err) {
      setError('Failed to get prediction. Please try again.')
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      airline: '',
      origin_airport: '',
      destination_airport: '',
      departure_date: '',
      scheduled_departure_time: '',
      scheduled_arrival_time: '',
      distance: '',
      day_of_week: '',
      month: '',
      flight_number: '',
      weather_condition: ''
    })
    setResult(null)
    setError('')
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (prediction) => {
    return prediction === 'On Time' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Flight Delay Predictor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your flight details below to get an AI-powered prediction of whether your flight will be delayed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <Plane className="w-6 h-6 text-sky-600" />
              Flight Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Airline</label>
                  <select
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Airline</option>
                    {airlines.map(airline => (
                      <option key={airline} value={airline}>{airline}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number</label>
                  <input
                    type="text"
                    name="flight_number"
                    value={formData.flight_number}
                    onChange={handleChange}
                    placeholder="e.g., DL1234"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Origin Airport
                  </label>
                  <select
                    name="origin_airport"
                    value={formData.origin_airport}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Airport</option>
                    {airports.map(airport => (
                      <option key={airport} value={airport}>{airport}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Destination Airport
                  </label>
                  <select
                    name="destination_airport"
                    value={formData.destination_airport}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Airport</option>
                    {airports.map(airport => (
                      <option key={airport} value={airport}>{airport}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Departure Date
                  </label>
                  <input
                    type="date"
                    name="departure_date"
                    value={formData.departure_date}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weather Condition</label>
                  <select
                    name="weather_condition"
                    value={formData.weather_condition}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select Weather</option>
                    {weatherConditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Scheduled Departure Time
                  </label>
                  <input
                    type="time"
                    name="scheduled_departure_time"
                    value={formData.scheduled_departure_time}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Scheduled Arrival Time
                  </label>
                  <input
                    type="time"
                    name="scheduled_arrival_time"
                    value={formData.scheduled_arrival_time}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance (miles)</label>
                  <input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    placeholder="e.g., 2475"
                    required
                    min="0"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
                  <select
                    name="day_of_week"
                    value={formData.day_of_week}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Day</option>
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                      <option key={day} value={day}>{day} - {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][day - 1]}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select Month</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                      <option key={month} value={month}>{month} - {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month - 1]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing flight data...
                    </>
                  ) : (
                    <>
                      <Plane className="w-5 h-5" />
                      Predict Delay
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Prediction Result</h2>
            
            {result ? (
              <div className="space-y-6">
                {/* Status Card */}
                <div className={`p-6 rounded-xl border-2 ${result.prediction === 'On Time' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center justify-center mb-4">
                    {result.prediction === 'On Time' ? (
                      <CheckCircle className="w-16 h-16 text-green-600" />
                    ) : (
                      <AlertCircle className="w-16 h-16 text-red-600" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getStatusColor(result.prediction)}`}>
                      {result.prediction.toUpperCase()}
                    </div>
                    <div className="text-2xl font-semibold text-gray-700">
                      {(result.delay_probability * 100).toFixed(1)}% Delay Probability
                    </div>
                  </div>
                </div>

                {/* Risk Level */}
                <div className={`p-4 rounded-lg border ${getRiskColor(result.risk_level)}`}>
                  <div className="text-center">
                    <div className="text-sm font-medium mb-1">Risk Level</div>
                    <div className="text-2xl font-bold">{result.risk_level.toUpperCase()}</div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-center">
                    {result.prediction === 'Delayed' 
                      ? 'The model predicts a high probability of delay based on the provided flight characteristics.'
                      : 'The model predicts your flight is likely to be on time based on the provided flight characteristics.'}
                  </p>
                </div>

                {/* Flight Details */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-navy-900 mb-4">Flight Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route</span>
                      <span className="font-medium">{result.flight_details.origin_airport} → {result.flight_details.destination_airport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Airline</span>
                      <span className="font-medium">{result.flight_details.airline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flight Number</span>
                      <span className="font-medium">{result.flight_details.flight_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{result.flight_details.departure_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure Time</span>
                      <span className="font-medium">{result.flight_details.scheduled_departure_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival Time</span>
                      <span className="font-medium">{result.flight_details.scheduled_arrival_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">{result.flight_details.distance.toLocaleString()} miles</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Predict Another Flight
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Plane className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Fill out the form to get a prediction</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictor
