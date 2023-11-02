import {
    GridRowModes,
    GridToolbarContainer,
  } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const Toolbar = (props) => {
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
}

export default Toolbar