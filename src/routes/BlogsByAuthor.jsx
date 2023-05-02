import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getBlogsByAuthor } from '../services/blogService';

export async function loader({ params }) {
  const blogs = await getBlogsByAuthor(params?.authorId);
  return { blogs };
}

export default function BlogsByAuthor() {
  const { blogs } = useLoaderData();
  const { payload } = blogs;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {payload.length ? (
        <>
          <Typography
            variant="h6"
            align="center"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#863812',
            }}
          >
            {payload[0].author}'s Blogs
          </Typography>
          <Divider />
          <nav>
            <List>
              {payload.map((blog) => (
                <ListItem key={blog.id} disablePadding>
                  <ListItemButton
                    style={{
                      color: '#863812',
                      background: 'inherit',
                      border: '2.5px solid',
                    }}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  >
                    <ListItemText primary={blog.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </>
      ) : (
        <Typography
          variant="h6"
          align="center"
          style={{
            fontFamily: 'Poppins',
            color: '#863812',
          }}
        >
          <i>No blogs</i>
        </Typography>
      )}
    </Box>
  );
}
