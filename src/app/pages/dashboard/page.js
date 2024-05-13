"use client"
import DashboardHeader from '@/app/components/DashboardHeader';
import PrivateRoute from '@/app/components/PrivateRoute';
import { fetchAllUsers, incrementFollowCount } from '@/app/redux/actions/user';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, isAuthenticated]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFollow = () => {
    dispatch(incrementFollowCount());
  };

  const dashboardHeaderHeight = 64; 

  return (
    <PrivateRoute>
      <DashboardHeader/>
      <Box sx={{ marginTop: 5 }}>
        <TableContainer sx={{ maxWidth: '70%', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 10, overflow: 'auto', maxHeight: `calc(100vh - ${dashboardHeaderHeight}px)` }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#555555' }}>Username</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#555555' }}>First Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#555555' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                <TableRow key={user.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={handleFollow}>Follow</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid #ddd', paddingTop: 2 }}
        />
      </Box>
    </PrivateRoute>
  );
};

export default DashboardPage;
