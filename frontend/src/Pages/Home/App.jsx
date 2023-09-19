import '../Home/styles.css'
import BackgroundImage from '../../assets/background.png'
import LogoImage from '../../assets/logo.png'
import ProfileImg from '../../assets/Profile.png'
import LogoutImg from '../../assets/Logout.png'
import ModalAddRegister from '../../components/ModalAddRegister/App'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home({ loggedInUser, transfer, setTransfer, listTransfers }) {

    const navigate = useNavigate()

    const [addRegister, setAddRegister] = useState(false)

    function handleLogout() {

        localStorage.setItem('loggedInUser', JSON.stringify(null));
        navigate('/login')
    }


    return (

        <div>

            <img className='background-image' src={BackgroundImage} />

            <div className='home-container'>

                <header className='home-logo-container'>

                    <img className='logo-img-home' src={LogoImage} />
                    <h3>DinDin</h3>

                    <img className='profile-img' src={ProfileImg} />
                    <h2>{loggedInUser.name}</h2>

                    <img className='logout-img' src={LogoutImg} onClick={() => handleLogout()} />
                </header>

                <section className='main-container'>

                    <div className='list-container'>

                        <div className='category-bar'>

                            <ul>
                                <li>Data</li>
                                <li>Dia da Semana</li>
                                <li>Descrição</li>
                                <li>Categoria</li>
                                <li>Valor</li>
                            </ul>


                        </div>

                    </div>

                    <aside>

                        <div className='resume-container'>

                            <h1>Resumo</h1>


                            <span>Entradas:</span>
                            <span>Saídas:</span>

                            <hr />

                            <h2>Saldo:</h2>

                        </div>

                        <button className='add-register' type='button' onClick={() => setAddRegister(true)}>Adicionar Registro</button>

                    </aside>

                </section>

                <ModalAddRegister
                    addRegister={addRegister}
                    loggedInUser={loggedInUser}
                    setAddRegister={setAddRegister}
                    listTransfers={listTransfers}
                    transfer={transfer}
                    setTransfer={setTransfer}
                />

            </div >

        </div >

    )

}

export default Home