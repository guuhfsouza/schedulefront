import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
//import {TiThMenu} from 'react-icons/ti'

import '../../global.css';
import './style.css';

import Logo from '../../assets/logo.ico'

function Main() {
    const history = useHistory();

    useEffect(()=> {
        const main = document.getElementsByClassName('main-options');
        const services = document.getElementsByClassName('a');
        console.log(services);
        console.log(main)

        
        if(sessionStorage.getItem('typeUser') === 'N'){            
            main[0].removeChild(services[3]);
            main[0].removeChild(services[2]); 
            main[0].removeChild(services[1]);
            main[0].removeChild(services[0]);

            //main sandwitch
            main[1].removeChild(services[2]); 
            main[1].removeChild(services[1]);
            main[1].removeChild(services[0]);
        }

    }, [])

    function logout (){
        sessionStorage.clear();
        history.push("")
    }

    return(
        <div className="main-container">
            <div className="main-content">
                <img src={Logo} alt="Logo" onClick={() => history.push('/schedule')}/>
                <div className="main-options">
                
                    {/* <Link to="/schedule" className="a" >
                        Home
                    </Link> */}
                    <Link to="/service" className="a">
                        Serviços
                    </Link>
                    <Link to="/user" className="a">
                        Usuários
                    </Link>
                    <Link to="/profile" className="a">
                        Perfil
                    </Link>
                    <button className="a" onClick={logout}>
                        Sair
                    </button>

                    {/* Menu lateral para mobile */}
                <input type="checkbox" id="navicon"/>
                <div className="nav-toggle">
                    <label htmlFor="navicon" className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    </div>
                    <nav className="sidebar" role="complementary">
                        <div className="main-options">
                            <Link to="/service" className="a">
                                Serviços
                            </Link>
                            <Link to="/user" className="a">
                                Usuários
                            </Link>
                            <Link to="/profile" className="a">
                                Perfil
                            </Link>
                            <button className="a" onClick={logout}>
                                Sair
                            </button>
                        </div>
                    </nav>        
                </div>
            </div>
        </div>
    );
}

export default Main;