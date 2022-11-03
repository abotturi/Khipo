import React from 'react'
import './style.css';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Box, Drawer, Button, Typography } from '@mui/material';
import { useUserContext } from '../../hooks/useContext';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';

const LoggedArea = () => {
    const { user } = useUserContext()

    return(
        <div className='background-screen' style={{display: 'flex', justifyContent: 'center'}}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 220,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 220,
                        boxSizing: 'border-box',
                        border: 0,
                        zIndex: 5,
                        backgroundColor: '#dee5ee'
                    },
                }}
            >
                <Box mt={9} px={2} >
                    {
                        Array.from(Array(5)).map((_, idx) => {
                            return(
                                <Button
                                    key={idx}
                                    variant="contained"
                                    startIcon={<GridViewOutlinedIcon />}
                                    sx={{
                                        mt: 2,
                                        py: 1,
                                        textTransform: 'none',
                                        justifyContent: 'flex-start',
                                        boxShadow: 0,
                                        width: '100%',
                                        backgroundColor: '#edf1f5',
                                        color: "#333",
                                        fontWeight: 700,
                                        fontSize: 16,
                                        fontFamily: 'Segoe UI',
                                        borderRadius: 2,
                                        ':hover': {
                                            background: '#D5D8DC',
                                            color: "#333",
                                        }
                                    }}
                                >
                                    Link 1
                                </Button>
                            )
                        })
                    }                    
                </Box>
            </Drawer>
            <Box component="main" mt={12} px={5} sx={{width: '100%'}}>
                <Typography variant='h6'>Welcome, <span style={{fontWeight: 'bold'}}>{user.first_name} {user.last_name}!</span></Typography>
                <Box
                    mt={1}
                    p={2}
                    sx={{
                        maxWidth: '900px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div style={{width: '60%'}}>
                        <Typography variant='h5' sx={{fontWeight: 'bold', textAlign: 'center'}}>This is the headline</Typography>
                        <Typography mt={1} sx={{textAlign: 'center', fontSize: 16, color: '#555', fontWeight: 600, fontFamily: 'Segoe UI'}}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </Typography>
                    </div>
                    <Grid
                        mt={1}
                        container
                        spacing={2}
                        columns={16}
                        sx={{width: '90%'}}
                    >
                        {Array.from(Array(4)).map((_, idx) => (
                            <Grid item xs={8} key={idx}>
                                <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                                    <CheckIcon sx={{ color: 'green', fontSize: 16, mr: 1, mt: '4px'}} />
                                    <div>
                                        <p className='title-card'>Lorem ipsum dolor sit amet</p>
                                        <p className='title-card' style={{fontWeight: 'normal'}}>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.
                                        </p>
                                    </div>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

export default LoggedArea