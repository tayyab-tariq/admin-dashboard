import { useGetCustomersQuery } from "@/state/api"
import { Box, useTheme } from "@mui/material"
import Header from "@/components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const palette = useTheme().palette;
  const { data, isLoading } = useGetCustomersQuery();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },

  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='CUSTOMERS' subtitle='List of Customers'  />
    
      <Box
        mt='40px'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },

          '& .MuiInputBase-root': {
            marginBottom: '1rem',
          },

          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: palette.background.alt,
            color: palette.secondary[100],
            borderBottom: 'none',
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
          rows={data || []}
          columns={columns}
          editMode="row"
        />
      </Box>
    
    </Box>
  )
}

export default Customers