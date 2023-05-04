import { Button } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import dateTimeFormatter from '../../utils/dateTimeFormatter';

export default function BlogCard({ blog }) {
  const { authUser: currentUser } = useAuth();
  const { title, description, author, updatedAt, avatar } = blog;
  console.log(currentUser, author);
  const navigate = useNavigate();
  return (
    <Card className="blogCard" st>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="blog">
            B
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography
            variant="h6"
            component="div"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#863812',
            }}
          >
            {title}
          </Typography>
        }
        subheader={
          <>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Last Modified:</b> {dateTimeFormatter(updatedAt)}
            </Typography>
            <Typography
              onClick={() => navigate(`/users/${author}`)}
              sx={{ mb: 1.5 }}
              style={{
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                color: '#863812',
              }}
            >
              Author: @{author}
            </Typography>
          </>
        }
      />
      <CardMedia
        component="img"
        height="400 px"
        image={avatar}
        alt="Blog Cover Photo"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: 'justify' }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {currentUser === author ? (
          <Box display="flex">
            <Form action="edit">
              <Button
                size="small"
                type="submit"
                variant="outlined"
                style={{
                  backgroundColor: '#863812',
                  color: '#EBE4D2',
                  marginLeft: '4.5rem',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '5px',
                }}
              >
                Edit
              </Button>
            </Form>
            <Form
              method="post"
              onSubmit={(event) => {
                // eslint-disable-next-line no-restricted-globals
                if (
                  !confirm('Please confirm you want to delete this record.')
                ) {
                  event.preventDefault();
                }
              }}
            >
              <Button
                size="small"
                type="submit"
                variant="outlined"
                style={{
                  borderColor: '#b11e1e',
                  color: '#b11e1e',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '5px',
                  border: '1.5px',
                }}
              >
                Delete
              </Button>
            </Form>
          </Box>
        ) : null}
      </CardActions>
    </Card>
  );
}
