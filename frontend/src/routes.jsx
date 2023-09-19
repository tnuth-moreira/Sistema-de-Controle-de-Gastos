import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/App';
import SignUp from './Pages/Cadastre-se/App';
import Home from './Pages/Home/App';
import { useState } from 'react';



function MyRoutes() {

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let listTransfers = JSON.parse(localStorage.getItem('transfers'));

    let copyList = [listTransfers]

    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

    const [transfer, setTransfer] = useState({
        type: '',
        amount: 0,
        category: '',
        data: '',
        description: ''
    })

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const [signupForm, setSignupForm] = useState({

        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        copyList,
        resume: {
            entry: '',
            output: '',
            total: ''
        }

    })

    return (

        <Routes>

            <Route path='/'>
                <Route path='/' element={<Login
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    users={users}

                />}
                />

                <Route path='/login' element={<Login
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    users={users}
                />}
                />

            </Route>

            <Route path='/cadastre-se'
                element={<SignUp
                    signupForm={signupForm}
                    setSignupForm={setSignupForm}
                    users={users}
                />}
            />

            <Route path='/home' element={<Home

                transfer={transfer}
                setTransfer={setTransfer}
                loggedInUser={loggedInUser}
                signupForm={signupForm}
                setSignupForm={setSignupForm}
                listTransfers={listTransfers}
            />}
            />
        </Routes >
    )


}



export default MyRoutes 