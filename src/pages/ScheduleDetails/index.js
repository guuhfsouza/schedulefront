import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {MdAddCircleOutline, MdBookmark} from 'react-icons/md';

import Main from '../Main';
import Footer from '../Footer';

import '../../global.css';
import './style.css';

import api from '../../services/api';

function ScheduleDetails() {
    const idUser = localStorage.getItem('idUser');
    const cpfStore = localStorage.getItem('cpfStore');
    const date = localStorage.getItem('days');
    const [scheduleProfile, setScheduleProfile] = useState([]);
    const [services, setServices] = useState([]);


    const [idServ, setIdServ] = useState(0);
    const [client, setClient] = useState("");
    const [hour, setHour] = useState("");

    const history = useHistory();

    useEffect(() => {
        async function getScheduleProfile(){
            const response = await api.get('profile-schedule', { params:{
                idUser: idUser,
                date: date
            }})
            setScheduleProfile(response.data);
            // if(response.data !== [])
            //     validateStatus();
        }

        async function getServices(){
            const response = await api.get('services', {
                headers: {
                    authorization: cpfStore
                }
            })
            setServices(response.data);
        }
//#region
    //    function validateStatus() {
    //     const elementSvg = document.getElementsByName('svg');
    //     console.log('valida status')
    //     console.log(scheduleProfile)
    //     scheduleProfile.map( scheduleProfile => {
    //         return(
    //             ()=> {
    //                 if(scheduleProfile.status === 'aberto'){
    //                     elementSvg[0].setAttribute('color', "green")
    //                     console.log('green')
    //                 }
    //                 else{
    //                     elementSvg[0].setAttribute('color', "#c40505")
    //                     console.log('gred')
    //                 }
    //             }
    //         )
    //     })
    //}
//#endregion
    getServices();
    getScheduleProfile();
    }, [idUser]);


    async function handleSchedule(e){
        e.preventDefault();

        const data = {
            idServ,
            client,
            date,
            hour,
            status: 'aberto',
            cpfStore,
            idUser
        }

        console.log(idServ)

       const response = await api.post('schedules', data);

       alert(response);
       history.push('/schedule-details');

    const elemModal = document.getElementById('Fechar');
    elemModal.click() ;
    }

    return(
        <div className="scheduleDetails-container">
            <Main/>
            <div className="scheduleDetails-container">
                <div className="scheduleDetails-header">
                    <span> Agenda do dia: {date}</span>
                    <a href="#abrirModal">
                        <MdAddCircleOutline size={40}/>
                    </a>
                </div>
                <ul>
                    {scheduleProfile.map( scheduleProfile => {
                        return(
                            <li key={scheduleProfile.idSchedule}>
                                <div className="li-line-sup">
                                    <span>Cliente: Gustavo</span>
                                    <MdBookmark name='svg'/>
                                </div>
                                <span>Serviço: {scheduleProfile.service}</span>
                                <span>Data: {scheduleProfile.date}</span>
                                <span>Hora: {scheduleProfile.hour}</span>
                                <span>Cliente: {scheduleProfile.client}</span>
                                <span>Status: {scheduleProfile.status}</span>
                                <span>Preço: {scheduleProfile.price}</span>
                                <span>Cabel: {scheduleProfile.nameUser}</span>
                            </li>
                        )}
                    )}
                </ul>
            </div>


            <div id="div-Principal" >
                <form id="abrirModal" onSubmit={handleSchedule} className="modal">
                    <a href="#fechar" id="Fechar" title="Fechar" className="fechar">x</a>
                        <input placeholder="Cliente" value={client} onChange={e => setClient(e.target.value)}
                        />
                        <select>
                            {services.map( service => {
                                return(
                                    <option key={service.idService}
                                        value={idServ} 
                                            onChange={e => setIdServ(e.target.value)}
                                    >{service.service}</option>
                                )}
                            )}
                        </select>
                        <input type="time" placeholder="Hora" value={hour}
                        onChange={e => setHour(e.target.value)}/>
                        <button className='modal-button' type="submit" >Agendar</button>
                </form>
            </div>

            <Footer/>
        </div>
    );
}


export default ScheduleDetails;