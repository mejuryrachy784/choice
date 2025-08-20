import React, { useState } from 'react';

const TestAuth = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Test basic connection
      
      const response = await fetch('https://choice-gneg.onrender.com/');

      const data = await response.json();
      setResult(`✅ Backend connection: ${data.message}`);
    } catch (error) {
      setResult(`❌ Backend connection failed: ${error.message}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      const response = await fetch('https://choice-gneg.onrender.com/api/auth/login  ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'testuser@example.com',
          password: 'password123'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ Login successful: ${data.message}`);
      } else {
        setResult(`❌ Login failed: ${data.message}`);
      }
    } catch (error) {
      setResult(`❌ Login error: ${error.message}`);
    }
    setLoading(false);
  };

  const testRegister = async () => {
    setLoading(true);
    setResult('Testing registration...');
    
    try {
      const response = await fetch('https://choice-gneg.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          role: 'user'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ Registration successful: ${data.message}`);
      } else {
        setResult(`❌ Registration failed: ${data.message}`);
      }
    } catch (error) {
      setResult(`❌ Registration error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🔧 Authentication Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testBackend} disabled={loading} style={{ margin: '5px', padding: '10px' }}>
          Test Backend Connection
        </button>
        <button onClick={testLogin} disabled={loading} style={{ margin: '5px', padding: '10px' }}>
          Test Login
        </button>
        <button onClick={testRegister} disabled={loading} style={{ margin: '5px', padding: '10px' }}>
          Test Registration
        </button>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        border: '1px solid #ddd', 
        borderRadius: '5px',
        minHeight: '100px'
      }}>
        <h3>Result:</h3>
        <pre>{loading ? 'Loading...' : result}</pre>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>Test Credentials:</h4>
        <p>Email: testuser@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
};

export default TestAuth;