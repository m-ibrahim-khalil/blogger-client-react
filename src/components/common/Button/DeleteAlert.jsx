import { Box } from '@mui/material';
import { Form } from 'react-router-dom';
import ButtonOutlined from './Outlined';
import AlertDialog from '../Dialog/AlertDialog';

export default function DeleteAlertButton({
  open,
  handleClickOpen,
  handleClose,
}) {
  return (
    <Box display="flex">
      <Form action="update">
        <ButtonOutlined>Update Password</ButtonOutlined>
      </Form>

      <ButtonOutlined onClick={handleClickOpen}>Delete</ButtonOutlined>
      <AlertDialog
        title="Do you want to delete this blog!"
        description="Deleting your blog will remove the blog permanantly from our database. This cannot be undone."
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}
