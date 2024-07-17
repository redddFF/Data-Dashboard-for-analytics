// src/components/ChartSelector.js
import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';
import ScatterPlotComponent from './ScatterPlotComponent';
import AreaChartComponent from './AreaChartComponent';

const ChartSelector = ({ data }) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({});
  const [selectedCharts, setSelectedCharts] = useState({
    lineChart: false,
    barChart: false,
    pieChart: false,
    scatterPlot: false,
    areaChart: false,
  });

  useEffect(() => {
    if (data.length > 0) {
      // Extract numerical column names
      const columnKeys = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
      setColumns(columnKeys);
      setSelectedColumns(columnKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    }
  }, [data]);

  const handleColumnChange = (event) => {
    setSelectedColumns({
      ...selectedColumns,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChartChange = (event) => {
    setSelectedCharts({
      ...selectedCharts,
      [event.target.name]: event.target.checked,
    });
  };

  // Prepare chart data based on selected columns
  const transformDataForCharts = (data) => {
    return data.map((item, index) => {
      const transformedItem = { name: item.name || `Item ${index + 1}` }; // Default to 'Item X' if 'name' is missing
      Object.keys(selectedColumns).forEach(column => {
        if (selectedColumns[column]) {
          transformedItem[column] = item[column];
        }
      });
      return transformedItem;
    });
  };

  const transformedData = transformDataForCharts(data);

  // Prepare data for Pie Chart
  const pieData = transformedData.map(item => ({
    name: item.name,
    value: Object.values(item).reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), 0),
  }));

  // Determine X and Y keys for Scatter Plot
  const scatterColumns = Object.keys(selectedColumns).filter(key => selectedColumns[key]);
  const xKey = scatterColumns[0];
  const yKey = scatterColumns[1];

  return (
    <Box>
      <FormGroup>
        <div>
          <h3>Select Columns for Charts:</h3>
          {columns.map((column) => (
            <FormControlLabel
              key={column}
              control={
                <Checkbox
                  checked={selectedColumns[column]}
                  onChange={handleColumnChange}
                  name={column}
                />
              }
              label={column}
            />
          ))}
        </div>
        <div>
          <h3>Select Charts:</h3>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCharts.lineChart}
                onChange={handleChartChange}
                name="lineChart"
              />
            }
            label="Line Chart"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCharts.barChart}
                onChange={handleChartChange}
                name="barChart"
              />
            }
            label="Bar Chart"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCharts.pieChart}
                onChange={handleChartChange}
                name="pieChart"
              />
            }
            label="Pie Chart"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCharts.scatterPlot}
                onChange={handleChartChange}
                name="scatterPlot"
              />
            }
            label="Scatter Plot"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCharts.areaChart}
                onChange={handleChartChange}
                name="areaChart"
              />
            }
            label="Area Chart"
          />
        </div>
      </FormGroup>

      <div>
        {selectedCharts.lineChart && <LineChartComponent data={transformedData} />}
        {selectedCharts.barChart && <BarChartComponent data={transformedData} />}
        {selectedCharts.pieChart && <PieChartComponent data={pieData} />}
        {selectedCharts.scatterPlot && scatterColumns.length >= 2 && (
          <ScatterPlotComponent data={transformedData} xKey={xKey} yKey={yKey} />
        )}
        {selectedCharts.areaChart && <AreaChartComponent data={transformedData} />}
      </div>
    </Box>
  );
};

export default ChartSelector;
