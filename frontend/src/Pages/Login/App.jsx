
import "../Login/styles.css";
import BackgroundImage from "../../assets/background.png"
import { Link } from 'react-router-dom'





function Login({ loginForm, setLoginForm }) {

  function handleChange(e) {

    const value = e.target.value

    setLoginForm({ ...loginForm, [e.target.name]: value })


  }


  return (

    <div>

      <img src={BackgroundImage} />

      <div className="container-main">

        <div className="container-text">

          <div className="adver-text">

            <h1>Controle suas <span>finanças</span> , sem planilha chata.</h1>

          </div>

          <div className="desc-text">

            <h1>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h1>

          </div>
          <Link to="/cadastre-se">
            <button className="signup-button" type="button">Cadastre-se</button>
          </Link>
        </div>

        <div className="login-form">

          <h1>Login</h1>

          <div className="inputs-forms">

            <form>

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

            </form>

            <Link to="/home">
              <button className="signin-button" type="button">Entrar</button>
            </Link>

          </div>

        </div>


      </div>

    </div >
  );
};

export default Login;
