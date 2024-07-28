// src/components/ChartSelector.js

import React, { useState, useEffect, useMemo } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';
import LineChartComponent from './charts/LineChartComponent';
import BarChartComponent from './charts/BarChartComponent';
import PieChartComponent from './charts/PieChartComponent';
import ScatterPlotComponent from './charts/ScatterPlotComponent';
import AreaChartComponent from './charts/AreaChartComponent';

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

  // Use 100 as a limit for data items
  const limit = 50;

  useEffect(() => {
    if (data.length > 0) {
      const columnKeys = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');

      // Update columns and preserve the state of selected columns for existing columns
      setColumns(columnKeys);

      setSelectedColumns(prevSelectedColumns => {
        const updatedSelectedColumns = { ...prevSelectedColumns };

        // Remove columns that are no longer in the data
        Object.keys(updatedSelectedColumns).forEach(col => {
          if (!columnKeys.includes(col)) {
            delete updatedSelectedColumns[col];
          }
        });

        // Add new columns and initialize their state
        columnKeys.forEach(col => {
          if (!(col in updatedSelectedColumns)) {
            updatedSelectedColumns[col] = false;
          }
        });

        return updatedSelectedColumns;
      });
    }
  }, [data]);

  const handleColumnChange = (event) => {
    const { name, checked } = event.target;
    setSelectedColumns(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChartChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCharts(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Limit data to the first 100 items
  const limitedData = useMemo(() => {
    return data.slice(0, limit);
  }, [data]);

  // Transform data based on selected columns
  const transformedData = useMemo(() => {
    return limitedData.map((item, index) => {
      const transformedItem = { name: item.name || `Item ${index + 1}` };
      Object.keys(selectedColumns).forEach(column => {
        if (selectedColumns[column]) {
          transformedItem[column] = item[column];
        }
      });
      return transformedItem;
    });
  }, [limitedData, selectedColumns]);

  // Prepare data for Pie chart
  const pieData = useMemo(() => {
    return transformedData.map(item => ({
      name: item.name,
      value: Object.values(item).reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), 0),
    }));
  }, [transformedData]);

  // Prepare data for Scatter Plot
  const scatterColumns = useMemo(() => {
    return Object.keys(selectedColumns).filter(key => selectedColumns[key]);
  }, [selectedColumns]);

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
                  checked={selectedColumns[column] || false}
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
        {selectedCharts.scatterPlot && xKey && yKey && <ScatterPlotComponent data={transformedData} xKey={xKey} yKey={yKey} />}
        {selectedCharts.areaChart && <AreaChartComponent data={transformedData} />}
      </div>
    </Box>
  );
};

export default ChartSelector;
