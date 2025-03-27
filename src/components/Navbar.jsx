import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DocumentTextIcon, DocumentIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-blue-950 shadow-lg">
      <div className="px-24">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-400">ResumeBuilder</span>
          </Link>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/resume"
                  className="text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Resume
                </Link>
                <Link
                  to="/cover-letter"
                  className="text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cover Letter
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className=" text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700  px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
