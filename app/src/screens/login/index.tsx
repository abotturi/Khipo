import React, { useState } from 'react'
import './style.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useUserContext } from '../../hooks/useContext';
import axios from '../../axios/axios'

const Login = () => {
    const {login} = useUserContext()
    const [checkRemeberMe, setCheckRemeberMe] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState('')
    
    // USER DATA INPUT
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      setLoader(true)
      setErrorMsg('')
      
      if(!email || !password){
        setLoader(false)
        setErrorMsg('Please enter Email and Password')
        return
      }

      await axios.post('/auth/login', {
        email,
        password
      })
      .then(r => {
        login(r.data, checkRemeberMe)
      })
      .catch(e => {
        if(e.message == 'Network Error'){
          setErrorMsg('Error connecting to server')
          return
        }
        
        setErrorMsg('Invalid Email or Password')
      })

      setLoader(false)
    }

    return(        
      <div className='background-screen background-screen-center' >
        <h1 style={{fontWeight: 600}}>Sign In</h1>
          
          <Box component="form" className='form-login' onSubmit={handleSubmit}>

            <Box  display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={2} width={'100%'} >
              <Box className='component-input-login'>
                <p className='name-input-login'>Email address</p>
                <input  className='input-login' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
              </Box>

              <Box className='component-input-login'>
                <p className='name-input-login'>Password</p>
                <input  className='input-login' type='password' value={password} onChange={e => setPassword(e.target.value)} required />
              </Box>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' flexDirection='row' mt={'10px'} width='80%' >
              <FormControlLabel control={
                  <Checkbox
                    checked={checkRemeberMe}
                    size="small"
                    onChange={() => setCheckRemeberMe(!checkRemeberMe)}
                    sx={{
                      mr: '5px',
                      width: 0,
                      height: 0,
                      color: "#dee5ee",
                      "&$checked": {
                        color: "#dee5ee"
                      },
                      ":hover": {
                        backgroundColor: 'rgba(0,0,0,0)'
                      }
                    }}
                  />
                }
                sx={{ml: '1px'}}
                label={
                  <Typography color='#666' fontSize={13} fontWeight={600} fontFamily={'Segoe UI'} >Remember me</Typography>
                }
              />
              <Link to='/' className='forgot-password'>Forgot password?</Link>
            </Box>
            
            <Box width='100%' my={4} display='flex' justifyContent='center' alignItems='center' flexDirection='column' >
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
                Sing in
              </LoadingButton>
              {
                errorMsg ?                  
                  <Typography mt={2} color='red' fontSize={13} fontWeight={600} fontFamily={'Segoe UI'} >{errorMsg}</Typography>
                  : null
              }
            </Box>
          </Box>

      </div>
    )
}

export default Login