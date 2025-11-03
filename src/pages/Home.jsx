import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, LogIn, Home as HomeIcon, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <HomeIcon className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to JWT Authentication System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A complete authentication system built with React, featuring JWT access & refresh tokens, React Query, and React Hook Form.
          </p>
          {isAuthenticated && (
            <div className="mt-4">
              <p className="text-green-600 dark:text-green-400 font-medium">
                ✓ You are logged in
              </p>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          // Show Dashboard link if authenticated
          <div className="max-w-md mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <LayoutDashboard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-2xl">Dashboard</CardTitle>
                </div>
                <CardDescription>
                  View your account information and manage your session.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    View your profile information
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Manage authentication status
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Secure session with JWT tokens
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="w-full" size="lg">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Show Sign Up and Login cards if not authenticated
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sign Up Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-2xl">Sign Up</CardTitle>
                </div>
                <CardDescription>
                  Create a new account to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Email validation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Strong password requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Secure registration process
                  </li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full" size="lg">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Login Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <LogIn className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-2xl">Login</CardTitle>
                </div>
                <CardDescription>
                  Already have an account? Sign in to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    JWT access & refresh tokens
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Automatic token refresh
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    Secure authentication
                  </li>
                </ul>
                <Link to="/login">
                  <Button variant="outline" className="w-full" size="lg">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
