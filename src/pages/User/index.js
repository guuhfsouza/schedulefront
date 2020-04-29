import React, {useEffect, useState} from 'react';
import  {FaCheckCircle, FaArrowLeft} from 'react-icons/fa'
import { useHistory } from 'react-router-dom';

import Main from '../Main';
import Footer from '../Footer';

import '../../global.css';
import './style.css';

import api from '../../services/api';

function Users() {
    const cpfStore = sessionStorage.getItem("cpfStore");
    const [email, setEmail] = useState('');
    const [active, setActive] = useState("Nao");
    const [typeUser, setTypeUser] = useState("N");
    const [nameUser, setNameUser] = useState('');
    
    const [users, setUsers] = useState([])
    
    const [update, setUpdate] = useState(false);

    const history = useHistory();

    useEffect(() =>{

        async function getUsers(){
            const response = await api.get('users', {
                headers: {
                    authorization: cpfStore
                }
            });
            setUsers(response.data);

        }
        getUsers();


    },[update])

    function validateCheck(idElement){
            const validate = document.getElementById(idElement);
            let opacity = validate.getAttribute("opacity");
             if(opacity === "0.3"){
                validate.removeAttribute("opacity");
                if(idElement === "Admin")
                    setTypeUser("S");
                else if(idElement === "Ativo")
                    setActive("S");
             }
             else{
                 validate.setAttribute("opacity", "0.3");
                 if(idElement === "Admin")
                    setTypeUser("N");
                else if(idElement === "Ativo")
                    setActive("N");
            }
    }

    async function handleUser(e){
        e.preventDefault();

        const data = {  
            cpf_People: cpfStore,
            email,
            password: "",
            active,
            typeUser,
            nameUser
        }

        const response = await api.post("users", data);

        console.log(response);
        if(response.status === 200){
            alert(response.data.sucess);                    
        }
        else if(response.status === 400){
            alert(response.data.warning)
        }
        else if((response.status === 500)){
            alert("Falha de conexão com a base de dados. Favor acionar o suporte.");
        }
        setUpdate(update === false ? true : false);
    }

    async function handleActive (idUser){
        const userUpdate = users.filter(users => users.idUser === idUser);        
        
        const data ={
            idUser,
            email: userUpdate[0].email,
            password: "0",
            active : userUpdate[0].active === "Nao" ? "Sim" : "Nao",
            typeUser :userUpdate[0].typeUser 
        }
        const response = await api.put('users', data)

        if(response.status === 200){
            alert(response.data.sucess)
        }
        else
        alert(response.data.error)
        setUpdate(update === false ? true : false);
    }

    async function handleAdmin (idUser){
        const userUpdate = users.filter(users => users.idUser === idUser);       

        const data ={
            idUser,
            email: userUpdate[0].email,
            password: "0",
            active: userUpdate[0].active,
            typeUser: userUpdate[0].typeUser  === "N" ? "S" : "N"
        }
        const response = await api.put('users', data)

        if(response.status === 200){
            alert(response.data.sucess)
        }
        else
        alert(response.data.error)
        setUpdate(update === false ? true : false);
    }

    return(
        <div className="user-container">
            <Main/>
            <div className="user-content">
                <form onSubmit={handleUser}>
                    <FaArrowLeft className="svg" onClick={() => history.push('/schedule')} size={25}/>
                    <div className="user-content-data">
                       <div id="texts">
                           <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="email" required={true}/>
                           <input value={nameUser} onChange={e => setNameUser(e.target.value)} placeholder="Nome" type="text" required={true}/>
                       </div>
                       <div id="checks">
                           <span>Ativo</span>
                           <FaCheckCircle id="Ativo" onClick={() => validateCheck('Ativo')} size={20} color={"#c40505"} opacity={0.3}/>
                           <span>Admin</span>
                           <FaCheckCircle id="Admin" onClick={() => validateCheck('Admin')} size={20} color={"#c40505"} opacity={0.3}/>
                       </div>
                    </div>
                    <div className="user-content-submit">
                        <button type="submit">Enviar</button>
                    </div>

                </form>                
                <section>
                    <ul>
                        {users.map(users => {
                            function setColorCheck(dom){
                                console.log(dom)
                             }                        
                            return(
                                <li className="list" id="list" key={users.idUser}>
                                <div id="texts">
                                    <span>E-mail: {users.email}</span>
                                    <span>Name: {users.nameUser}</span>
                                </div >
                                <div id="checks">
                                    <span>Ativo</span>
                                    <FaCheckCircle className={users.active.trim()}
                                    onClick={e => handleActive(users.idUser)} size={20} color={"#c40505"}/>
                                    <span>Admin</span>
                                    <FaCheckCircle className={users.typeUser.trim()} onClick={e => handleAdmin(users.idUser)}
                                     size={20} color={"#c40505"}/>
                               </div>
                            </li>
                            )
                        }

                        )}
                    </ul>
                </section>
            </div>
            <Footer/>
        </div>
    );
}

export default Users;