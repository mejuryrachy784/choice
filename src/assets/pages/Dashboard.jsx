// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || 'User';

//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/users');
//         if (!response.ok) throw new Error('Failed to fetch');

//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error('Fetch error:', error.message);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleStartPractice = () => {
//     navigate('/quiz', { state: { email } });
//   };

//   const handleViewResults = () => {
//     navigate('/touch', { state: { email } });
//   };

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="dashboard-box">
//       <h2>Welcome, {email}!</h2>

//       <p className="subtitle">Quick Access</p>

//       <div className="quick-access">
//         <button onClick={handleStartPractice} className="primary-btn">
//           Start Practice
//         </button>
//         <button onClick={handleViewResults} className="secondary-btn">
//           View Results
//         </button>
//         <button onClick={handleLogout} className="logout-btn">
//           Logout
//         </button>
//       </div>

//       <hr style={{ margin: '1rem 0' }} />

//       <h3>📊 User Data:</h3>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '1rem' }}>
//         {data.length > 0 ? (
//           data.map((item, index) => <li key={index}>{JSON.stringify(item)}</li>)
//         ) : (
//           <p>No data found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || 'User';

//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/userdata?email=" + encodeURIComponent(email))
//       .then((res) => res.text()) // raw text to debug server response
//       .then((text) => {
//         console.log("Returned response:", text);

//         try {
//           const jsonData = JSON.parse(text);
//           setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
//           setError(null);
//         } catch (err) {
//           setError("Invalid JSON response");
//           setData([]);
//           console.error("JSON parse error:", err);
//         }
//       })
//       .catch((err) => {
//         console.error("User Data Error:", err);
//         setError(err.message);
//       });
//   }, [email]);

//   const handleStartPractice = () => {
//     navigate('/quiz', { state: { email } });
//   };

//   const handleViewResults = () => {
//     navigate('/touch', { state: { email } });
//   };

//   const handleLogout = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="dashboard-box">
//       <h2>Welcome, {email}!</h2>

//       <p className="subtitle">Quick Access</p>

//       <div className="quick-access">
//         <button onClick={handleStartPractice} className="primary-btn">
//           Start Practice
//         </button>
//         <button onClick={handleViewResults} className="secondary-btn">
//           View Results
//         </button>
//         <button onClick={handleLogout} className="logout-btn">
//           Logout
//         </button>
//       </div>

//       <hr style={{ margin: '1rem 0' }} />

//       <h3>📊 User Data:</h3>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '1rem' }}>
//         {data.length > 0 ? (
//           data.map((item, index) => <li key={index}>{JSON.stringify(item)}</li>)
//         ) : (
//           !error && <p>No data found.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem('userEmail') || 'User';

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Get user's name from localStorage or use default
  const getUserName = () => {
    const userEmail = localStorage.getItem('userEmail') || location.state?.email;
    if (userEmail) {
      // Extract name from email (part before @)
      let name = userEmail.split('@')[0];
      
      // Handle different email formats
      if (name.includes('.')) {
        name = name.split('.')[0];
      }
      if (name.includes('_')) {
        name = name.split('_')[0];
      }
      if (name.includes('-')) {
        name = name.split('-')[0];
      }
      
      // Capitalize first letter and make rest lowercase
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return 'Driver';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const res = await fetch(`https://choice-gneg.onrender.com/api/userdata?email=${encodeURIComponent(email)}`);

        
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const jsonData = await res.json(); // 🔥 expect JSON only
        setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
        setError(null);
      } catch (err) {
        console.error("User Data Error:", err);
        setError(err.message || "Unknown error occurred");
        setData([]);
      }
    };

    fetchUserData();
  }, [email]);

  const handleStartPractice = () => {
    navigate('/service', { state: { email } });
  };

  const handleViewResults = () => {
    navigate('/touch', { state: { email } });
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    localStorage.removeItem('recentQuizStats');
    localStorage.removeItem('recentQuizMistakes');
    navigate('/login');
  };

  return (
    <div className="dashboard-box">
      <h2>Welcome, {getUserName()}!</h2>

      <p className="subtitle">Quick Access</p>

      <div className="quick-access">
        <button onClick={handleStartPractice} className="primary-btn">
          Start Practice
        </button>
        <button onClick={handleViewResults} className="secondary-btn">
          View Results
        </button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <hr style={{ margin: '1rem 0' }} />

      <h3>📊 User Data:</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '1rem' }}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>{JSON.stringify(item, null, 2)}</li>
          ))
        ) : (
          !error && <p>No data found.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;


