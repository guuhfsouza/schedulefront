import React, {useState} from 'react';
import {useHistory, Link} from  'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';

import api from '../../services/api';

import './style.css';
import '../../global.css';

function Login () {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    async function login(e) {
       e.preventDefault();
       try{
            const response = await api.get('authentication', {headers : {
                    email: user,
                    password: pass
                }
            });

            sessionStorage.setItem('typeUser', response.data.typeUser);
            sessionStorage.setItem('user', response.data.email);
            sessionStorage.setItem('cpfStore', response.data.cpf_People);
            sessionStorage.setItem('nameUser', response.data.nameUser);
            sessionStorage.setItem('idUser', response.data.idUser);

            if(response.data.active === "Sim")
                history.push('schedule');
            else
                alert("Usuário inativo. Acione o proprietário para desbloqueio.")

        } catch (error){
            alert(error);
       }
    }


    return (
        <div className="login-container">
            <section onSubmit={login} className="form">
                <h1 className="h1">Faça Login</h1>
                <form>
                    <input className="input" required={true} type='email' placeholder='E-mail'
                    value={user} onChange={e => setUser(e.target.value)}/>
                    <input className="input" required={true} type='password' placeholder='Senha'
                    value={pass} onChange={e => setPass(e.target.value)}/>
                    <button type="submit">Acessar</button>
                    <div className="link-container">
                        <Link to="forgot-password">
                           <FaArrowRight/> <p className="p">Recuperar Senha</p></Link>
                        <Link to='register'>
                        <FaArrowRight/> <p className="p">Primeiro Acesso</p></Link> 
                    </div>
                </form>
            </section>
        </div>
    )
};



export default Login;