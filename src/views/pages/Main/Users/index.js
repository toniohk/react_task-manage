import React, { useState, useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow, Dialog, DialogActions, DialogTitle, DialogContent, InputBase, Select } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { BlueButton } from '../../../../components/Buttons';

import { getUsers, createUser, updateUser, deleteUser } from '../../../../apis/user';
import { useAppContext } from '../../../../context/AppContext';

const ActionButton = withStyles({
  root: {
    '&:focus': {
      outline: 'none'
    }
  },
})(IconButton);

const StyledDialog = withStyles({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '30px 25px 20px 25px',
      '& h2': {
        fontSize: '1.25rem',
        fontFamily: 'Poppins',
        minWidth: '16rem',
      },
    },
    '& .MuiDialogContent-root': {
      padding: '0 25px',
      '& p': {
        fontFamily: 'Poppins',
      }
    },
    '& .MuiDialogActions-root': {
      padding: '30px 25px 30px 25px',
    },
  },
})(Dialog);

const StyledInput = withStyles({
  root: {
    width: '100%',
    height: '36px',
    padding: '6px 16px',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    color: '#2e2e2e'
  },
})(InputBase);

const SelectInput = withStyles({
  root: {
    width: '100%',
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  input: {
    padding: '8px 15px'
  }
})(InputBase);

function Users(props) {
  const { setLoading, setMessage } = useAppContext();
  const [userList, setUserList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState({ type: 'create', open: false });
  const [dialogData, setDialogData] = React.useState({
    name: '',
    title: '',
    email: '',
    password: '',
    work_focus: '',
    due_date: [],
    status: 0
  });

  const loadUsers = useCallback(() => {
    setLoading(true);
    getUsers().then(res => {
      setUserList(res.filter(item => item.role !== 0));
      setLoading(false);
    }).catch(err => {
      setUserList([]);
      setMessage({ open: true, type: 'Error', body: 'Failed to load the user list.' });
      setLoading(false);
    });
  }, [setLoading, setMessage]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCreate = () => {
    setOpenDialog({ type: 'create', open: true });
    setDialogData({
      name: '',
      title: '',
      email: '',
      password: '',
      work_focus: 1,
      status: 0
    });
  };

  const handleEdit = (item) => {
    setOpenDialog({ type: 'edit', open: true });
    setDialogData(item);
  };

  const onChange = (name, val) => {
    setDialogData({ ...dialogData, [name]: val });
  }

  const handleSave = () => {
    if (openDialog.type === 'create') {
      setLoading(true);
      createUser({ ...dialogData, role: 1 }).then(res => {
        loadUsers();
      }).catch(err => {
        setMessage({ open: true, type: 'Error', body: 'Failed to create the user item.' });
        setLoading(false);
      });
    } else {
      setLoading(true);
      updateUser(dialogData.id, { ...dialogData, role: 1 }).then(res => {
        loadUsers();
      }).catch(err => {
        setMessage({ open: true, type: 'Error', body: 'Failed to update the user item.' });
        setLoading(false);
      });
    }

    setOpenDialog({ type: 'create', open: false });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteUser(id).then(res => {
      loadUsers();
    }).catch(err => {
      setMessage({ open: true, type: 'Error', body: 'Failed to delete the user item.' });
      setLoading(false)
    });
  };

  const getFocusString = (val) => {
    switch (val) {
      case 1:
        return 'development';
      case 2:
        return 'design';
      case 3:
        return 'business';
      case 4:
        return 'research';
    }
  };

  const getStatusString = (val) => {
    switch (val) {
      case 1:
        return 'Active';
      case 0:
        return 'Inactive';
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold">Employee management</p>
        <BlueButton onClick={() => handleCreate()}>Add new</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Work Focus</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell width={100} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{getFocusString(item.work_focus)}</TableCell>
                  <TableCell align="center">{getStatusString(item.status)}</TableCell>
                  <TableCell width={100} align="center">
                    <div className="flex justify-around">
                      <ActionButton onClick={() => handleEdit(item)}><Edit /></ActionButton>
                      <ActionButton onClick={() => handleDelete(item.id)}><Delete /></ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <StyledDialog
        open={openDialog.open}
        onClose={() => setOpenDialog({ ...openDialog, open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{openDialog.type === 'create' ? 'Create new empolyee' : 'Update the empolyee'}</DialogTitle>
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Name:</p>
            <StyledInput value={dialogData.name} onChange={e => onChange('name', e.target.value)} />
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Title:</p>
            <StyledInput value={dialogData.title} onChange={e => onChange('title', e.target.value)} />
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Email:</p>
            <StyledInput value={dialogData.email} onChange={e => onChange('email', e.target.value)} />
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Password:</p>
            <StyledInput type="password" value={dialogData.password} onChange={e => onChange('password', e.target.value)} />
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Work Focus:</p>
            <Select
              native
              value={dialogData.work_focus}
              onChange={e => onChange('work_focus', e.target.value)}
              input={<SelectInput />}
            >
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={1}>development</option>
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={2}>design</option>
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={3}>business</option>
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={4}>research</option>
            </Select>
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Status:</p>
            <Select
              native
              value={dialogData.status}
              onChange={e => onChange('status', e.target.value)}
              input={<SelectInput />}
            >
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={1}>Active</option>
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={0}>Inactive</option>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <BlueButton onClick={() => handleSave()}>{dialogData.type === 'create' ? 'Create' : 'Update'}</BlueButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

export default Users;
