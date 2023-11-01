/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useGetCustomersQuery, useUpdateCustomerMutation, useAddCustomerMutation, useDeleteCustomerMutation } from "@/state/api"
import { Box, useTheme, Typography } from "@mui/material"
import Header from "@/components/Header";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const EditToolbar = (props) => {
  if (props.isLoading){
    return null;
  }

  const { setRowModesModel, setRows } = props;

  const handleClick = () => {
    
    const newId = '1';
    setRows((oldRows) => [{ _id: newId, name: '', occupation: '', role: 'user', isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

const Customers = () => {
  const palette = useTheme().palette;
  const { data, isLoading } = useGetCustomersQuery();
  const [ rows, setRows ] = useState();
  const [rowModesModel, setRowModesModel] = useState({});
  const [addCustomer, { isAdding }] = useAddCustomerMutation();
  const [updateCustomer, { isUpdating }] = useUpdateCustomerMutation();
  const [deleteCustomer, { isDeleting }] = useDeleteCustomerMutation();
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);    
  
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    console.log(rows);
    console.log(id);
    const updatedData = await deleteCustomer({userId: id});
    // console.log(updatedData);
    setRows(rows.filter((row) => row._id !== id));
  };

  const processRowUpdate = async (newRow) => {

    if (newRow.isNew){
      const updatedData = await addCustomer(newRow);
      if (updatedData && updatedData.data){
        setSnackbar({ children: 'User added successfully', severity: 'success' });
      } else {
        setSnackbar({ children: 'An error occurred, please try again later', severity: 'error' });
      }
      return updatedData.data;
    } else {
      const updatedData = await updateCustomer(newRow);
      if (updatedData && updatedData.data){
        setSnackbar({ children: 'User saved successfully', severity: 'success' });
      } else {
        setSnackbar({ children: 'An error occurred, please try again later', severity: 'error' });
      }
      return updatedData.data;
    }
    
  };

  const handleProcessRowUpdateError = (error) => {
    console.error(error);
  };

  const notVisible = {
    _id: false,
  };


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
      preProcessEditCellProps: (params) => {
        const hasError = !params.props.value || params.props.value.length < 3;
        return { ...params.props, error: hasError };
      },
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      preProcessEditCellProps: (params) => {
        const hasError = !params.props.value || params.props.value.length < 3;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value ? params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3") : null;
      },
      editable: true,
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
      editable: true,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
      editable: true, 
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? palette.greenAccent[600]
                : palette === "manager"
                ? palette.greenAccent[700]
                : palette.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={palette.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },

  ]

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  useEffect(() => {
    setRows(data);
  },[data]);

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
          loading={!rows}
          getRowId={(row) => row._id}
          columnVisibilityModel={notVisible}
          rows={rows || []}
          columns={columns}
          editMode="row"
          onRowModesModelChange={handleRowModesModelChange}
          rowModesModel={rowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRowModesModel, setRows, isLoading },
          }}

        />

        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Box>
    
    </Box>
  )
}

export default Customers