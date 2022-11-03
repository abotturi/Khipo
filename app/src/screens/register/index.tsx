import React, { useState } from 'react'
import './style.css'
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useUserContext } from '../../hooks/useContext';
import axios from '../../axios/axios';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Register = () => {
    const {login} = useUserContext()
    const [loader, setLoader] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    
    // USER DATA INPUT
      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      setLoader(true)
      setErrorMsg('')

      if(!firstName.trim() || !email || !password){
        setLoader(false)
        setErrorMsg('Please enter all mandatory fields')
        return
      }

      if(firstName.trim().split(' ').length > 0){
        setLoader(false)
        setErrorMsg('Please add only one name in the name field')
        return
      }

      if(password.length < 8){
        setLoader(false)
        setErrorMsg('Please enter a password with at least 8 characters')
        return
      }

      await axios.post('/user', {
        first_name: firstName.trim(),
        last_name: lastName.trim() ? lastName.trim() : null,
        email,
        password
      })
      .then(r => {
        login(r.data)
      })
      .catch(e => {        
        if(e.message == 'Network Error'){
          setErrorMsg('Error connecting to server')
          return
        }

        if(e.response){
          switch(e.response.status){
            case 409:
              setErrorMsg('Email already in use')
            break;
            case 400:
              setErrorMsg('Invalid email format')
            break;
          }
        }
      })

      setLoader(false)
    }

    return(
        <div className='background-screen background-screen-center' >        
          <h1 style={{fontWeight: 600}}>Sign Up</h1>
          
          <Box component="form" className='form-register' onSubmit={handleSubmit}>
            <Box  display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={2} width={'100%'} >
                
                <Box display='flex' justifyContent='space-between' alignItems='center' flexDirection='row' width='80%' >
                    <Box className='component-input-register' sx={{width: '48%'}}>
                        <p className='name-input-register'>First Name <span style={{color: '#e23f3f', fontWeight: 'bold'}}>*</span></p>
                        <input className='input-register' type='text' value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </Box>
                    <Box className='component-input-register' sx={{width: '48%'}}>
                        <p className='name-input-register'>Last Name</p>
                        <input  className='input-register' type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
                    </Box>
                </Box>

                <Box className='component-input-register'>
                    <p className='name-input-register'>Email address <span style={{color: '#e23f3f', fontWeight: 'bold'}}>*</span></p>
                    <input  className='input-register' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                </Box>

                <Box className='component-input-register'>
                    <Box display='flex' flexDirection='row' width={'100%'} justifyContent='space-between' >
                      <p className='name-input-register'>Password <span style={{color: '#e23f3f', fontWeight: 'bold'}}>*</span></p>
                      <IconButton onClick={() => setShowPassword(!showPassword)} sx={{top: '38px', ':hover': {backgroundColor: 'rgba(0,0,0,0)'}}} >
                        {
                          showPassword ?
                            <VisibilityOffIcon fontSize="small" />
                            :
                            <VisibilityIcon fontSize="small" />
                        }
                      </IconButton>
                    </Box>
                    <input
                      className='input-register'
                      type={showPassword ? 'text' : 'password'}
                      style={{width: 'calc(99% - 42px', paddingRight: '35px'}}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                </Box>
                
            </Box>
            <Box width='100%' mt={3} display='flex' justifyContent='center' alignItems='center' flexDirection='column' >
              <LoadingButton
                type='submit'
                variant="contained"
                disabled={loader}
                loading={loader}
                sx={{
                  textTransform: 'none',
                  width: '80%',                
                  backgroundColor: '#3b8edd',
                  boxShadow: 0,
                  ':hover': {
                    backgroundColor: '#007FFF',
                  }
                }}
              >
                Sing up
              </LoadingButton>
              {
                errorMsg ?                  
                  <Typography mt={2} color='red' fontSize={13} fontWeight={600} fontFamily={'Segoe UI'} >{errorMsg}</Typography>
                  : null
              }
            </Box>
            <Typography my={2} fontSize={12} fontWeight={600} fontFamily={'Segoe UI'} >Already a user? <Link to='/login' className='link-login'>Login</Link></Typography>
          </Box>
        </div>
    )
}

export default Register