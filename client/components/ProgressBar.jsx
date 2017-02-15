import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="progress progress-striped active">
    <div className="progress-bar" style={{ width: progress + '%' }}></div>
  </div>
);

export default ProgressBar;
