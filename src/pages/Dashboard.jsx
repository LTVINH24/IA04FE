import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Mail, Calendar, RefreshCw, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';

function Dashboard() {
  const { logout, isLoggingOut, isLoading: authLoading } = useAuth();

  // Fetch user info with React Query - auto-fetch when Dashboard mounts
  const { data: userInfo, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => authService.getUserInfo(),
    staleTime:  60 * 1000, // 1 minutes
    select: (data) => data.result,
    enabled: !authLoading, // Only fetch when auth is ready
  });

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back! Here's your account information.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </div>

        {/* User Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <CardTitle className="text-2xl">User Information</CardTitle>
              </div>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                disabled={isRefetching}
              >
                {isRefetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardDescription>
              Your account details and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <span className="ml-2 text-gray-600 dark:text-gray-300">Loading user information...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400 mb-4">
                  Failed to load user information
                </p>
                <Button onClick={() => refetch()} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : userInfo ? (
              <div className="space-y-6">
                {/* User ID */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      User ID
                    </p>
                    <p className="text-gray-900 dark:text-white font-mono text-sm break-all">
                      {userInfo.id}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Email Address
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {userInfo.email}
                    </p>
                  </div>
                </div>

                {/* Created At */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Account Created
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(userInfo.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Authentication Status Card */}
        
      </div>
    </div>
  );
}

export default Dashboard;
