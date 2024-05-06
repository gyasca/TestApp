import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Container,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import http from '../../http';
import { useNavigate } from "react-router-dom";
import AdminPageTitle from "../../components/AdminPageTitle";

function ViewEmployees() {
  const [employeeList, setEmployeeList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null); // Track the employee to delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Control the delete confirmation modal
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [page, rowsPerPage]); // Fetch data when page or rowsPerPage changes

  const fetchEmployees = () => {
    const offset = page * rowsPerPage;
    const limit = rowsPerPage;
    http.get(`/users?filter[account_type]=employee&offset=${offset}&limit=${limit}`).then((res) => {
      console.log(res.data);
      setEmployeeList(res.data.data);
    });
  };

  const handleEdit = (id) => {
    console.log("Edit employee:", id);
    navigate(`/admin/employees/edit/${id}`);
  };

  const handleDelete = (id) => {
    // Open the delete confirmation modal
    setDeleteEmployeeId(id);
    setOpenDeleteModal(true);
  };

  const confirmDeleteEmployee = () => {
    http
      .delete(`/users/${deleteEmployeeId}`)
      .then((res) => {
        console.log(res.data);
        // Update the employee list after successful deletion
        fetchEmployees();
      })
      .catch((error) => {
        console.error(error);
        // Handle delete error, show an error message, etc.
      })
      .finally(() => {
        // Close the delete confirmation modal
        setOpenDeleteModal(false);
      });
  };

  const cancelDeleteEmployee = () => {
    // Close the delete confirmation modal
    setOpenDeleteModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ marginTop: "1rem", minWidth: 0 }} maxWidth="xl">
      <AdminPageTitle title="All Employees" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>Role UUID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(employee.id)}
                    aria-label="edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(employee.id)}
                    aria-label="delete"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.title}</TableCell>
                <TableCell>{employee.account_type}</TableCell>
                <TableCell>{employee.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 5, 10, 20, 25, 30, 35, 40, 45, 50]} // Customize as needed
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={cancelDeleteEmployee}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteEmployee} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteEmployee} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ViewEmployees;
