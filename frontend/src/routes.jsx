import { Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login/App';
import SignUp from './Pages/Cadastre-se/App';
import { useState } from 'react';



function MyRoutes() {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })


    const [signupForm, setSignupForm] = useState({

        name: '',
        email: '',
        password: '',
        confirmPassword: ''

    })


    return (

        <Routes>

            <Route path='/'>
                <Route path='/' element={<Login loginForm={loginForm} setLoginForm={setLoginForm} />} />
                <Route path='/login' element={<Login loginForm={loginForm} setLoginForm={setLoginForm} />} />
            </Route>

            <Route path='/cadastre-se' element={<SignUp signupForm={signupForm} setSignupForm={setSignupForm} />} />
        </Routes >
    )


}



export default MyRoutes 