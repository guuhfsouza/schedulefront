import React from 'react';
import {Link, useHistory} from 'react-router-dom';

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
                    {/* <Link to="" className="a">
                        Usuários
                    </Link> */}
                    <Link to="/profile" className="a">
                        Perfil
                    </Link>
                    <button className="a" onClick={logout}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Main;