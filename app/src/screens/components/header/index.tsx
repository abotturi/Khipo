import React from 'react'
import './style.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../../../hooks/useContext';

const pages = ['Inspiration', 'Find Work', 'Learn Design', 'Hire Designers'];

function Header() {
  const { user, logout } = useUserContext()
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{
      backgroundColor: '#fff'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: '#777', display: 'block', fontWeight: 600, fontSize: '13px', textTransform: 'none', fontFamily: 'Segoe UI', }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            {
              user ?
				<>
					<Typography
						sx={{
							marginRight: '15px',
							color: '#aaa',
							textDecoration: 'none',
							fontSize: '15px'
						}}
					>
						{user.email}
					</Typography>
					<Button variant="contained" sx={
						{
							px: '10px',
							backgroundColor: '#eb589c',
							textTransform: 'none',
							borderRadius: '8px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '13px',
							boxShadow: 0,
							'&:hover': {
								background: "#ff2f99",
							},
						}}
						onClick={logout}
					>
            Sing Out
					</Button>
				</>
                :
				<>
          <Link to='/login' className='sing-in-header'>Sing In</Link>					
					<Button variant="contained" sx={
						{
							px: '10px',
							backgroundColor: '#eb589c',
							textTransform: 'none',
							borderRadius: '8px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '13px',
							boxShadow: 0,
							'&:hover': {
								background: "#ff2f99",
							},
						}}
            onClick={() => navigate('/register')}
					>
            Sing Up
					</Button>
				</>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header