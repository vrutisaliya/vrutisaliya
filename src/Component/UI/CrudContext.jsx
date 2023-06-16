import React, { createContext, useState, useEffect } from 'react';

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
console.log('context is ------------->',children,data)
  useEffect(() => {
    // Fetch data from localStorage and set it in state
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const addData = (newData) => {
    setData([...data, newData]);
    // Store the updated data in localStorage
    localStorage.setItem('data', JSON.stringify([...data, newData]));
  };

  const updateData = (index, newData) => {
    const updatedData = [...data];
    updatedData[index] = newData;
    setData(updatedData);
    // Store the updated data in localStorage
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const deleteData = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  
    // Store the updated data in localStorage
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const searchByName = (query) => {
    setSearchQuery(query);
  };

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CrudContext.Provider value={{ data: filteredData, addData, updateData, deleteData, searchByName }}>
      {children}
    </CrudContext.Provider>
  );
};

export { CrudContext, CrudProvider };
