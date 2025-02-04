// src/components/DataGridTable.js
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataGridTable = ({ data }) => {
  // Generate columns dynamically based on the first object in the data array
  const columns = data.length > 0 ? Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    width: 150,
  })) : [];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
        getRowId={(row) => row.id || row.name || Math.random()} // Ensure each row has a unique 'id' field
      />
    </div>
  );
};

export default DataGridTable;
