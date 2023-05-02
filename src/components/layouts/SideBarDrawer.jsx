import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import ButtonSubmit from '../generics/ButtonSubmit';

const drawerWidth = 240;

function SideBarDrawer(props) {
  const [page, setPage] = useState(1);
  // const [blogs, setBlogs] = useState({
  //   payload: [],
  //   currentPage: 0,
  //   totalPages: 0,
  //   totalItems: 0,
  // });

  // usePaginate(page, setBlogs);
  const navigate = useNavigate();
  const { window, handleDrawerToggle, mobileOpen } = props;
  const { blogs } = useLoaderData();
  const { payload, totalPages } = blogs;

  const handleChange = (event, value) => {
    setPage(value);
    navigate(`/?page=${value}`);
  };

  const toolbarStyles = {
    background: '#bdc3c7',
  };

  const drawer = (
    <div style={toolbarStyles}>
      <Toolbar>
        <Form method="post">
          <ButtonSubmit label="Create Blog" color="secondary" />
        </Form>
      </Toolbar>
      <Typography
        variant="h6"
        align="center"
        style={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          color: '#863812',
        }}
      >
        Blog List
      </Typography>
      <Divider />
      <List>
        {payload.map((blog) => (
          <ListItem key={blog.id} disablePadding>
            <ListItemButton
              style={{
                color: '#863812',
                background: 'inherit',
                border: '2.5px solid',
              }}
              onClick={() => navigate(`blogs/${blog.id}`)}
            >
              <ListItemText primary={blog.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="blog list"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideBarDrawer;
