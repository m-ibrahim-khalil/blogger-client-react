import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
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

export async function loader() {
  const blogs = await getBlogs();
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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();
  const myProps = {
    handleDrawerToggle,
    drawerWidth,
    mobileOpen,
    setMobileOpen,
  };

  return (
    <div className={classes.root}>
      <MenuAppBar className={classes.appBar} {...myProps} />
      <SideBarDrawer {...myProps} />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}
