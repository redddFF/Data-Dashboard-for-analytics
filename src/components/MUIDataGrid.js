import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useMovieData } from '@mui/x-data-grid-generator';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const VISIBLE_FIELDS = ['title', 'company', 'director', 'year', 'cinematicUniverse'];

function MUIDataGrid() {
  const data = useMovieData();

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns],
  );

  return (
    <div>
       <header className="App-header">
    <h1>MUI-GRID and Recharts</h1>
  </header>
    
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rowHeight={(50)}
        {...data}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
      <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'pv', id: 'pvId' },
        { data: uData, label: 'uv', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
    />
      <Box sx={{ marginTop: 2 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Go to Home
          </Button>
        </Link>
      </Box>
    </Box>
    </div>
  );
}

export default MUIDataGrid;
