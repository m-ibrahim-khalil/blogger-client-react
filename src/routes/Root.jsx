import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuAppBar, Spinner } from '../includes/components';
import { getBlogs } from '../services';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    backgroundColor: '#FAF5E8',
  },
}));

export async function loader({ request }) {
  console.log('Root Componenet: Loader get all blogs');
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const blogs = await getBlogs(page);
  if (!blogs || typeof blogs !== typeof [] || blogs instanceof String)
    throw new Error(blogs);
  return { blogs };
}

export default function Root() {
  const classes = useStyles();
  const { state } = useNavigate();
  console.log('Root Componenet');
  return (
    <div className={classes.root}>
      <MenuAppBar className={classes.appBar} />
      <Box className={classes.content} component="main">
        {state === 'loading' && <Spinner />}
        <Outlet />
      </Box>
    </div>
  );
}
