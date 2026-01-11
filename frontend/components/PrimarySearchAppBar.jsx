import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  // Desktop menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar sx={{ px: { xs: 1, md: 4 } }}>

          {/* 🔹 WEBSITE HEADING (WORKS ON MOBILE) */}
          <Typography
            variant="h6"
            sx={{
              cursor: 'pointer',
              fontWeight: 600,
              flexGrow: { xs: 1, md: 0 },
              textAlign: { xs: 'center', md: 'left' }
            }}
            onClick={() => navigate('/home')}
          >
            Blogs
          </Typography>

          {/* 🔹 DESKTOP ICONS */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="inherit" onClick={() => navigate('/blog/create')}>
              <AddIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
          </Box>


          {/* 🔹 MOBILE MENU ICON */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >

            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {/* 🔹 MOBILE MENU */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            navigate('/blog/create');
          }}
        >
          <AddIcon sx={{ mr: 1 }} /> Create
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMobileMenuClose();
            navigate('/profile');
          }}
        >
          <AccountCircle sx={{ mr: 1 }} /> Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            console.log('Before:', localStorage.getItem('user'));
            localStorage.removeItem('user');
            console.log('After:', localStorage.getItem('user'));

            handleMobileMenuClose();
            navigate('/');
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* 🔹 DESKTOP PROFILE MENU */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        sx={{ display: 'flex', justifyContent: 'end' }}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => {
          console.log('Before:', localStorage.getItem('user'));
          localStorage.removeItem('user');
          console.log('After:', localStorage.getItem('user'));
          navigate('/');
        }}>Logout</MenuItem>
      </Menu>

    </Box>
  );
}
