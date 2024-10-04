import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Package, Plus, LogIn, LogOut } from 'lucide-react';
import ToteList from './components/ToteList';
import ToteForm from './components/ToteForm';
import ToteDetails from './components/ToteDetails';
import ThemeToggle from './components/ThemeToggle';
import AccentColorPicker from './components/AccentColorPicker';
import { useTotes } from './hooks/useTotes';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { totes, addTote, deleteTote } = useTotes();
  const { theme } = useTheme();
  const { user, signIn, signOut } = useAuth();

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-6 flex flex-col sm:py-12`}>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-accent-color" />
                <h1 className="text-3xl font-bold">Binventory</h1>
              </div>
              <div className="flex items-center space-x-4">
                <AccentColorPicker />
                <ThemeToggle />
                {user ? (
                  <>
                    <Link
                      to="/add"
                      className="bg-accent-color text-white py-2 px-4 rounded-md hover:bg-accent-color-dark focus:outline-none focus:ring-2 focus:ring-accent-color focus:ring-opacity-50 flex items-center"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Bin
                    </Link>
                    <button
                      onClick={signOut}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={signIn}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
            {user ? (
              <Routes>
                <Route path="/" element={<ToteList totes={totes} />} />
                <Route path="/add" element={<ToteForm onAdd={addTote} />} />
                <Route path="/tote/:id" element={<ToteDetails totes={totes} onDelete={deleteTote} />} />
              </Routes>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Welcome to Binventory</h2>
                <p className="mb-4">Please sign in to manage your totes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;