import DataGridCustomColumnMenu from "@/components/DataGridCustomColumnMenu";
import Header from "@/components/Header"
import { Box, useTheme } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";


const Performance = () => {
  const palette = useTheme().palette;

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
            {/* <DataGrid 
                rows={(data && data.sales) || []}

            /> */}
        </Box>

    </Box>
  )
}

export default Performance