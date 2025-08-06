import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginDebug = () => {
  const [logs, setLogs] = useState([]);
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5001/api/auth";

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Test backend connection
  const testConnection = async () => {
    addLog("🔧 Testing backend connection...", "info");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        addLog(`✅ Backend connected: ${data.message}`, "success");
        addLog(`📊 Available endpoints: ${Object.keys(data.endpoints).join(', ')}`, "info");
      } else {
        addLog(`❌ Backend error: ${response.status} ${response.statusText}`, "error");
      }
    } catch (error) {
      addLog(`❌ Connection failed: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Test login
  const testLogin = async () => {
    addLog(`🔐 Testing login with ${email}...`, "info");
    setLoading(true);

    try {
      const requestData = { email, password };
      addLog(`📤 Request: POST ${BASE_URL}/login`, "info");
      addLog(`📤 Body: ${JSON.stringify({ email, password: "***" })}`, "info");

      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestData),
      });

      addLog(`📡 Response status: ${response.status}`, "info");
      addLog(`📡 Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`, "info");

      if (response.ok) {
        const data = await response.json();
        addLog(`✅ Login successful!`, "success");
        addLog(`📄 Response: ${JSON.stringify(data, null, 2)}`, "success");
        
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userEmail', email);
          addLog(`💾 Token stored in localStorage`, "success");
        }
      } else {
        const errorData = await response.json();
        addLog(`❌ Login failed: ${errorData.message}`, "error");
        addLog(`📄 Error response: ${JSON.stringify(errorData, null, 2)}`, "error");
      }
    } catch (error) {
      addLog(`❌ Request failed: ${error.message}`, "error");
      addLog(`🔍 Error details: ${error.stack}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Test signup
  const testSignup = async () => {
    const testEmail = `test${Date.now()}@example.com`;
    addLog(`📝 Testing signup with ${testEmail}...`, "info");
    setLoading(true);

    try {
      const requestData = { 
        email: testEmail, 
        password: "test123", 
        role: "user" 
      };
      
      addLog(`📤 Request: POST ${BASE_URL}/register`, "info");
      addLog(`📤 Body: ${JSON.stringify({ ...requestData, password: "***" })}`, "info");

      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestData),
      });

      addLog(`📡 Response status: ${response.status}`, "info");

      if (response.ok) {
        const data = await response.json();
        addLog(`✅ Signup successful!`, "success");
        addLog(`📄 Response: ${JSON.stringify(data, null, 2)}`, "success");
      } else {
        const errorData = await response.json();
        addLog(`❌ Signup failed: ${errorData.message}`, "error");
        addLog(`📄 Error response: ${JSON.stringify(errorData, null, 2)}`, "error");
      }
    } catch (error) {
      addLog(`❌ Request failed: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Check localStorage
  const checkLocalStorage = () => {
    addLog("🔍 Checking localStorage...", "info");
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    addLog(`Token: ${token ? '✅ Present' : '❌ Missing'}`, token ? "success" : "error");
    addLog(`Email: ${userEmail || '❌ Missing'}`, userEmail ? "success" : "error");
    addLog(`Role: ${userRole || '❌ Missing'}`, userRole ? "success" : "error");
  };

  // Clear localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    addLog("🗑️ localStorage cleared", "info");
  };

  useEffect(() => {
    addLog("🚀 Login Debug Tool initialized", "info");
    addLog(`Frontend URL: ${window.location.origin}`, "info");
    addLog(`Backend URL: ${BASE_URL}`, "info");
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>🔧 Login Debug Tool</h1>
      
      {/* Controls */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Test Credentials</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={testConnection} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            🔧 Test Connection
          </button>
          <button 
            onClick={testLogin} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            🔐 Test Login
          </button>
          <button 
            onClick={testSignup} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            📝 Test Signup
          </button>
          <button 
            onClick={checkLocalStorage} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            🔍 Check Storage
          </button>
          <button 
            onClick={clearLocalStorage} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            🗑️ Clear Storage
          </button>
          <button 
            onClick={clearLogs} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            🧹 Clear Logs
          </button>
          <button 
            onClick={() => navigate('/login')} 
            disabled={loading}
            style={{ padding: '8px 16px', backgroundColor: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            🔙 Back to Login
          </button>
        </div>
      </div>

      {/* Logs */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Debug Logs</h3>
        <div style={{ 
          height: '400px', 
          overflow: 'auto', 
          backgroundColor: '#000', 
          color: '#00ff00', 
          padding: '10px', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          {logs.map((log, index) => (
            <div 
              key={index} 
              style={{ 
                color: log.type === 'error' ? '#ff6b6b' : 
                       log.type === 'success' ? '#51cf66' : 
                       log.type === 'warning' ? '#ffd43b' : '#00ff00',
                marginBottom: '4px'
              }}
            >
              [{log.timestamp}] {log.message}
            </div>
          ))}
          {logs.length === 0 && (
            <div style={{ color: '#666' }}>No logs yet. Click a test button to start debugging.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDebug;