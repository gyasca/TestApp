import React, { useContext, useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../main";

function Register() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "directus",
      account_type: "employee",
      avatar: null,
      location: "",
      title: "",
      description: "",
      mobile_number: "",
      role: "",
    },
    validationSchema: yup.object({
      first_name: yup.string().trim().required("First name is required"),
      last_name: yup.string().trim().required("Last name is required"),
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup.string().trim().required("Password is required"),
      account_type: yup.string().trim().required("Account type is required"),
      // avatar: yup.mixed().required("Avatar is required"),
      location: yup.string().trim().required("Location is required"),
      title: yup.string().trim().required("Title is required"),
      description: yup.string().trim().required("Description is required"),
      mobile_number: yup.string().trim().required("Mobile number is required"),
    }),
    onSubmit: (data) => {
      console.log(
        "Form submitted with form data as follows (Unprocessed version):",
        data
      );

      if (data.password === "custom") {
        // Set the password to the value of customPassword field
        data.password = data.customPassword;
      }


      if (data.account_type == "hr") {
        data.role = "F9DD5027-7963-4381-8E46-EF757A67BC14"
      } else if (data.account_type == "employee") {
        data.role = "FD13C789-7DE3-48D8-9DC9-66DC353F30FD"
      }

      data.first_name = data.first_name.trim();
      data.last_name = data.last_name.trim();

      data.email = data.email.trim().toLowerCase();
      const personalEmail = data.email;

      if (data.account_type === "hr") {
        const emailParts = data.email.split("@");
        if (emailParts.length === 2) {
          const companyEmail = `${emailParts[0]}@testapp.hr.com`;
          data.email = companyEmail;
        }
      }

      data.password = data.password.trim();
      data.account_type = data.account_type;
      data.avatar = data.avatar;
      data.location = data.location;
      data.title = data.title;
      data.description = data.description;
      data.mobile_number = data.mobile_number;

      console.log("Processed form data:", data);

      setLoading(true);
      http
        .post("/users", data)
        .then((res) => {
          console.log(
            "Response from post/users (res.data.data):",
            res.data.data
          );

          if (data.account_type === "hr") {
            // Create an employee account alongside the HR account
            // First, we need to convert all HR Constants into employee values (Account type, role)
            data.account_type = "employee";
            data.email = personalEmail;
            data.role = "FD13C789-7DE3-48D8-9DC9-66DC353F30FD"
            console.log("Data before second post: ", data);

            http.post("/users", data).then((employeeResponse) => {
              console.log("employeeResponse object:", employeeResponse);
              console.log(
                "Employee account created:",
                employeeResponse.data.data
              );
            });
          }

          navigate("/");
          // if (res.data.data && res.data.data.access_token) {
          //   const accessToken = res.data.data.access_token;
          //   localStorage.setItem("accessToken", accessToken);

          //   const decodedToken = jwtDecode(accessToken);
          //   const userId = decodedToken.id;

          //   const storedAccessToken = localStorage.getItem("accessToken");
          //   if (storedAccessToken) {
          //     http
          //       .get(`/users/me`)
          //       .then((userRes) => {
          //         const userData = userRes.data.data;
          //         setUser(userData);
          //         navigate("/");
          //       })
          //       .catch((error) => {
          //         console.error("Error fetching user data:", error);
          //         toast.error("Error fetching user data");
          //       });
          //   } else {
          //     console.error("Access token not found in local storage");
          //     toast.error("Access token not found in local storage");
          //   }
          // } else {
          //   console.error("Access token not found in response:", res.data);
          //   toast.error("Access token not found in response");
          // }
        })
        .catch((err) => {
          console.error("Error registering user:", err);
          toast.error(`Error registering user: ${err.message}`);
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
        Register an Employee
      </Typography>
      <Box
        component="form"
        sx={{ maxWidth: "500px" }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="First Name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
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
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        <TextField
          fullWidth
          margin="dense"
          autoComplete="off"
          label="Personal email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* Old password field */}
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
        /> */}

        <TextField
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
        )}

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
            formik.touched.account_type && Boolean(formik.errors.account_type)
          }
          helperText={formik.touched.account_type && formik.errors.account_type}
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
          helperText={formik.touched.description && formik.errors.description}
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
            formik.touched.mobile_number && Boolean(formik.errors.mobile_number)
          }
          helperText={
            formik.touched.mobile_number && formik.errors.mobile_number
          }
        />

        {/* Add other fields for location, title, description, and mobile_number */}
        {/* ... */}
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Register
        </Button>
      </Box>

      <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

      {/* Login link */}
      <Typography variant="body2">
        Already have an account?{" "}
        <Button href="/login" variant="body2" sx={{ color: "orangered" }}>
          Log in here
        </Button>
      </Typography>

      <ToastContainer />
    </Box>
  );
}

export default Register;
