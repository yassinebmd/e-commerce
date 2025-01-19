import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { UseAuth } from '../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';

function ResponsiveAppBar() {
  const { username, isauthenticated, logout } = UseAuth()

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const Navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlLogout = () => {
    logout();
    Navigate('/');
    handleCloseUserMenu()

  }
  console.log('mn navbar ', username);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <AdbIcon sx={{ display: 'flex', mr: 1 }} />

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                jacin tech
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"

                color="inherit"
              >
                <MenuIcon />
              </IconButton>

            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <IconButton aria-label="cart" onClick={() => Navigate('/cart')}>
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCart sx={{color:'white'}}/>
                </Badge>
              </IconButton>
              {isauthenticated ? <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Typography>{username}</Typography>
                      </Grid>
                      <Grid item>
                        <Avatar alt={username || ''} src="/static/images/avatar/2.jpg" />
                      </Grid>
                    </Grid>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>my orders</Typography>
                  </MenuItem>
                  <MenuItem onClick={handlLogout}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </Menu>

              </> : <button color='black' onClick={() => Navigate('/login')}>Login</button>}

            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
