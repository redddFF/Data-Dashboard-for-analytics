// src/components/CSVImporter.js
import React from 'react';
import Papa from 'papaparse';

const CSVImporter = ({ onFileUpload }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const rows = results.data;
          onFileUpload(rows); // Pass data to the parent component
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CSVImporter;
