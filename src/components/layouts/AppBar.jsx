/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import authReducer, { initialState } from '../../reducers/auth';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Link to="/home">
            <MenuIcon />
          </Link>
        </IconButton>

        <Typography
          color="inherit"
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Link to="/home">Blogger</Link>
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
            {state?.isAuthenticated ? <AccountCircle /> : <NoAccountsIcon />}
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
            {state?.isAuthenticated ? (
              <Box>
                <MenuItem onClick={handleClose}>
                  <Link to={`users/${currentUser}`}>{currentUser}</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem onClick={handleClose}>Guest User</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Signin">Signin</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/Signup">Signup</Link>
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
