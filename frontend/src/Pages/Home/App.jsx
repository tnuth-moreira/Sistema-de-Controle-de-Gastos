import '../Home/styles.css'
import BackgroundImage from '../../assets/background.png'
import LogoImage from '../../assets/logo.png'





function Home() {



    return (

        <div>

            <img className='background-image' src={BackgroundImage} />

            <div className='home-container'>

                <header className='home-logo-container'>

                    <img className='logo-img-home' src={LogoImage} />
                    <h3>DinDin</h3>

                </header>

                <section className='list-container'>


                </section>

            </div>

        </div>




    )







}

export default Home