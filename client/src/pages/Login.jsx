import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../main";
import { jwtDecode } from "jwt-decode";
import { validateUser } from "../functions/user";
import { useSnackbar } from "notistack";

// import directus instance (made possilbe by npm i @directus/sdk)
import directus from "../directus";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [checkedLoggedIn, setCheckedLoggedIn] = useState(null);

  useEffect(() => {
    if (validateUser()) {
      enqueueSnackbar("You are already logged in!", {
        variant: "error",
      });
      setCheckedLoggedIn(true);
      return navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      password: yup.string().trim().required("Password is required"),
    }),
    onSubmit: (data) => {
      data.email = data.email.trim().toLowerCase();
      data.password = data.password.trim();
      http
        .post("/auth/login", data)
        .then((res) => {
          if (res.data.data && res.data.data.access_token) {
            const accessToken = res.data.data.access_token;
            localStorage.setItem("accessToken", accessToken);

            // Decode the access token to get the user ID
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id;
            console.log(
              "Successfully authenticated, accessToken:",
              accessToken
            );
            console.log(
              "Successfully authenticated, decoded Token:",
              decodedToken
            );
            console.log("Successfully authenticated, user id:", userId);

            // Check if access token is stored in local storage
            const storedAccessToken = localStorage.getItem("accessToken");
            console.log(
              "Check if accessToken is already stored: ",
              storedAccessToken
            );
            if (storedAccessToken) {
              // Fetch user details using API call
              http
                .get(`/users/me`)
                .then((userRes) => {
                  console.log("Response from /users/me:", userRes);
                  const userData = userRes.data.data;
                  console.log("User data to set into user:", userData);
                  setUser(userData);
                  // console.log("User data successfully set into user:", user);
                  navigate("/");
                })
                .catch((error) => {
                  console.error("Error fetching user data:", error);
                  toast.error("Error fetching user data");
                });
            } else {
              console.error("Access token not found in local storage");
              toast.error("Access token not found in local storage");
            }
          } else {
            console.error("Access token not found in response:", res.data);
            toast.error("Access token not found in response");
          }
        })
        .catch((err) => {
          console.error("Error logging in:", err);
          toast.error(`Error logging in: ${err.message}`);
        });

      //   try {
      //     const response = directus.auth.login({ email: data.email, password: data.password });
      //     localStorage.setItem("accessToken", response.data.accessToken);
      //     setUser(response.data.user);
      //     navigate("/");
      //   } catch (error) {
      //     toast.error("Incorrect email or password");
      //   }
    },
  });

  // forgot password functionalities
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Validation schema for the Forgot Password form
  const forgotPasswordSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .max(50, "Email must be at most 50 characters")
      .required("Email is required"),
  });

  // Formik hook for the Forgot Password form
  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      // Disable the button to prevent multiple submissions

      // Check if the user exists
      http
        .get(`/user/email/${values.email}`)
        .then((res) => {
          const userData = res.data;
          // Check if the user has a Google account type
          console.log(res.data);
          if (userData.googleAccountType) {
            toast.error(
              "Accounts with Google account type cannot change password."
            );
          } else {
            // Proceed with sending the password reset link
            values.email = values.email.trim();
            http
              .post(`/user/forgotpassword/${values.email}`)
              .then((res) => {
                toast.success("Password reset link sent to your email.");
              })
              .catch((error) => {
                toast.error("Failed to send password reset link.");

                console.log(error);
              });
          }
        })
        .catch((error) => {
          // Handle the case where the user does not exist
          toast.error("User does not exist.");
          console.log("User doesn't exist", error);
        });
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ my: 2 }}>
        Sign in to HRTestApp Account
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
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
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
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
          Login
        </Button>
      </Box>

      <Box
        fullWidth
        className="App"
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box id="signInBox"></Box>

        {/* Forgot Password Form */}
        {showForgotPassword ? (
          <Box
            component="form"
            sx={{ maxWidth: "500px", mt: 2 }}
            onSubmit={forgotPasswordFormik.handleSubmit}
          >
            {/* Form title */}
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              Forgot Your Password?
            </Typography>
            {/* Email field */}
            <TextField
              fullWidth
              margin="dense"
              autoComplete="off"
              label="Email"
              name="email"
              value={forgotPasswordFormik.values.email}
              onChange={forgotPasswordFormik.handleChange}
              onBlur={forgotPasswordFormik.handleBlur}
              error={
                forgotPasswordFormik.touched.email &&
                Boolean(forgotPasswordFormik.errors.email)
              }
              helperText={
                forgotPasswordFormik.touched.email &&
                forgotPasswordFormik.errors.email
              }
            />
            {/* Submit button */}
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Send Reset Link
            </Button>
          </Box>
        ) : (
          // Button to show forgot password form
          <Button
            variant="text"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot Password?
          </Button>
        )}
        {/* Divider */}
        <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />

        {/* Don't have an account? Register now */}
        <Typography variant="body2" sx={{ mt: 4 }}>
          Don't have an account?{" "}
          <Button href="/register" variant="body2" sx={{ color: "orangered" }}>
            Register an account
          </Button>
        </Typography>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default Login;
