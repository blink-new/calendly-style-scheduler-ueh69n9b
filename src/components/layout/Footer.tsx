import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-primary-700">MeetSync</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Simplify your scheduling and never miss an important meeting again.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Features</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Pricing</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Integrations</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">About Us</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Careers</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Blog</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm text-gray-600 hover:text-primary-600">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} MeetSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer