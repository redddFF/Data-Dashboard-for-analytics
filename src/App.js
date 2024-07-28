import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket } from './actions/dataActions';
import CSVImporter from './components/CSVImporter';
import DataGridTable from './components/DataGridTable';
import ChartSelector from './components/ChartSelector';

function App() {
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.data);

  useEffect(() => {
    const cleanupWebSocket = dispatch(connectWebSocket());

    return () => {
      cleanupWebSocket(); // Clean up WebSocket connection on component unmount
    };
  }, [dispatch]);

  return (
    <div className="App">
      <h1>My Charts and Table</h1>
      <CSVImporter onFileUpload={() => {}} />
      {error && <p> {error.message}</p>}
      {data.length > 0 && (
        <>
          <DataGridTable data={data} />
          <ChartSelector data={data} />
        </>
      )}
    </div>
  );
}

export default App;
