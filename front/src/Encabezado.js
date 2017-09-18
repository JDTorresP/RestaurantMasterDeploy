import React, { Component } from 'react';
//import './css/bootstrap.css';
//import './css/styles.css';

class Encabezado extends Component {
  render() {
    return (
      <header className="encabezado py-1" role="banner">
        <div className="container">
          <div className="rojo">
            <h1 className="text-center">Welcome to Food Master APP</h1> 
            <p className="text-center">Food Master es un concurso donde varios restaurantes junto a sus platos concursantes
              'luchan' por obtener el titulo del mejor.</p>
          </div>   
            <h4>INSTRUCCIONES:</h4>
            <h5>1. Ve al restaurante y pregunta por su producto de Food Master</h5>
            <h5>2. Disfruta</h5>
            <h5>3. Vota</h5> 
        </div>
      </header>
    );
  }
}

export default Encabezado;
