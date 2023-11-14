import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import { useGetTransactionsQuery } from "@/state/api";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

const Transactions = () => {
  const palette = useTheme().palette;

  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 20});
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const { data, isLoading } = useGetTransactionsQuery({
    ...paginationModel,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'User Name',
      flex: 1,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,

    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toUTCString(); // Adjust date formatting as needed
      },
    },

  ]

  
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title="TRANSACTIONS" subtitle='Entire list of transactions' />
      <Box height='80vh'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          '& .MuiInputBase-root': {
            marginBottom: '0.75rem',
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: palette.background.alt,
            color: palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: palette.background.alt,
            color: palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columnVisibilityModel={{
            _id: false,
          }}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[20, 50, 100]}
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots = {{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: {
              // override default props
              disableDensitySelector: true,
              searchInput, 
              setSearchInput, 
              setSearch, 
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions