import { Plane, Github, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="w-6 h-6 text-sky-400" />
              <span className="text-lg font-bold">FlightPredict AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced machine learning powered flight delay prediction system.
              Helping travelers plan better journeys with accurate predictions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/predictor" className="hover:text-white transition-colors">Predictor</a></li>
              <li><a href="/analytics" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-navy-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 FlightPredict AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
