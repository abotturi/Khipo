import { expect } from "chai";
import axios from './axios'

const pr = (t: any) => {
    console.log(t)
}

describe('Routes Test', () => {    
    let userData: any

    it('Create User Success', async () => {        
        const resCreateUser = await axios.post('/user', {
            first_name: 'Seadar',
            email: 'claud8859@uorak.com',
            password: '123456789'
        })
        expect(resCreateUser.status).to.equal(201)
    })

    it('Create User Conflict', async () => {        
        const resCreateUser = await axios.post('/user', {
            first_name: 'Seadar',
            email: 'claud8859@uorak.com',
            password: '123456789'
        }).catch(e => e.response)
        
        expect(resCreateUser.status).to.equal(409)
    })

    it('Login User', async () => {
        const resAuthLogin = await axios.post('/auth/login', {
            email: 'claud8859@uorak.com',
            password: '123456789'
        })

        userData = resAuthLogin.data

        expect(resAuthLogin.status).to.equal(201)
    })

    it('Delete User', async () => {
        const resAuthLogin = await axios.delete('/user', {
            headers:{
                Authorization: `Bearer ${userData.access_token}`
            }
        })

        expect(resAuthLogin.status).to.equal(200)
    })

})