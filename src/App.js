// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGridTable from './components/DataGridTable';
import ChartSelector from './components/ChartSelector';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setData(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>My Charts and Table</h1>
      <DataGridTable data={data} />
      <ChartSelector data={data} />
    </div>
  );
}

export default App;
