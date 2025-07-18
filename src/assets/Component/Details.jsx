

import React from 'react';
import { useParams } from 'react-router-dom';
import './Details.css'; 

const Details = () => {
  const { id } = useParams();

  return (
    <div className="details-container">
      <h2>Driving Licence Details</h2>
      <p><strong>National ID:</strong> {id}</p>
      <p>This page displays details related to your driving licence status.</p>
    </div>
  );
};

export default Details;
