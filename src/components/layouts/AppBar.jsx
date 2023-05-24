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
import { ButtonOutlined } from '../common/Button';

function AuthUserBtn({ authUser, navigate }) {
  console.log('Appbar: AuthUserBtn');
  return (
    <>
      <ButtonOutlined
        background="#073c3a"
        opacity="0.8"
        onClick={() => navigate(`/blogs/create`)}
      >
        Create Blog
      </ButtonOutlined>
      <Typography
        color="inherit"
        variant="h6"
        onClick={() => navigate(`/users/${authUser}`)}
      >
        Hi {authUser}
      </Typography>
    </>
  );
}

function AuthUserBtnStack({ handleProfile, handleLogout }) {
  console.log('Appbar: AuthUserBtnStack');
  return (
    <Stack>
      <MenuItem onClick={handleProfile}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Stack>
  );
}

function GuestUserBtnStack({ handleClose }) {
  console.log('Appbar: GuestUserBtnStack');
  return (
    <Stack>
      <MenuItem onClick={handleClose}>Guest User</MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/Signin">Signin</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/Signup">Signup</Link>
      </MenuItem>
    </Stack>
  );
}

export default function MenuAppBar() {
  console.log('Appbar Component');
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
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          color="inherit"
          variant="h5"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate('')}
          name="logo"
        >
          Blogger App
        </Typography>

        {authUser && <AuthUserBtn authUser={authUser} navigate={navigate} />}
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
            <AuthUserBtnStack
              handleProfile={handleProfile}
              handleLogout={handleLogout}
            />
          ) : (
            <GuestUserBtnStack handleClose={handleClose} />
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
