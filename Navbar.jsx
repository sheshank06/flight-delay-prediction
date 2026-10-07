import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="w-8 h-8 text-sky-600" />
            <span className="text-xl font-bold text-navy-900">FlightPredict AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/predictor" className="nav-link">Predictor</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
          
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
