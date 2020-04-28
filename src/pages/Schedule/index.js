import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';

import Footer from '../Footer';
import Main from '../Main';

import '../../global.css';
import './style.css';

import Logo from '../../assets/logo.ico'


function Schedule() {
    //const user = localStorage.getItem('user')
    const nameUser = localStorage.getItem('nameUser')
    const [days, setDays] = useState([]);
    const history = useHistory();
    
    useEffect(() => {        

        function validateLogin(){
            if(!localStorage.getItem('user')){
                return history.push("/");
            }
            countDays();
        }


        function countDays(){
            let dia = new Date();
            let ano = dia.getFullYear();
            let mes = dia.getMonth() + 1;
            dia = new Date(ano,mes, 0).getDate()
            let dias = [];

            for(let index = 1; index <= dia; index++){
                dias.push(index);
            }
            
            return setDays(dias);
        }
        validateLogin();
    }, [])

    return(
        <div className="schedule-container">
            <Main/>
            <div className="schedule-content">
                <header>
                    <img src={Logo} alt="Logo"/>
                    <div className="header-text">
                        <span>Olá {nameUser}, seja bem vindo!</span>
                        <span>Fique a vontade para agendar seus comprimissos. Aqui você poderá organizar melhor seus afazeres e otimizar seu tempo.</span>
                    </div>
                </header>
                <div className="schedule-dates">
                    <ul>
                        {days.map(days => (
                            <li key={days}>
                            <div className="header-list">
                                <span>
                                    Dia {days}
                                </span>
                            </div>
                            <form> 
                                <strong>Barbeiro: </strong>
                                <p>{localStorage.getItem('nameUser')}</p>
                                <Link onClick={ () =>{
                                    const day = new Date();
                                    localStorage.setItem("days", days + "/" +
                                     (day.getMonth()+1) + "/" + day.getFullYear())
                                }} to="/schedule-details"  className="button-list"><p>Detalhes</p></Link>
                            </form>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Schedule;