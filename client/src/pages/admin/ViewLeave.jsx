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

function ViewLeave() {
    useEffect(() => {
        // Fetch employee data based on ID when the component mounts
        localStorage.setItem("accessToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWQiOiJ1czcwajdrZ2prcHExcXliIiwicm9sZXMiOnsib3JnLWxldmVsLWNyZWF0b3IiOnRydWUsInN1cGVyIjp0cnVlfSwidG9rZW5fdmVyc2lvbiI6IjkwOGM4ZjMzN2EyY2Y1YjkxNzAzZWVkODUzMTZkMmE1YWVhNDdmMTEyYTQxNzIyNWNhM2M2N2RkOGI5NDNlMWRmY2IzZTViMDc4NDdjZjEwIiwiaWF0IjoxNzE0OTcxNDk5LCJleHAiOjE3MTUwMDc0OTl9.kaq8VoW2WaWhzPj0eyYxVFwjM5WxtNxsTcGEE2vFd04");
        fetchLeaveRequests();
      }, []);
    
      const fetchLeaveRequests = () => {
        http.get(`/api/v2/tables/mfonb8z9mmrcvzr/records`).then((res) => {
          console.log("Fetched leave data:", res.data);
        //   setEmployeeData(res.data);
          //   setLoading(false); // Set loading to false after data is fetched
        });
      };
  return (
    <div>ViewLeave</div>
  )
}

export default ViewLeave