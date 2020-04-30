import React, {useState} from 'react';
import {useHistory} from  'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';
import api from '../../services/api';

import './style.css';
import '../../global.css';

function ForgotPassword () {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    async function forgot(e) {
       e.preventDefault();
       try{
            const data = {
                email: user,
                password: pass
            }

            const response = await api.put('authentication', data);

            if(response.status === 200){
                alert(response.data.sucess)
                history.push('/');
            }
            else
                alert(response.data.warning);

            } catch (error){
                alert(error);
       }
    }


    return (
        <div className="forgot-container">
            <section onSubmit={forgot} className="form">
                <h1><FaArrowLeft onClick={() => history.push('/')} size={20} /><p className="p">Esqueci Minha senha</p></h1>
                <form >
                    <input required={true} type='email' placeholder='E-mail'
                    value={user} onChange={e => setUser(e.target.value)}/>
                    <input required={true} type='password' placeholder='Senha'
                    value={pass} onChange={e => setPass(e.target.value)}/>
                    <button type="submit">Resetar minha Senha</button>
                </form>
            </section>
        </div>
    )
};



export default ForgotPassword;