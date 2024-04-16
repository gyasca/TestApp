import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import StoreIcon from '@mui/icons-material/Store';
import SupportIcon from '@mui/icons-material/Support';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ArticleIcon from '@mui/icons-material/Article';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Add, AddLocation, Category, CurrencyExchange, DirectionsBike, Explore, HowToReg, Map, NoCrash, Person, PersonAdd, Place, RequestPage } from '@mui/icons-material';


function AdminNavList() {
    const [usersOpen, setUsersOpen] = React.useState(false);
    const [driversOpen, setDriversOpen] = React.useState(false);
    const [bicyclesOpen, setBicyclesOpen] = React.useState(false);
    const [locationsOpen, setLocationsOpen] = React.useState(false);
    const [requestsOpen, setRequestsOpen] = React.useState(false);
    const [shopOpen, setShopOpen] = React.useState(false);
    const [supportOpen, setSupportOpen] = React.useState(false);

    const handleClickUsers = () => {
        setUsersOpen(!usersOpen);
    };

    const handleClickDrivers = () => {
        setDriversOpen(!driversOpen);
    };

    const handleClickBicycles = () => {
        setBicyclesOpen(!bicyclesOpen);
    };

    const handleClickLocations = () => {
        setLocationsOpen(!locationsOpen);
    };

    const handleClickRequests = () => {
        setRequestsOpen(!requestsOpen);
    };

    const handleClickShop = () => {
        setShopOpen(!shopOpen);
    };

    const handleClickSupport = () => {
        setSupportOpen(!supportOpen);
    };

    return (
        <>
            <ListItem key={"Users"} disablePadding>
                <ListItemButton onClick={handleClickUsers}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText primary={"Users"} />
                    {usersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={usersOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewUsers"} disablePadding>
                        <ListItemButton component={Link} to="/admin/users">
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary={"View Users"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"CreateUser"} disablePadding>
                        <ListItemButton component={Link} to="/admin/users/create">
                            <ListItemIcon><PersonAdd /></ListItemIcon>
                            <ListItemText primary={"Create User"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem key={"Drivers"} disablePadding>
                <ListItemButton onClick={handleClickDrivers}>
                    <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                    <ListItemText primary={"Drivers"} />
                    {driversOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={driversOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewDriverApplications"} disablePadding>
                        <ListItemButton component={Link} to="/admin/driver/viewdriverapplications">
                            <ListItemIcon><HowToReg /></ListItemIcon>
                            <ListItemText primary={"View Applications"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"ViewDrivers"} disablePadding>
                        <ListItemButton component={Link} to="/admin/driver/viewdrivers">
                            <ListItemIcon><NoCrash /></ListItemIcon>
                            <ListItemText primary={"View Drivers"} />
                        </ListItemButton>
                    </ListItem>
                    {/* Add more here for more sublist items */}
                </List>
            </Collapse>
            <ListItem key={"Bicycles"} disablePadding>
                <ListItemButton onClick={handleClickBicycles}>
                    <ListItemIcon><PedalBikeIcon /></ListItemIcon>
                    <ListItemText primary={"Bicycles"} />
                    {bicyclesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={bicyclesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewBicycleMap"} disablePadding>
                        <ListItemButton component={Link} to="/admin/bicycle">
                            <ListItemIcon><Map /></ListItemIcon>
                            <ListItemText primary={"View Bicycle Map"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"ViewBicycleList"} disablePadding>
                        <ListItemButton component={Link} to="/admin/bicycle/view">
                            <ListItemIcon><DirectionsBike /></ListItemIcon>
                            <ListItemText primary={"View Bicycle List"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"AddBicycle"} disablePadding>
                        <ListItemButton component={Link} to="/admin/bicycle/add">
                            <ListItemIcon><Add /></ListItemIcon>
                            <ListItemText primary={"Add Bicycle"} />
                        </ListItemButton>
                    </ListItem>
                    {/* Add more here for more sublist items */}
                </List>
            </Collapse>
            <ListItem key={"Locations"} disablePadding>
                <ListItemButton onClick={handleClickLocations}>
                    <ListItemIcon><Explore /></ListItemIcon>
                    <ListItemText primary={"Locations"} />
                    {locationsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={locationsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewLocations"} disablePadding>
                        <ListItemButton component={Link} to="/admin/locations/view">
                            <ListItemIcon><Place /></ListItemIcon>
                            <ListItemText primary={"View Locations"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"AddLocation"} disablePadding>
                        <ListItemButton component={Link} to="/admin/locations/create">
                            <ListItemIcon><AddLocation /></ListItemIcon>
                            <ListItemText primary={"Create Location"} />
                        </ListItemButton>
                    </ListItem>
                    {/* Add more here for more sublist items */}
                </List>
            </Collapse>
            <ListItem key={"Requests"} disablePadding>
                <ListItemButton onClick={handleClickRequests}>
                    <ListItemIcon><RequestQuoteIcon /></ListItemIcon>
                    <ListItemText primary={"Requests"} />
                    {requestsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={requestsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewRequests"} disablePadding>
                        <ListItemButton component={Link} to="/admin/requests">
                            <ListItemIcon><RequestPage /></ListItemIcon>
                            <ListItemText primary={"View Requests"} />
                        </ListItemButton>
                    </ListItem>
                    {/* Add more here for more sublist items */}
                </List>
            </Collapse>
            <ListItem key={"Shop"} disablePadding>
                <ListItemButton onClick={handleClickShop}>
                    <ListItemIcon><StoreIcon /></ListItemIcon>
                    <ListItemText primary={"Shop"} />
                    {shopOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={shopOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewProducts"} disablePadding>
                        <ListItemButton component={Link} to="/admin/products">
                            <ListItemIcon><Category /></ListItemIcon>
                            <ListItemText primary={"View Products"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"CreateProduct"} disablePadding>
                        <ListItemButton component={Link} to="/admin/products/create">
                            <ListItemIcon><Add /></ListItemIcon>
                            <ListItemText primary={"Create Product"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Orders"} disablePadding>
                        <ListItemButton component={Link} to="/admin/orders">
                            <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
                            <ListItemText primary={"View All Orders"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Refunds"} disablePadding>
                        <ListItemButton component={Link} to="/admin/refunds">
                            <ListItemIcon><CurrencyExchange /></ListItemIcon>
                            <ListItemText primary={"View All Refunds"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem key={"Support"} disablePadding>
                <ListItemButton onClick={handleClickSupport}>
                    <ListItemIcon><SupportIcon /></ListItemIcon>
                    <ListItemText primary={"Support"} />
                    {supportOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={supportOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem key={"ViewTickets"} disablePadding>
                        <ListItemButton component={Link} to="/admin/support/ticket">
                            <ListItemIcon><LiveHelpIcon/></ListItemIcon>
                            <ListItemText primary={"View Tickets"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"ViewArticles"} disablePadding>
                        <ListItemButton component={Link} to="/admin/support/article">
                            <ListItemIcon><ArticleIcon/></ListItemIcon>
                            <ListItemText primary={"View Help Articles"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"CreateArticle"} disablePadding>
                        <ListItemButton component={Link} to="/admin/support/article/create">
                            <ListItemIcon><NoteAddIcon/></ListItemIcon>
                            <ListItemText primary={"Create Help Article"} />
                        </ListItemButton>
                    </ListItem>
                    {/* Add more here for more sublist items */}
                </List>
            </Collapse>

        </>
    )
}

export default AdminNavList