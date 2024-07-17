// src/utils/dataManipulation.js
export const transformDataForCharts = (data) => {
    return data.map(item => ({
      name: item.name, // Use 'name' for the X-axis
      id: item.id,     // Use 'id' for the value
    }));
  };
  