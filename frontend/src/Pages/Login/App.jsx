
import "./styles.css";
import BackgroundImage from "../../assets/background.png"
import LogoImage from "../../assets/logo.png"
import { useNavigate, Link } from 'react-router-dom'
import { useState } from "react";



function Login({ loginForm, setLoginForm, users }) {

  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleChange(e) {

    const value = e.target.value

    setLoginForm({ ...loginForm, [e.target.name]: value })

  }

  function handleSubmitForm(event) {

    event.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      setError('Preencha todos os campos')
      return
    }

    const userLoginValidation = users.some((user) => user.email === loginForm.email && user.password === loginForm.password)

    if (!userLoginValidation) {
      setError('Email ou senha inválidos')
      return
    }

    const userLogged = users.find((user) => user.email === loginForm.email && user.password === loginForm.password)

    localStorage.setItem('loggedInUser', JSON.stringify(userLogged));

    setLoginForm({ email: '', password: '' })

    navigate('/home')
  }


  return (

    <div>

      <img className="background-img" src={BackgroundImage} />

      <div className="container-main">


        <div className='login-logo-container'>

          <img className='logo-img' src={LogoImage} />
          <h3>DinDin</h3>

        </div>

        <div className="container-text">

          <div className="adver-text">

            <h1>Controle suas <span>finanças</span> , sem planilha chata.</h1>

          </div>

          <div className="desc-text">

            <h1>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h1>

          </div>
          <Link to="/cadastre-se">
            <button className="signup-form" type="button">Cadastre-se</button>
          </Link>

        </div>

        <div className="login-form">

          <h1>Login</h1>

          <div className="inputs-forms">

            <form onSubmit={handleSubmitForm}>

              <span>Email</span>
              <input
                type="text"
                value={loginForm.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />

              <span>Password</span>
              <input
                type="password"
                value={loginForm.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />

              <button className="signin-button" type="submit">Entrar</button>

            </form>

            <span className="login-error">{error}</span>

          </div>

        </div>


      </div>

    </div >
  );
};

export default Login;
