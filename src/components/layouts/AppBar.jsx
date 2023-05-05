/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { removeCoockie } from '../../utils/jwt';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { authUser, isLoggedIn, setAuthUser, setIsLoggedIn } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate(`/users/${authUser}`);
  };

  const handleLogout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    setAnchorEl(null);
    removeCoockie('jwt');
    navigate('/');
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography
          color="inherit"
          variant="h5"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate('')}
        >
          Blogger App
        </Typography>

        {authUser && (
          <Typography
            color="inherit"
            variant="h6"
            onClick={() => navigate(`/users/${authUser}`)}
          >
            {authUser}
          </Typography>
        )}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {isLoggedIn ? <AccountCircle /> : <NoAccountsIcon />}
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
          {authUser ? (
            <Stack>
              {/* <MenuItem onClick={handleClose}>
                <Link to={`users/${authUser}`}>{authUser}</Link>
              </MenuItem> */}
              <MenuItem onClick={handleProfile}>My account</MenuItem>
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
      </Toolbar>
    </AppBar>
  );
}
