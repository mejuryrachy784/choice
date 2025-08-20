import React, { useState } from 'react';

const TestConnection = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult('Testing connection...');
    
    try {
      // Test basic connection
      const response = await fetch('https://choice-gneg.onrender.com/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(`✅ Backend connection successful!\n${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`❌ Backend responded with status: ${response.status}`);
      }
    } catch (error) {
      setResult(`❌ Connection failed: ${error.message}`);
      console.error('Connection test error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      const response = await fetch(' https://choice-gneg.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ Login test successful!\n${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`❌ Login test failed (${response.status}):\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setResult(`❌ Login test failed: ${error.message}`);
      console.error('Login test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🔧 Backend Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testBackend} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>
        
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Login (test@example.com)'}
        </button>
      </div>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        minHeight: '200px',
        border: '1px solid #ddd'
      }}>
        {result || 'Click a button to test the connection...'}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Expected results:</strong></p>
        <ul>
          <li>Backend connection should return API information</li>
          <li>Login test should return success with token</li>
          <li>If you see network errors, check if backend is running on port 5001</li>
        </ul>
      </div>
    </div>
  );
};
export default TestConnection;