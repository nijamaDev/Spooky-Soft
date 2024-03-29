import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  CircularProgress,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import UserListHead from './UserListHead';
import UserListToolbar from './UserListToolbar';

import EditUser from './EditUser';

// ----------------------------------------------------------------------
// name role status email pass
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        [_user.name, _user.lastname].join(' ').toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userlist, setUserlist] = useState([]);
  const [userID, setUserID] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/users/`).then((res) => {
      setUserlist(res.data);
      setIsLoading(false);
    });
  }, [updateList]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userlist.length) : 0;

  const filteredUsers = applySortFilter(userlist, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const roleMap = {
    3: 'Visitante',
    2: 'Operario',
    1: 'Administrador',
  };

  const statusMap = {
    3: 'Activo',
    4: 'Inactivo',
    5: 'Suspendido',
  };

  const statusColorMap = {
    Activo: 'success',
    Inactivo: 'warning',
    Suspendido: 'error',
  };

  return (
    <>
      <Helmet>
        <title> Users | One Market </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, lastname, role, status, email, imageUrl } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell component="th" scope="row" padding="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={imageUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {`${name} ${lastname}`}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{roleMap[role] || role}</TableCell>

                        <TableCell align="left">
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={5}
                            display="flex"
                            margin="auto"
                          >
                            <Label color={statusColorMap[status] || 'default'}>
                              {sentenceCase(statusMap[status] || status)}
                            </Label>
                            {(isLoading && <CircularProgress size={36} />) || (
                              <Button
                                onClick={() => {
                                  setOpenEdit(true);
                                  setUserID(row);
                                }}
                              >
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                Edit
                              </Button>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={userlist.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <EditUser
        open={openEdit}
        setOpen={setOpenEdit}
        user={userID}
        updateList={updateList}
        setUpdateList={setUpdateList}
      />
    </>
  );
}
