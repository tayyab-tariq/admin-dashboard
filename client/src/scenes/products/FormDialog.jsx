import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Rating } from '@mui/material';

const FormDialog = (props) => {
    const { onClose, open, _id,
        name,
        description,
        price,
        rating,
        index } = props;

    const handleEntering = () => {
        // The `autoFocus` is not used because, if used, the same Enter that saves
        // the cell triggers "No". Instead, we manually focus the "No" button once
        // the dialog is fully open.
        // noButtonRef.current?.focus();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(_id);
    };

    return (
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 550 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        >
        {/* <DialogTitle>
            
      </DialogTitle> */}    
        <DialogContent dividers>
            {name}
        </DialogContent>
        <DialogContent dividers>
            {description}
        </DialogContent>
        <DialogContent dividers>
            {price}
        </DialogContent>
        <DialogContent dividers>
            <Rating value={rating} />
        </DialogContent>
        <DialogActions sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Button autoFocus onClick={handleCancel}>
            No
            </Button>
            <Button onClick={handleOk}>Yes</Button>
        </DialogActions>
        </Dialog>
    );
};

export default FormDialog;


