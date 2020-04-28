import React from 'react';
import {Link, useHistory} from 'react-router-dom';
//import {TiThMenu} from 'react-icons/ti'

import '../../global.css';
import './style.css';

import Logo from '../../assets/logo.ico'

function Main() {
    const history = useHistory();

    function logout (){
        localStorage.clear();
        history.push("")
    }

    return(
        <div className="main-container">
            <div className="main-content">
                <img src={Logo} alt="Logo" onClick={() => history.push('/schedule')}/>
                <div className="main-options">
                    <Link to="/schedule" className="a" >
                        Home
                    </Link>
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
                    {/* <TiThMenu id="menu-mobile" color={"#ffffff"} size={30}/> */}

                    <input type="checkbox" id="navicon"/>
                    <div className="nav-toggle">
                    <label htmlFor="navicon" className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    </div>
                    <nav className="sidebar" role="complementary">
                    <Link to="/service" className="a">
                        Serviços
                    </Link>
                    {/* <Link to="" className="a">
                        Usuários
                    </Link> */}
                    <Link to="/profile" className="a">
                        Perfil
                    </Link>
                    <button className="a" onClick={logout}>
                        Sair
                    </button>
                    </nav>


                    
                </div>
            </div>
        </div>
    );
}

export default Main;