/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authReducer, { initialState } from '../../reducers/auth';
import { getLogedInUsername, isLoggedIn } from '../../utils/jwt';

export default function MenuAppBar({
  drawerWidth,
  handleDrawerToggle,
  setCurrentUser,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: 'Logged out!',
    });
    setCurrentUser(null);
    setAnchorEl(null);
    navigate('/');
  };

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          color="inherit"
          variant="h6"
          noWrap
          sx={{ flexGrow: 1 }}
          onClick={() => navigate('/home')}
        >
          Blogger App
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {isLoggedIn() ? <AccountCircle /> : <NoAccountsIcon />}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {getLogedInUsername() ? (
              <Stack>
                <MenuItem onClick={handleClose}>
                  <Link to={`users/${getLogedInUsername()}`}>
                    {getLogedInUsername()}
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Stack>
            ) : (
              <Stack>
                <MenuItem onClick={handleClose}>Guest User</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Signin">Signin</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Signup">Signup</Link>
                </MenuItem>
              </Stack>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
