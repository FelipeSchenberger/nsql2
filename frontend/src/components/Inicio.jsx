import React from 'react';
import '../styles/Inicio.css';

function Inicio() {
    return (
        <div className='inicio-container'>
            <img className='img-inicio' src={require('../assets/foto1.png')} alt='Concepcion del Uruguay' />
            <h1 className='title'>Conocé Concepción del Uruguay</h1>
        </div>
    );
};

export default Inicio;