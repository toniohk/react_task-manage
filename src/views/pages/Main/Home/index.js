import React, { useState, useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow, Dialog, DialogActions, DialogTitle, DialogContent, InputBase, Select } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import { BlueButton } from '../../../../components/Buttons';

import { getTasks, createTask, updateTask, deleteTask } from '../../../../apis/task';
import { useAppContext } from '../../../../context/AppContext';
import { useUserContext } from '../../../../context/UserContext';

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

function Tasks(props) {
  const { setLoading, setMessage } = useAppContext();
  const { userInfo } = useUserContext();
  const [taskList, setTaskList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState({ type: 'create', open: false });
  const [dialogData, setDialogData] = React.useState({
    title: '',
    description: '',
    work_focus: '',
    due_date: [],
    status: 0
  });

  const loadTasks = useCallback(() => {
    setLoading(true);
    getTasks().then(res => {
      setTaskList(res);
      setLoading(false);
    }).catch(err => {
      setTaskList([]);
      setMessage({ open: true, type: 'Error', body: 'Failed to load the task list.' });
      setLoading(false);
    });
  }, [setLoading, setMessage]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

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
        return 'Working';
      case 2:
        return 'Need review';
    }
  };

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
      title: '',
      description: '',
      work_focus: '',
      due_date: [],
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
      createTask({ ...dialogData, user_id: userInfo.id }).then(res => {
        loadTasks();
      }).catch(err => {
        setMessage({ open: true, type: 'Error', body: 'Failed to create the task item.' });
        setLoading(false);
      });
    } else {
      setLoading(true);
      updateTask(dialogData.id, dialogData).then(res => {
        loadTasks();
      }).catch(err => {
        setMessage({ open: true, type: 'Error', body: 'Failed to update the task item.' });
        setLoading(false);
      });
    }

    setOpenDialog({ type: 'create', open: false });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteTask(id).then(res => {
      loadTasks();
    }).catch(err => {
      setMessage({ open: true, type: 'Error', body: 'Failed to delete the task item.' });
      setLoading(false)
    });
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold">Task management</p>
        <BlueButton onClick={() => handleCreate()}>Add new</BlueButton>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Work Focus</TableCell>
              <TableCell align="center">Due Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell width={100} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
              return (
                <TableRow hover role="checkbox" key={index}>
                  <TableCell align="center">{item.title}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{getFocusString(item.work_focus)}</TableCell>
                  <TableCell align="center">{item.due_date}</TableCell>
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
        count={taskList.length}
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
        <DialogTitle id="alert-dialog-title">{openDialog.type === 'create' ? 'Create new task' : 'Update the task'}</DialogTitle>
        <DialogContent>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Title:</p>
            <StyledInput value={dialogData.title} onChange={e => onChange('title', e.target.value)} />
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Description:</p>
            <StyledInput value={dialogData.description} onChange={e => onChange('description', e.target.value)} />
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
            <p className="w-40 font-light">Due date:</p>
            <StyledInput
              type="date"
              value={dialogData.due_date}
              onChange={e => onChange('due_date', e.target.value)}
            />
          </div>
          <div className="flex items-center my-4">
            <p className="w-40 font-light">Status:</p>
            <Select
              native
              value={dialogData.status}
              onChange={e => onChange('status', e.target.value)}
              input={<SelectInput />}
            >
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={1}>Working</option>
              <option className="w-108 h-9 py-1.5 px-4 bg-white rounded-6 border-2 border-solid border-gray-100 font-medium -tracking-0.67" value={2}>Need review</option>
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

export default Tasks;
