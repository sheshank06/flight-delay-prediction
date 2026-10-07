import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import Predictor from './Predictor.jsx'
import Analytics from './Analytics.jsx'
import About from './About.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predictor" element={<Predictor />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
