import BackgroundImage from '../../assets/background.png'
import "../Cadastre-se/styles.css"
import { Link } from 'react-router-dom'







function SignUp({ signupForm, setSignupForm }) {

    function handleChange(e) {

        const value = e.target.value

        setSignupForm({ ...signupForm, [e.target.name]: value })
    }

    return (

        <div >

            <img src={BackgroundImage} />

            <div className='container-main'>

                <div className='signup-container'>

                    <h1>Cadastre-se</h1>

                    <div className='inputs-form'>

                        <form>

                            <span>Nome</span>
                            <input
                                type='text'
                                value={signupForm.name}
                                name='name'
                                onChange={(e) => handleChange(e)}
                            />

                            <span>Email</span>
                            <input
                                type='text'
                                value={signupForm.email}
                                name='email'
                                onChange={(e) => handleChange(e)}
                            />

                            <span>Senha</span>
                            <input
                                type='password'
                                value={signupForm.password}
                                name='password'
                                onChange={(e) => handleChange(e)}
                            />

                            <span>Confirmação de senha</span>
                            <input
                                type='text'
                                value={signupForm.confirmPassword}
                                name='confirmPassword'
                                onChange={(e) => handleChange(e)}
                            />

                        </form>

                        <Link to="/login">
                            <button className="signup-button" type="submit">Cadastrar</button>
                        </Link>

                    </div>

                </div>

            </div>

        </div>


    );

}

export default SignUp