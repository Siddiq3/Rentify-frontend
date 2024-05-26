import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link,useLocation ,useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline ,Box} from '@mui/material';
import Register from './components/Register';
import Login from './components/Login';
import PropertyList from "./components/PropertyList";
import PropertyListByuer from "./components/Buyerlist";
import AddProperty from "./components/AddProperty";
import HomeIcon from '@mui/icons-material/Home';

import './App.css'; 

const Home = () => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();  
  const handleSellProperty = () => {
    navigate('/register');
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Wellcome to  Rentify
      </Typography>
    
      <Box display="flex" justifyContent="flex-end" my={2}>
        <Button variant="contained" color="primary" onClick={handleSellProperty}>
          Want to Sell Property?
        </Button>
      </Box>
       
      <PropertyListByuer />
    </Container>
  );
};


const Header = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('userType');
console.log(userRole)
  const handleLogout = () => {
    // Clear token and user role from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
   
    // Redirect to home after logout
    window.location.href = '/';
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Rentify</Link>
        </Typography>
        

        {isAuthenticated ? (
          <>
            {userRole === 'seller' && (
              <Button color="inherit" component={Link} to="/sellerlist">Seller Dashboard</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            {location.pathname !== '/register' && (
              <Button color="inherit" component={Link} to="/register">Register</Button>
            )}
            {location.pathname !== '/login' && (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // State for token

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container sx={{ mt: 4 }}>
        <Outlet setToken={setToken} /> {/* Pass setToken function to Outlet */}
      </Container>
    </React.Fragment>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login  /> },
      { path: "seller", element: <AddProperty /> },
      { path: "sellerlist", element: <PropertyList /> },
      { path: "buyer", element: <PropertyListByuer /> },
    ],
  },
]);

const Root = () => (
  <RouterProvider router={router} />
);

export default Root;
