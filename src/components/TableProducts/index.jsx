import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useFirebase } from '../../context/Firebase.context'; 

export function ProductsTable() {

    const { rows, fetchDataProducts } = useFirebase();

    useEffect(() => {
        fetchDataProducts();
    }, []); 

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Produto:', width: 130 },
        { field: 'value', headerName: 'Valor:', width: 130 },
    ];

  return (
    <Box >
      <DataGrid
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
          console.log(newSelection);
        }}
      />
    </Box>
  );
}