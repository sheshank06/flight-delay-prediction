import { Link } from 'react-router-dom'
import { Plane, BarChart3, Zap, Shield, Clock, TrendingUp, ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-sky-900/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-sky-500/20 p-4 rounded-full">
                <Plane className="w-12 h-12 text-sky-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Predict Flight Delays<br />
              <span className="text-sky-400">Before They Happen</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our advanced machine learning system analyzes flight data to provide accurate delay predictions,
              helping you plan your journey with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predictor" className="btn-primary bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center gap-2">
                Predict Flight Delay
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/analytics" className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
                Explore Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-sky-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-sky-600" />
              </div>
              <div className="text-3xl font-bold text-navy-900 mb-2">87%</div>
              <div className="text-gray-600">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="bg-sky-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-sky-600" />
              </div>
              <div className="text-3xl font-bold text-navy-900 mb-2">150K+</div>
              <div className="text-gray-600">Flights Analyzed</div>
            </div>
            <div className="text-center">
              <div className="bg-sky-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-sky-600" />
              </div>
              <div className="text-3xl font-bold text-navy-900 mb-2">25+</div>
              <div className="text-gray-600">Features Used</div>
            </div>
            <div className="text-center">
              <div className="bg-sky-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-sky-600" />
              </div>
              <div className="text-3xl font-bold text-navy-900 mb-2">RF</div>
              <div className="text-gray-600">Random Forest Model</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our prediction system uses advanced machine learning to analyze flight data and provide accurate delay forecasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-sky-600" />
              </div>
              <div className="text-sm font-semibold text-sky-600 mb-2">STEP 1</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Enter Flight Information</h3>
              <p className="text-gray-600">
                Input your flight details including airline, airports, departure time, and other relevant information.
              </p>
            </div>
            
            <div className="card text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-sky-600" />
              </div>
              <div className="text-sm font-semibold text-sky-600 mb-2">STEP 2</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">ML Model Analyzes Data</h3>
              <p className="text-gray-600">
                Our trained Random Forest model processes your flight data using 25+ features to generate predictions.
              </p>
            </div>
            
            <div className="card text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-sky-600" />
              </div>
              <div className="text-sm font-semibold text-sky-600 mb-2">STEP 3</div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Receive Delay Prediction</h3>
              <p className="text-gray-600">
                Get instant results with delay probability, risk level, and actionable insights for your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Predict Your Flight?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start using our AI-powered prediction system today and make informed decisions about your travel plans.
          </p>
          <Link to="/predictor" className="btn-primary bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center gap-2">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
