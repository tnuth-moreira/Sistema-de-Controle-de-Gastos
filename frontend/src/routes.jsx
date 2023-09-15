import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/App';
import SignUp from './Pages/Cadastre-se/App';
import Home from './Pages/Home/App';
import { useState } from 'react';



function MyRoutes() {

    const [users, setUsers] = useState([])

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
                <Route path='/' element={<Login
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    users={users}
                    setUsers={setUsers}
                />}
                />

                <Route path='/login' element={<Login
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    users={users}
                    setUsers={setUsers}
                />}
                />

            </Route>

            <Route path='/cadastre-se'
                element={<SignUp
                    signupForm={signupForm}
                    setSignupForm={setSignupForm}
                    users={users}
                    setUsers={setUsers}
                />}
            />

            <Route path='/home' element={<Home />} />
        </Routes >
    )


}



export default MyRoutes 