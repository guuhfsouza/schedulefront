import React, {useState} from 'react';
import {useHistory, Link} from  'react-router-dom';

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
            const response = await api.get('users', {headers : {
                    email: user,
                    password: pass
                }
            });

            localStorage.setItem('typeUser', response.data.typeUser);
            localStorage.setItem('user', response.data.email);
            localStorage.setItem('cpfStore', response.data.cpf_People);
            localStorage.setItem('nameUser', response.data.nameUser);
            localStorage.setItem('idUser', response.data.idUser);

            history.push('schedule');

        } catch (error){
            alert(error);
       }
    }


    return (
        <div className="login-container">
            <section onSubmit={login} className="form">
                <h1>Faça Login</h1>
                <form >
                    <input type='email' placeholder='E-mail'
                    value={user} onChange={e => setUser(e.target.value)}/>
                    <input type='password' placeholder='Senha'
                    value={pass} onChange={e => setPass(e.target.value)}/>
                    <button type="submit">Acessar</button>
                    <div className="link-container">
                        <a href="/">Recuperar Senha</a>
                        <Link to='register'>Cadastrar</Link> 
                    </div>
                </form>
            </section>
        </div>
    )
};



export default Login;