import { Brain, Database, BarChart3, Shield, Target, Zap } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">About FlightPredict AI</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding the technology and methodology behind our flight delay prediction system.
          </p>
        </div>

        {/* What We Do */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">What We Do</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              FlightPredict AI is a machine learning-powered platform that predicts flight delays before they happen.
              By analyzing historical flight data, weather patterns, and various operational factors, our system provides
              travelers with accurate delay probability estimates, helping them make informed decisions about their travel plans.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Flight delays cost billions of dollars annually and cause significant inconvenience to millions of passengers.
              Our mission is to leverage data science and machine learning to reduce the impact of delays by providing
              actionable predictions that enable better planning and decision-making.
            </p>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">Why Flight Delay Prediction Matters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-sky-50 p-6 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-2">For Passengers</h3>
                <p className="text-gray-600 text-sm">
                  Plan connections, arrange ground transportation, and manage expectations with accurate delay forecasts.
                </p>
              </div>
              <div className="bg-sky-50 p-6 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-2">For Airlines</h3>
                <p className="text-gray-600 text-sm">
                  Optimize operations, improve customer satisfaction, and reduce costs associated with delays.
                </p>
              </div>
              <div className="bg-sky-50 p-6 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-2">For Airports</h3>
                <p className="text-gray-600 text-sm">
                  Better resource allocation, improved gate management, and enhanced passenger experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Machine Learning Approach */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">Machine Learning Approach</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Model Architecture</h3>
                <p className="text-gray-700">
                  We use a Random Forest classifier, an ensemble learning method that combines multiple decision trees
                  to make predictions. This approach provides excellent accuracy while maintaining interpretability
                  and handling both numerical and categorical features effectively.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Training Process</h3>
                <p className="text-gray-700">
                  The model is trained on historical flight data containing millions of flight records. We use
                  stratified sampling to ensure balanced representation of delayed and on-time flights, and
                  employ cross-validation to optimize model parameters and prevent overfitting.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Feature Engineering</h3>
                <p className="text-gray-700">
                  Our feature engineering pipeline extracts meaningful patterns from raw data, including temporal
                  features (day of week, month, hour), route characteristics (distance, airports), operational
                  factors (airline, flight number), and weather conditions when available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dataset */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">Dataset</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our training dataset consists of comprehensive flight records including scheduled and actual departure
              and arrival times, airline information, origin and destination airports, flight distances, and
              weather data. The dataset spans multiple years and covers major airports across the United States.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-3">Data Sources</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Bureau of Transportation Statistics (BTS) flight data</li>
                <li>National Oceanic and Atmospheric Administration (NOAA) weather data</li>
                <li>Airline operational data</li>
                <li>Airport authority records</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">Model Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-navy-900 mb-3">Categorical Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Airline (encoded)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Origin Airport (encoded)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Destination Airport (encoded)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Weather Condition (encoded)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-3">Numerical Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Flight Distance (miles)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Day of Week (1-7)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Month (1-12)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                    Departure/Arrival Hours
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation Metrics */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">Evaluation Metrics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-sky-50 rounded-lg">
                <div className="text-3xl font-bold text-sky-600 mb-2">0.84</div>
                <div className="text-sm text-gray-600">Precision</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">0.82</div>
                <div className="text-sm text-gray-600">Recall</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">0.83</div>
                <div className="text-sm text-gray-600">F1-Score</div>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-navy-900">Limitations & Considerations</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Real-Time Factors</h3>
                  <p className="text-gray-600 text-sm">
                    Predictions are based on historical patterns and may not account for sudden, real-time events
                    such as weather changes, mechanical issues, or air traffic control decisions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Data Freshness</h3>
                  <p className="text-gray-600 text-sm">
                    The model is trained on historical data and may not capture recent changes in airline operations,
                    route structures, or airport procedures.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Regional Variations</h3>
                  <p className="text-gray-600 text-sm">
                    Model performance may vary across different regions, airports, and airlines due to differences
                    in data availability and operational characteristics.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">Prediction Horizon</h3>
                  <p className="text-gray-600 text-sm">
                    Predictions are most accurate for flights within 24-48 hours. Accuracy decreases for predictions
                    made further in advance due to increased uncertainty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Improvements */}
        <section>
          <div className="card bg-gradient-to-r from-navy-900 to-sky-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Future Improvements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Enhanced Data Integration</h3>
                <p className="text-gray-300 text-sm">
                  Incorporate real-time weather data, air traffic control information, and airline operational updates
                  for more accurate predictions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Advanced Models</h3>
                <p className="text-gray-300 text-sm">
                  Explore deep learning architectures and ensemble methods to improve prediction accuracy and
                  handle complex temporal dependencies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Explainable AI</h3>
                <p className="text-gray-300 text-sm">
                  Implement SHAP values and other interpretability techniques to provide users with explanations
                  for individual predictions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Global Expansion</h3>
                <p className="text-gray-300 text-sm">
                  Expand coverage to international routes and airports, incorporating regional flight patterns and
                  operational characteristics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
