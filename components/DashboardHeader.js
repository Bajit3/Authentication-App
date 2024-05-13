import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout'
import { logoutUser } from '../redux/actions/user';

const DashboardHeader = () => {
  const followCount = useSelector(state => state.user.followCount);
  const dispatch = useDispatch();
  const handleLogout = () =>{
      dispatch(logoutUser())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{paddingRight:10}}>Follow Count : {followCount}</Typography>
        <Typography variant="body1">Logout
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;