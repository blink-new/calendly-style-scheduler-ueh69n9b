import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Calendar, User } from 'lucide-react'

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-primary-600" />
          <span className="text-xl font-bold text-primary-700">MeetSync</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link to="/calendar" className="text-gray-600 hover:text-primary-600 transition-colors">
            My Calendar
          </Link>
          <Link to="#" className="text-gray-600 hover:text-primary-600 transition-colors">
            How It Works
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header