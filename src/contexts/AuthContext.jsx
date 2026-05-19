import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('digiagis_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Future API call would use API_URL
      // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      console.log(`Connecting to ${API_URL}...`);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Determine user type based on email domain
      let userData = {};

      // Admin detection
      if (email === 'umar.admin@demo.com' || email.includes('@digiagis.admin') || email.includes('admin@digiagis')) {
        userData = {
          id: 1,
          email: email,
          name: 'Platform Administrator',
          userType: 'admin',
          avatar: '/api/placeholder/40/40',
          isVerified: true,
          permissions: ['all'],
          joinDate: '2024-01-01'
        };
      }
      // Agent detection - official agent emails
      else if (email.includes('@digiagis.agent') || email.includes('agent@digiagis') || (email.includes('@digiagis') && !email.includes('admin'))) {
        userData = {
          id: 2,
          email: email,
          name: 'Certified Agent',
          userType: 'agent',
          avatar: '/api/placeholder/40/40',
          isVerified: true,
          trustScore: 95,
          agisId: 'ABJ-AGIS-2024',
          joinDate: '2024-01-01'
        };
      }
      // Buyer/Seller - normal email addresses
      else {
        const namePrefix = email.split('@')[0];
        userData = {
          id: 3,
          email: email,
          name: namePrefix.includes('buyer') ? 'Demo Buyer' : namePrefix.includes('seller') ? 'Demo Seller' : 'Demo User',
          userType: 'user',
          avatar: '/api/placeholder/40/40',
          isVerified: false,
          joinDate: '2024-01-01'
        };
      }

      setUser(userData);
      localStorage.setItem('digiagis_user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      // Future API call would use API_URL
      // const response = await axios.post(`${API_URL}/auth/signup`, userData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For agents, check if email is official
      if (userData.userType === 'agent') {
        if (!userData.email.includes('@digiagis')) {
          return { 
            success: false, 
            error: 'Agents must use official DigiAGIS email addresses provided by the platform administrator.' 
          };
        }
      }

      const newUser = {
        id: Math.random(),
        ...userData,
        isVerified: userData.userType === 'agent' ? false : true, // Agents need verification
        trustScore: userData.userType === 'agent' ? 0 : null,
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      setUser(newUser);
      localStorage.setItem('digiagis_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digiagis_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};