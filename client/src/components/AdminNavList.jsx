import React from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import StoreIcon from "@mui/icons-material/Store";
import SupportIcon from "@mui/icons-material/Support";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Home from "@mui/icons-material/Home";
import {
  Add,
  AddLocation,
  Category,
  CurrencyExchange,
  DirectionsBike,
  Explore,
  HowToReg,
  Map,
  NoCrash,
  Person,
  PersonAdd,
  Place,
  RequestPage,
} from "@mui/icons-material";

function AdminNavList() {
  const [employeesOpen, setEmployeesOpen] = React.useState(false);

  const handleClickEmployees = () => {
    setEmployeesOpen(!employeesOpen);
  };

  return (
    <>
      <ListItem key={"Home"} disablePadding>
        <ListItemButton component={Link} to="/admin/panel">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Admin Homepage"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={"Employees"} disablePadding>
        <ListItemButton onClick={handleClickEmployees}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={"Employees"} />
          {employeesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={employeesOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem key={"ViewUsers"} disablePadding>
            <ListItemButton component={Link} to="/admin/employees">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"View Employees"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"RegisterEmployee"} disablePadding>
            <ListItemButton component={Link} to="/admin/register">
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary={"Register Employee"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default AdminNavList;
