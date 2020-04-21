import React, {useState, useEffect} from 'react';
import {FaEdit, FaRegWindowClose} from 'react-icons/fa'

import Main from '../Main';
import Footer from '../Footer';

import '../../global.css'
import './style.css'

import apiservice from '../../services/apiservice';
import api from '../../services/apiservice';

function Services(){
    const cpfStore = localStorage.getItem('cpfStore');
    const [services, setServices] = useState([]);

    const [idService, setIdService] = useState(0);
    const [service1, setService1] = useState("");
    const [price, setPrice] = useState(0.00);

    useEffect(() => {
        async function getServices(){
            const response = await apiservice.get(`Services?cpfStore=${cpfStore}`);
            setServices(response.data);
        }
        getServices();
    }, [services])  

    async function handleService(){
        console.log(idService);

        if(idService === 0){
            const data = {
                service1,
                price,
                ative: "S",
                cpfStore: cpfStore
            };

            alert("post")
            const response = await apiservice.post('Services', data);
            console.log(response);
        }
        else{

            const status = services.filter(services => services.idService === idService)[0];
    
            console.log(status)
            const data = {
                idService, 
                service1 : service1,
                price : price,
                ative: status.ative,
                cpfStore: status.cpfStore
            };
            console.log(data)
            alert("put")
            const response = await apiservice.put('services', data);
            console.log(response);
            setServices(services.filter(services => services.idService !== idService, ...response))
        }
    }
    async function handleStatus(id)
    {
        let data =  {};

            const status = services.filter(services => services.idService === id)[0];
            let active = "S";
            if(status.ative.trim() === "S")
                active = "N";
            else
                active = "S";

            data = {
                idService : id, 
                service1 : status.service1,
                price : status.price,
                ative: active,
                cpfStore: status.cpfStore
            };
            const response = await apiservice.put('services', data);
            console.log(response.data);
            setServices(services);
    }

    return(
        <div className="services-container">
           <Main/>
           <div className="services-content">
                <section>
                    <form onSubmit={handleService}>
                        <span> Adicone produtos para sua loja: {cpfStore}</span>
                        <div className="services-data">
                            <input  value={service1} type="text" required={true} onChange={ e => setService1(e.target.value)}
                             placeholder="Serviço"/>
                            <input value={price === 0 ? "" : price} required={true} onChange={ e => setPrice(e.target.value)}
                             placeholder="Preço"/>
                        </div>
                        
                        <button type="submit">Salvar</button>
                    </form>
                </section>
                <section>
                    <div className="service-list">
                    <ul>    
                        {services.map(services => {
                            return(
                                <li key={services.idService}>
                                    <div className="service-list-controls">
                                        <FaEdit color={'#110000'} size={20} type="button" onClick={() => {
                                            setService1(services.service1)
                                            setPrice(services.price)
                                            setIdService(services.idService)
                                        }
                                        }/>
                                        <FaRegWindowClose  color={"#c40505"} size={20} type="button" onClick={() => 
                                                handleStatus(services.idService)
                                            }/>
                                    </div>
                                    <span >Serviço: {services.service1}</span>
                                    <span>Preço: {services.price}</span>
                                    <span>Ativo: {services.ative}</span>
                                </li>
                            )
                        }
                        )}
                    </ul>
                    </div>
                </section>
            </div>
            <Footer/> 
        </div>
    )
}


export default Services;