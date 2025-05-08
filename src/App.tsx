import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const Navigation: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const navItems = [
    { label: 'STUDENTS', href: '/' },
    { label: 'ADD STUDENT', href: '/add' },
    { label: 'LOGOUT', onClick: logout }
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 1,
            color: '#fff'
          }}
        >
          Student Dashboard
        </Typography>
        {currentUser && isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box sx={{ width: 200 }} role="presentation" onClick={handleDrawerToggle}>
                <List>
                  {navItems.map((item) =>
                    item.href ? (
                      <ListItem button component="a" href={item.href} key={item.label}>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ) : (
                      <ListItem button onClick={item.onClick} key={item.label}>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : currentUser ? (
          <>
            <Button color="inherit" href="/" sx={{ mx: 1 }}>STUDENTS</Button>
            <Button color="inherit" href="/add" sx={{ mx: 1 }}>ADD STUDENT</Button>
            <Button color="inherit" onClick={logout} sx={{ mx: 1 }}>LOGOUT</Button>
          </>
        ) : (
          <Button color="inherit" href="/login" sx={{ mx: 1 }}>LOGIN</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // blue
    },
    secondary: {
      main: '#ffb300', // amber
    },
    error: {
      main: '#e53935', // red
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Box sx={{ flexGrow: 1 }}>
            <Navigation />
            <Container>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <StudentList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <AddStudent />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </Box>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
