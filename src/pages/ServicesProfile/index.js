import React, {useState, useEffect} from 'react';
import {FaEdit, FaRegWindowClose, FaArrowLeft} from 'react-icons/fa'
import {useHistory} from 'react-router-dom';

import Main from '../Main';
import Footer from '../Footer';

import '../../global.css'
import './style.css'

//import apiservice from '../../services/apiservice';
import api from '../../services/api';

function Services(){
    const cpfStore = sessionStorage.getItem('cpfStore');
    const [services, setServices] = useState([]);

    const [idService, setIdService] = useState(0);
    const [service, setService] = useState("");
    const [price, setPrice] = useState(0.00);

    const [update, setUpdate] = useState(true);

    const history = useHistory();

    useEffect(() => {
        async function getServices(){
            //const response = await apiservice.get(`Services?cpfStore=${cpfStore}`);
            const response = await api.get('services', {
                headers:{
                    authorization: cpfStore
                }
            });
            setServices(response.data);
        }
        getServices();
    }, [update])  

    async function handleService(){

        if(idService === 0){
            const data = {
                service,
                price,
                ative: "S",
                cpfStore: cpfStore
            };
            console.log(data);
            const response = await api.post('services', data);
            if(response.status=== 200)
                alert(response.data.sucess);
            else
                alert(response.data.error)
        }
        else{

            const status = services.filter(services => services.idService === idService)[0];
    
            const data = {
                idService, 
                service : service,
                price :  price.toString().match(',')? price.replace(',','.') : price,
                ative: status.ative,
                cpfStore: status.cpfStore
            };
            const response = await api.put('services', data, {
                headers:{
                    authorization: cpfStore
                }
            });
            setServices(services.filter(services => services.idService !== idService, ...response))
            
        }
    }
    async function handleStatus(id)
    {
        const status = services.filter(services => services.idService === id)[0];
        let active = "S";
        if(status.ative.trim() === "S")
            active = "N";
        else
            active = "S";

        const data = {
                idService : id, 
                service : status.service,
                price : status.price,
                ative: active,
                cpfStore: status.cpfStore
        };
        const response = await api.put('services', data, {
            headers: {
                authorization: cpfStore
            }
        });
        setUpdate(update === false ? true : false)
    }

    return(
        <div className="services-container">
           <Main/>
           <div className="services-content">
                <section>
                    <form onSubmit={handleService}>
                        <FaArrowLeft onClick={() => history.push('/schedule')} size={20}/>
                        <span> Adicone produtos para sua loja: {cpfStore}</span>
                        <div className="services-data">
                            <input  value={service} type="text" required={true} onChange={ e => setService(e.target.value)}
                             placeholder="Serviço"/>
                            <input value={price === 0 ? "" : price} required={true} type="number" onChange={ e => setPrice(e.target.value)}
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
                                            setService(services.service)
                                            setPrice(services.price)
                                            setIdService(services.idService)
                                        }
                                        }/>
                                        <FaRegWindowClose  color={"#c40505"} size={20} type="button" onClick={() => 
                                                handleStatus(services.idService)
                                            }/>
                                    </div>
                                    <span >Serviço: {services.service}</span>
                                    <span>Preço: {Intl.NumberFormat('pt-BR', 
                                        {style: 'currency', currency: 'BRL'}).format(services.price)}</span>
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