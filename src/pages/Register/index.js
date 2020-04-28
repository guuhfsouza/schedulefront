import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import Main from '../Main';
import Footer from '../Footer'

import '../../global.css';
import './style.css';

import api from '../../services/api';

function Register() {
    const cpfStore = sessionStorage.getItem('cpfStore');
    let idProfile = sessionStorage.getItem('idProfile');

    const history = useHistory();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    async function handleProfile(e){
        e.preventDefault();

        if(!cpfStore && !idProfile){

            const dataPeople = {
                name, 
                cpf,
                city,
                uf,
                phone,
                email,
            };

            const response = await api.post("profile", dataPeople);

            if(response.status === 200){
                const dataUser = {
                    cpf_People : cpf,  
                    email: email,
                    password: " ",
                    active: "Sim",
                    typeUser: "S",
                    nameUser: name.split(' ')[0]
                };
                
                try{
                    const response = await api.post("users", dataUser);
                    
                    if(response.status === 200){
                        alert(response.data.sucess);                    
                    }
                    else if(response.status === 400){
                        alert(response.data.alert)
                    }
                    else if((response.status === 500)){
                        alert("Falha de conexão com a base de dados. Favor acionar o suporte.");
                    }
        
             
                }
                catch(err){
                    return alert(err);
                }
            }
            history.push('/forgot-password');
        }
        
        else{
            alert("Atenção. O CPF é um campo que não será alterado.");

            //Verificar pq não esta rolando a atualização
            idProfile = parseInt(idProfile);
            const data = {
                idPeople : idProfile,
                name, 
                city,
                uf,
                phone,
                email,
            };
            try{
                  const response =  await api.put("profile", data, {
                    headers: {
                        Authorization: cpfStore
                    }
                });
                
                if(response.status === 200){
                    alert(response.data.sucess);                    
                }
                else if(response.status === 400){
                    alert(response.data.badrequest)
                }
                else if((response.status === 500)){
                    alert("Falha de conexão com a base de dados. Favor acionar o suporte.");
                    console.warn(response.data.error);
                }
            }
            catch (err){
                alert(err);
            }
            history.push('profile')
        }
    }

    useEffect(() => {
        function validateLogin(){
            if(cpfStore && idProfile){       
                async function getProfile(){ 
                    const response = await api.get('profile', {
                        headers: {
                            cpf: cpfStore,
                            email: sessionStorage.getItem('user')
                        }
                    });

                    //carrega as variaveis para popular os inputs
                    setCpf(response.data.cpf);
                    setName(response.data.name);
                    setCity(response.data.city);
                    setUf(response.data.uf);
                    setPhone(response.data.phone);
                    setEmail(response.data.email);
                }
                getProfile();
            }
            else{
                function alterDom(){
                var elementContainer = document.getElementsByClassName('register-container');
                var elementMain = document.getElementsByClassName('main-container');
                var elementFooter = document.getElementsByClassName('footer-container');
                
                elementContainer[0].removeChild(elementMain[0]);
                elementContainer[0].removeChild(elementFooter[0]);
                            
                }
                alterDom();    
            }
        }
        validateLogin();
    }, []) 


    return(
        <div className="register-container">   
            <Main id="main"/>
            <div className="register-content">
                <form onSubmit={handleProfile}>
                    <span>Nome: </span>
                    <input required={true} placeholder="Nome"
                        value={name} onChange={e => setName(e.target.value)}/>
                    <span>E-mail: </span>
                    <input required={true}  type="email" placeholder="E-mail"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <span>CPF: </span>
                    <input required={true} minLength="11" maxLength="11" placeholder="CPF"
                        value={cpf} onChange={e => setCpf(e.target.value)}/>
                    <span>Cel: </span>
                    <input required={true} minLength="10" maxLength="11" placeholder="Celular"
                    value={phone} onChange={e => setPhone(e.target.value)}/>
                    <div className="register-local">
                        <span>Cidade: </span>
                        <span>UF: </span>
                    </div>
                    <div className="register-local">
                        <input required={true} type="text" placeholder="Cidade"
                            value={city} onChange={e => setCity(e.target.value)}/>
                        <input required={true} type="text" maxLength="2" minLength="2" placeholder="UF"
                            value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
            <Footer id="footer"/>
        </div>
    );
}


export default Register;

