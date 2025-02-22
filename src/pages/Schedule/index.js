import React, {useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {FaSearch, FaArrowLeft, FaArrowRight} from 'react-icons/fa';

import Footer from '../Footer';
import Main from '../Main';

import '../../global.css';
import './style.css';

import Logo from '../../assets/logo.ico'


function Schedule() {
    //const user = sessionStorage.getItem('user')
    const nameUser = sessionStorage.getItem('nameUser')
    const [days, setDays] = useState([]);
    const history = useHistory();
    const [monthAdd, setMonthAdd] = useState(1)
    const [yearAdd, setYearAdd] = useState(0);    
    useEffect(() => {        
        function validateLogin(){
            if(!sessionStorage.getItem('user')){
                return history.push("/");
            }
            countDays();
        }
        validateLogin();
    }, [monthAdd])

    function countDays(){
            
        //faz a contagem de dias de um mês
        
        let dia = new Date();
        let ano = dia.getFullYear() + yearAdd;
        let mes = dia.getMonth() + parseInt(monthAdd);
        
        //Valida se o mes selecionado é o limite do ano.
        // Caso seja mes 1 ele volta para mes 12 e ano - 1. 
        //Caso seja mes 12 ele volta para mes 1 e ano + 1;
        if(mes > 12){
            setMonthAdd(monthAdd - 12);          
            setYearAdd(yearAdd + 1);
        }        
        else if(mes < 1){
            setMonthAdd(monthAdd + 12);          
            setYearAdd( yearAdd - 1)
        }

        dia = new Date(ano, mes, 0).getDate()
        let dias = [];
        
        for(let index = 1; index <= dia; index++){
            dias.push(index);
        }
        return setDays(dias);
    }

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
                    <nav>
                        <FaArrowLeft className="left" size={25} color={'#ffffff'}
                        onClick={() =>{ 
                            setMonthAdd(parseInt(monthAdd) - 1)
                        }}/>
                        <p>Mês {(new Date().getMonth() + monthAdd).toString()}</p>
                        <FaArrowRight className="rigth" size={25} color={'#ffffff'}
                        onClick={() => {
                            setMonthAdd(parseInt(monthAdd) + 1)
                        }} />
                    </nav>
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
                                <p>{sessionStorage.getItem('nameUser')}</p>
                                <Link onClick={ () =>{
                                    const day = new Date();
                                    sessionStorage.setItem("days", days + "/" +
                                     ((new Date().getMonth() + monthAdd).toString())+
                                      "/" + (day.getFullYear() + yearAdd).toString())
                                }} to="/schedule-details"  className="button-list">
                                    <FaSearch size={16}/>
                                    <p>Horários</p>
                                    </Link>
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