import { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFound from '../errors/NotFound'
import AdminPanelLanding from "./AdminPanelLanding";
import ViewEmployees from "./ViewEmployees";
import EditEmployee from "./EditEmployee";
import Register from './Register';
import ViewLeave from './ViewLeave';
import { UserContext } from "../../main";
import { useSnackbar } from 'notistack'
import { validateAdmin } from '../../functions/user';

function AdminRoutes() {
  // Routes for admin pages. To add authenication so that only admins can access these pages, add a check for the user's role in the UserContext
  const { setIsAdminPage } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminPage(true);
    validateAdmin()
        .then(isAdmin => {
            console.log(isAdmin);
            if (!isAdmin) {
                enqueueSnackbar("You must be an HR Personnel to view this page", { variant: "error" });
                console.log("You must be an HR Personnel to view this page");
                navigate("/");
            }
        })
        .catch(error => {
            console.error("Error validating admin:", error);
            enqueueSnackbar("Error validating admin", { variant: "error" });
            navigate("/");
        });
}, []);


  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path={"/panel"} element={<AdminPanelLanding />} />
      <Route path={"/employees"} element={<ViewEmployees />} />
      <Route path={"/employees/edit/:id"} element={<EditEmployee />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/leaverequests"} element={<ViewLeave />} />
    </Routes>
  );
}

export default AdminRoutes;
