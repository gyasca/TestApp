import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import pages
import AdminRoutes from './pages/admin/AdminRoutes';
import UserRoutes from './pages/UserRoutes';


import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Navbar } from './components/Navbar';
import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Footer } from './components/Footer';
import { jwtDecode } from 'jwt-decode';
import http from './http';

// import directus instance (made possilbe by npm i @directus/sdk)
import directus from './directus';

let fonts = [
  'Poppins',
  'Nunito',
  'Roboto',
  '"Segoe UI"',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

// Theme for the website, configure it here
let theme = createTheme({
  palette: {
    primary: {
      main: "#FB8703",
      light: "#FFCB8E",
    },
    secondary: {
      main: grey[500],
    },
    blue: {
      main: "#0083CA",
    },
    yellow: {
      main: "#faf2e9",
      dark: "#c49451",
    },
    white: {
      main: "#ffffff",
    }
  },
  typography: {
    fontFamily: fonts,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: fonts,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Adjust border radius as needed
          // boxShadow: '1px 1px 1px 1px rgba(1, 1, 1, 0.2)', // Custom elevation style
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

// Global context to store and change stuff on the fly
export const UserContext = React.createContext(null);

function MainApp() {
  const location = useLocation();
  // User global context to store the contents of the JWT token
  const [user, setUser] = useState(null);
  // Global context to store if the current page is an admin page
  const [isAdminPage, setIsAdminPage] = useState(false);

  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        // Send a request to Directus to check if the user is authenticated
        const response = await http.get("/users/me");
        const user = response.data.data;

        // Set the user context with the retrieved user data
        setUser(user);
      } catch (error) {
        // If there's an error (e.g., token is invalid or user is not logged in), set the user context to null
        setUser(null);
      } finally {
        // Set the loading state to false after checking the user's authentication status
        setUserLoading(false);
      }
    };

    checkLoggedInUser();
  }, [setUser]);

  // Return routes. * is a wildcard for any path that doesn't match the other routes, so it will always return the 404 page
  // /admin/* is a wildcard for any path that starts with /admin/, so it will always return the admin routes. Admin routes is in pages/admin/AdminRoutes.jsx
  return (
    <>
      <UserContext.Provider value={{
        user: user,
        setUser: setUser,
        userLoading: userLoading,
        isAdminPage: isAdminPage,
        setIsAdminPage : setIsAdminPage
      }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Navbar />
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Routes location={location}>
              <Route path='*' element={<UserRoutes />} />
              <Route path='/admin/*' element={<AdminRoutes />} />
            </Routes>
          </Box>
          <Footer />
        </Box>


      </UserContext.Provider>

    </>

  )

}

// Check if root has already been created
const rootElement = document.getElementById('root');
const root = rootElement ? ReactDOM.createRoot(rootElement) : null;

if (root) {
  root.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <MainApp />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
} else {
  console.error('Root element not found in the document.');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();