import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [nationalId, setNationalId] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSearchOrNext = () => {
    if (result) {
      // Navigate to next page if result is already shown
      navigate(`/details/${nationalId.trim()}`);
    } else {
      if (nationalId.trim() === '') return;

      // Simulate checking database
      const knownIds = ['123456789', '11112222333']; // fake known IDs
      const hasLicense = knownIds.includes(nationalId.trim());

      if (hasLicense) {
        setResult({
          progress: '11/25',
          message: 'You have already a driving licence.',
          extra: '',
          color: 'green',
        });
      } else {
        setResult({
          progress: '11/25',
          message: 'No driving licence recorded.',
          extra: 'Make a booking to get your licence details captured.',
          color: 'blue',
        });
      }
    }
  };

  // Reset result when input changes
  const handleInputChange = (e) => {
    setNationalId(e.target.value);
    setResult(null);
  };

  return (
    <div className="home-container">
      <h1>VID Oral Exam Practice</h1>
      <p>Track your driving license status</p>
      <input
        type="text"
        placeholder="Enter your National ID Number"
        value={nationalId}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchOrNext}>
        {result ? 'Next' : 'Search'}
      </button>

      {result && (
        <div className="result-box">
          <div className="progress">{result.progress}</div>
          <div className={`message ${result.color}`}>{result.message}</div>
          {result.extra && <div className="extra blue">{result.extra}</div>}
        </div>
      )}
    </div>
  );
};

export default Home;

