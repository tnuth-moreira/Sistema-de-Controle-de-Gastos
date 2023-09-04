import React from "react";
import ReactDOM from "react-dom/client";
import "./Login/styles.css";
import BackgroundImage from "./assets/background.png"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>


    <img src={BackgroundImage} />

    <div className="container-main">

      <div className="adver-text">

        Controle suas <span>finanças</span> , sem planilha chata.

      </div>


      <div className="login-form">

        <h1>Login</h1>
        <form>

        </form>
      </div>


    </div>


  </React.StrictMode>
);
