import React, { useContext, useState } from 'react';
import { CrudContext } from './UI/CrudContext';
import { Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const CrudList = () => {
  const { data, deleteData, searchByName } = useContext(CrudContext);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleEdit = (index) => {
    navigate(`/edit/${index}`);
  };

  const handleDelete = (index, id) => {
    deleteData(index);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchByName(query);
  };

  return (
    <div>
      <h2>Data List</h2>
      SEARCH: <input type="search" style={{ width: '500px' }} value={searchQuery} onChange={handleSearch} />
      <Button onClick={() => navigate("/")} variant="contained" color="primary">
        Add List
      </Button>
      <table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Qulification</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.qulification}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(index)} variant="contained" color="primary">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
};

export default CrudList;
