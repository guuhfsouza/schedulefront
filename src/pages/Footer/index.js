import React from 'react'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

import '../../global.css';
import './style.css';

function Footer() {
    return (
        <div className="footer-container">
          <div className="container-content">
            <p>Nos siga nas redes sociais:</p>
            <a href="https://www.facebook.com/gustavo.ferreiraxx" target="_black">
              <FaFacebook size={18} />
            </a >
            <a  href="https://www.instagram.com/guhfsouza/?hl=pt-br" target="_black">
              <FaInstagram size={18} />
            </a >
            <a href="https://www.linkedin.com/in/gustavo-ferreira-809b66b4/" target="_black">
              <FaLinkedin size={18} />
            </a >
          </div>
        </div>
    );    
}

export default Footer;