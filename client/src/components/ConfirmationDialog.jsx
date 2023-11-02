import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const ConfirmationDialog = (props) => {
    const { onClose, open, value } = props;

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
        onClose(value);
    };

    return (
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
            {`Pressing 'Yes' will delete the user?`}
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

export default ConfirmationDialog;


