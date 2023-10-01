import DataGridCustomColumnMenu from "@/components/DataGridCustomColumnMenu";
import Header from "@/components/Header"
import { useGetUserPerformanceQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";


const Performance = () => {
  const palette = useTheme().palette;
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ]

  return (
    <Box m='1.5rem 2.5rem'>
        <Header title='Performance' subtitle='Track your Affiliate Sales Performance Here' />
        <Box mt='40px' height='70vh'
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            '& .MuiInputBase-root': {
              marginBottom: '1rem',
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
                rows={(data && data.sales) || []}
                columns={columns}
                slots={{
                  columnMenu: DataGridCustomColumnMenu,
                }}
            />
        </Box>

    </Box>
  )
}

export default Performance