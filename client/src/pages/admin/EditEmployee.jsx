import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initially set loading to true
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    // Fetch employee data based on ID when the component mounts
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    http.get(`/users/${id}`).then((res) => {
      console.log("Fetched employee data:", res.data.data);
      setEmployeeData(res.data.data);
      //   setLoading(false); // Set loading to false after data is fetched
    });
  };

  //   if (loading) {
  //     return <div>Loading...</div>; // Render loading indicator while fetching data
  //   }
  const formik = useFormik({
    initialValues: {
      first_name: employeeData?.first_name || "",
      last_name: employeeData?.last_name || "",
      email: employeeData?.email || "",
    //   password: employeeData?.password || "",
    //   customPassword: "",
      account_type: employeeData?.account_type || "",
      location: employeeData?.location || "",
      title: employeeData?.title || "",
      description: employeeData?.description || "",
      mobile_number: employeeData?.mobile_number || "",
      role: employeeData?.role || "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      first_name: yup.string().trim().required("First name is required"),
      last_name: yup.string().trim().required("Last name is required"),
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),
    //   password: yup
    //     .string()
    //     .trim()
    //     .min(6, "Password must be at least 6 characters"),
      account_type: yup.string().trim().required("Account type is required"),
      location: yup.string().trim().required("Location is required"),
      title: yup.string().trim().required("Title is required"),
      description: yup.string().trim().required("Description is required"),
      mobile_number: yup.string().trim().required("Mobile number is required"),
    }),
    onSubmit: (data) => {
        // Create a new object without the 'password' field
      const updatedData = { ...data };
      delete updatedData.password;
      console.log("Form submitted with form data as follows:", data);
      

      setLoading(true);
      http
        .patch(`/users/${id}`, updatedData)
        .then((res) => {
          console.log(
            "Response from patch/users/id (res.data.data):",
            res.data.data
          );
          toast.success("Employee information updated successfully");
          navigate("/admin/employees"); // Redirect to employee list page
        })
        .catch((err) => {
          console.error("Error updating employee:", err);
          toast.error(`Error updating employee: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ my: 2 }}>
        Edit Employee Information
      </Typography>

      {employeeData && (
        <>
          <Box
            component="form"
            sx={{ maxWidth: "500px" }}
            onSubmit={formik.handleSubmit}
          >
            {/* Add form fields for editing employee information */}
            {/* Similar to the registration form but pre-filled with existing data */}
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="First Name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Last Name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              select
              sx={{ marginY: "1rem" }}
            >
              <MenuItem value="directus">Default password: directus</MenuItem>
              <MenuItem value="custom">Custom Password</MenuItem>
            </TextField>

            {formik.values.password === "custom" && (
              <TextField
                fullWidth
                margin="dense"
                autoComplete="off"
                label="Custom Password"
                name="customPassword"
                type="password"
                value={formik.values.customPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.customPassword &&
                  Boolean(formik.errors.customPassword)
                }
                helperText={
                  formik.touched.customPassword && formik.errors.customPassword
                }
                sx={{ marginY: "1rem" }}
              />
            )} */}

            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <TextField
              fullWidth
              id="account_type"
              name="account_type"
              label="Account Type"
              select
              variant="outlined"
              value={formik.values.account_type}
              onChange={formik.handleChange}
              error={
                formik.touched.account_type &&
                Boolean(formik.errors.account_type)
              }
              helperText={
                formik.touched.account_type && formik.errors.account_type
              }
              sx={{ marginY: "1rem" }}
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="hr">Human Resource</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Mobile Number"
              name="mobile_number"
              value={formik.values.mobile_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobile_number &&
                Boolean(formik.errors.mobile_number)
              }
              helperText={
                formik.touched.mobile_number && formik.errors.mobile_number
              }
            />
            {/* ... */}

            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Update Employee
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

      {/* Cancel button to go back to employee list */}
      <Button variant="outlined" onClick={() => navigate("/admin/employees")}>
        Cancel
      </Button>

      <ToastContainer />
    </Box>
  );
}

export default EditEmployee;
