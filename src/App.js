import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PieChartComponent from './components/PieChartComponent';
import BarChartComponent from './components/BarChartComponent';
import LineChartComponent from './components/LineChartComponent';
import DataGridDemo from './components/DataGridDemo';
import './App.css';
import MUIDataGrid from './components/MUIDataGrid';
const chartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

function Home() {
  const [selectedChart, setSelectedChart] = useState('Pie');

  const renderChart = () => {
    switch (selectedChart) {
      case 'Pie':
        return <PieChartComponent data={chartData} />;
      case 'Bar':
        return <BarChartComponent data={chartData} />;
      case 'Line':
        return <LineChartComponent data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Recharts</h1>
      </header>
 
      <div className="chart-selector">
        <label>Select a Chart Type: </label>
        <select onChange={(e) => setSelectedChart(e.target.value)} value={selectedChart}>
          <option value="Pie">Pie Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
        </select>
      </div>

      {renderChart()}


      <div className="navigation-button">
        <Link to="/AGdatagrid-demo">
          <button>Go to AG GRID Demo</button>
        </Link>
        <Link to="/MUI-Data-Grid">
          <button>Go to MUI Data Grid Demo</button>
        </Link>
       
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/AGdatagrid-demo" element={<DataGridDemo />} />
        <Route path="/MUI-Data-Grid" element={<MUIDataGrid />} />
     
      </Routes>
    </Router>
  );
}

export default App;
