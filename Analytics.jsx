import { useState, useEffect } from 'react'
import { getAnalytics } from './api.js'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart3, TrendingUp, Clock, Plane, Loader2 } from 'lucide-react'

const COLORS = ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7']

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-sky-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Failed to load analytics data.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Flight Analytics Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive insights into flight delay patterns and trends across the aviation industry.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Delay Rate</span>
            </div>
            <div className="text-3xl font-bold text-navy-900">{analytics.overall_delay_percentage}%</div>
            <div className="text-sm text-gray-600">Overall delay percentage</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">On-Time Rate</span>
            </div>
            <div className="text-3xl font-bold text-navy-900">{analytics.on_time_percentage}%</div>
            <div className="text-sm text-gray-600">Overall on-time percentage</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-sky-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-sky-600" />
              </div>
              <span className="text-sm text-gray-500">Avg Delay</span>
            </div>
            <div className="text-3xl font-bold text-navy-900">{analytics.average_delay_minutes}m</div>
            <div className="text-sm text-gray-600">Average delay duration</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Plane className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Total Flights</span>
            </div>
            <div className="text-3xl font-bold text-navy-900">{analytics.total_flights_analyzed.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Flights analyzed</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Delay Distribution */}
          <div className="card">
            <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-600" />
              Delay Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.delay_distribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Delays by Airline */}
          <div className="card">
            <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <Plane className="w-5 h-5 text-sky-600" />
              Delays by Airline
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.delays_by_airline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="airline" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Delay Rate']} />
                <Bar dataKey="delay_rate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Delays by Day of Week */}
          <div className="card">
            <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-600" />
              Delays by Day of Week
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.delays_by_day}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Delay Rate']} />
                <Legend />
                <Line type="monotone" dataKey="delay_rate" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: '#0ea5e9' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Delays by Month */}
          <div className="card">
            <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              Delays by Month
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.delays_by_month}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Delay Rate']} />
                <Legend />
                <Line type="monotone" dataKey="delay_rate" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Delayed Airports */}
        <div className="card">
          <h3 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2">
            <Plane className="w-5 h-5 text-sky-600" />
            Top Airports with Highest Delay Rates
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Airport</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Delay Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.top_delayed_airports.map((airport, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-navy-900">{airport.airport}</td>
                    <td className="py-3 px-4 text-gray-600">{airport.name}</td>
                    <td className="py-3 px-4 font-semibold text-sky-600">{airport.delay_rate}%</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        airport.delay_rate > 20 ? 'bg-red-100 text-red-700' :
                        airport.delay_rate > 15 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {airport.delay_rate > 20 ? 'High' : airport.delay_rate > 15 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
