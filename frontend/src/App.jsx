import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Home Route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          
          {/* Root Route - Redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch all - Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
