import { Box, Grid } from '@mui/material';
import { Outlet, redirect } from 'react-router-dom';
import MenuAppBar from '../components/layouts/AppBar';
import SideBar from '../components/layouts/SideBar';
import getBlogs, { createBlog } from '../services/blogService';

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
  return (
    <Box sx={{ flexGrow: 1, flexDirection: 'row' }}>
      <MenuAppBar />
      <Grid container>
        <Grid xs={2} sm={4} md={4}>
          <SideBar />
        </Grid>
        <Grid xs={2} sm={4} md={4}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
