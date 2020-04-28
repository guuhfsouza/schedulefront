import React, {useState, useEffect} from 'react';
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


    const [idServ, setIdServ] = useState(1);
    const [client, setClient] = useState("");
    const [hour, setHour] = useState("");

    const [updateServices, setUpdateServices] = useState(false);

    useEffect(() => {
        async function getScheduleProfile(){
            const response = await api.get('profile-schedule', { params:{
                idUser: idUser,
                date: date
            }})
            setScheduleProfile(response.data);
        }

        async function getServices(){
            //const response = await apiservices.get(`Services/By-Service?cpfStore=${cpfStore}&service=${'""'}&status=S`);
            const response = await api.get('/services-active', {
                headers: {
                    authorization: cpfStore
                }
            })
            setServices(response.data);
        }
    getServices();
    getScheduleProfile();
    
    }, [updateServices]);


    async function handleSchedule(e){
        e.preventDefault();

        const data = {
            idService : idServ,
            client,
            date,
            hour,
            status: 'aberto',
            cpfStore,
            idUser
        }

        const response = await api.post('schedules', data);
        setUpdateServices(updateServices === false ? true : false);
        alert(response.data.sucess || response.data.error || response.data.warning) 
    
       const elemModal = document.getElementById('Fechar');
       elemModal.click();
       setClient("");
       setHour("");
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
                    {scheduleProfile.map(scheduleProfile => {
                        return(
                            <li key={scheduleProfile.idSchedule}>
                                <div className="li-line-sup">
                                    <span>Barbeiro: {scheduleProfile.nameUser}</span>
                                    <MdBookmark name='svg'/>
                                </div>
                                <span>Serviço: {scheduleProfile.service}</span>
                                <span>Data: {scheduleProfile.date}</span>
                                <span>Hora: {scheduleProfile.hour}</span>
                                <span>Cliente: {scheduleProfile.client}</span>
                                <span>Status: {scheduleProfile.status}</span>
                                <span>Preço: {Intl.NumberFormat('pt-BR', 
                                        {style: 'currency', currency: 'BRL'}).format(scheduleProfile.price)}</span>
                                <span>Cabel: {scheduleProfile.nameUser}</span>
                            </li>
                        )}
                    )}
                </ul>
            </div>


            <div id="div-Principal" >
                <form id="abrirModal" onSubmit={handleSchedule} className="modal">
                    <a href="#fechar" id="Fechar" title="Fechar" className="fechar">x</a>
                        <input required={true} placeholder="Cliente" value={client} onChange={e => setClient(e.target.value)}/>

                        <select value={services.idService} onChange={e => setIdServ(e.target.value)}>
                            {services.map(service => {
                                return(
                                    <option key={service.idService} 
                                    value={service.idService}>
                                        {service.service}</option>
                                )}
                            )}
                        </select>

                        <input required={true} type="time" placeholder="Hora" value={hour}
                        onChange={e => setHour(e.target.value)}/>
                        <button className='modal-button' type="submit" >Agendar</button>
                </form>
            </div>

            <Footer/>
        </div>
    );
}


export default ScheduleDetails;