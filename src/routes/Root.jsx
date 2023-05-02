import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import MenuAppBar from '../components/layouts/AppBar';
import SideBarDrawer from '../components/layouts/SideBarDrawer';
import getBlogs, { createBlog } from '../services/blogService';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
}));

const drawerWidth = 240;

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page') || 1;
  const blogs = await getBlogs(page);
  return { blogs };
}

export async function action() {
  const blog = await createBlog({
    title: 'Untitled',
    description: 'No Description',
  });
  return redirect(`/blogs/${blog.id}/edit`);
}

export default function Root() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const localUser = localStorage.getItem('currentUser');
    setCurrentUser(localUser ? JSON.parse(localUser) : null);
  }, []);

  const classes = useStyles();
  const myProps = {
    handleDrawerToggle,
    drawerWidth,
    mobileOpen,
    setMobileOpen,
    currentUser,
    setCurrentUser,
  };

  return (
    <div className={classes.root}>
      <MenuAppBar className={classes.appBar} {...myProps} />
      <SideBarDrawer {...myProps} />
      <main className={classes.content}>
        <Outlet {...myProps} />
      </main>
    </div>
  );
}