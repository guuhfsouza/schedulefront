import React, {useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa'

import Main from '../Main';
import Footer from '../Footer';

import '../../global.css';
import '../Profile/style.css';

import Perfil from '../../images/perfil.jpg'

import api from '../../services/api';

function Profile(){
    const cpfStore = sessionStorage.getItem('cpfStore')
    const email = sessionStorage.getItem('user');
    const [profile, setProfile] = useState([]);

    const history = useHistory();

    useEffect(() => {

        if(cpfStore && email){
            api.get('profile', {
                headers: {
                    cpf: cpfStore,
                    email: email
                }
            }).then( response => {
                setProfile(response.data);
                sessionStorage.setItem('idProfile', response.data.idPeople)
            });
        }
        else{
            return history.push('/');
        }
    }, [])

    function handleImagePerfil(){
        
    }

    return(
        <div className="profile-container">
            <Main/>
            <div className="prof-content">
                <div className="profile-card">
                    <div className="div-cabecalho">
                    <FaArrowLeft className="svg" onClick={() => history.push('/schedule')} size={25}/>
                        <img src={Perfil} onClick={handleImagePerfil} alt="Foto de Perfil"/>
                        {/* <span> Perfil</span> */}
                    </div>
                    <span>Nome: {profile.name}</span>
                    <span>E-mail: {profile.email}</span>
                    <span>CPF / CPFStore: {profile.cpf} </span>
                    <span>Cel: {profile.phone}</span>
                    <span>Desde: {profile.created_at}</span>
                    <div className="local">
                        <span>Cidade: {profile.city}</span>
                        <span>UF: {profile.uf}</span>
                    </div>
                    <Link className="button" to="register">Editar Perfil</Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;