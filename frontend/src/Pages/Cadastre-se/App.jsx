import { useEffect, useState } from 'react'
import BackgroundImage from '../../assets/background.png'
import LogoImage from '../../assets/logo.png'
import "./styles.css"
import { Link, useNavigate } from 'react-router-dom'



function SignUp({ signupForm, setSignupForm, users }) {

    const navigate = useNavigate()

    const [error, setError] = useState('')

    function handleChangeForm(e) {

        const value = e.target.value

        setSignupForm({ ...signupForm, [e.target.name]: value })
    }

    function handleSubmitForm(event) {

        event.preventDefault();

        if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
            setError('Preencha todos os campos')
            return
        }

        if (signupForm.password.length < 6) {
            setError('A senha deve ter no minimo 6 dígitos')
            return
        }

        if (signupForm.confirmPassword !== signupForm.password) {
            setError('A senha e a confirmação de senha devem ser iguais')
            return
        }

        const userVerification = users.some((user) => user.name === signupForm.name || user.email === signupForm.email)

        if (userVerification) {
            setError('Usuario já cadastrado troque o nome e email')
            return
        }

        users.push(signupForm)

        localStorage.setItem('users', JSON.stringify(users));

        setSignupForm({ name: '', email: '', password: '', confirmPassword: '' })

        setError('')

        navigate('/login')
    }

    return (

        <div >

            <img className='background-img' src={BackgroundImage} />

            <div className='container-main'>

                <div className='signup-logo-container'>

                    <img className='logo-img' src={LogoImage} />
                    <h3>DinDin</h3>

                </div>

                <div className='signup-container'>

                    <h1>Cadastre-se</h1>

                    <div className='signup-form-container'>

                        <form onSubmit={handleSubmitForm}>

                            <span>Nome</span>
                            <input
                                type='text'
                                value={signupForm.name}
                                name='name'
                                onChange={(e) => handleChangeForm(e)}
                            />

                            <span>Email</span>
                            <input
                                type='text'
                                value={signupForm.email}
                                name='email'
                                onChange={(e) => handleChangeForm(e)}
                            />

                            <span>Senha</span>
                            <input
                                type='password'
                                value={signupForm.password}
                                name='password'
                                onChange={(e) => handleChangeForm(e)}
                            />

                            <span>Confirmação de senha</span>
                            <input
                                type='password'
                                value={signupForm.confirmPassword}
                                name='confirmPassword'
                                onChange={(e) => handleChangeForm(e)}
                            />

                            <button className="signup-button" type="submit">Cadastrar</button>

                        </form>

                        <span className='signup-error'>{error}</span>

                        <Link to="/login">
                            <h3 className='login-link'>Já tem cadastro? Clique aqui!</h3>
                        </Link>
                    </div>

                </div>

            </div>

        </div>


    );

}

export default SignUp