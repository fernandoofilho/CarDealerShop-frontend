import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const fetchCars = async () => {
      try {
        const response = await fetch(`/Search?Name=${searchTerm}`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Erro ao carregar carros:', error);
      }
    };

    fetchCars();
  }, [searchTerm]);

  const handleSearch = async () => {
  };

  const handleAddCar = async () => {
    const newCar = { name: 'Novo Carro', brand: 'Nova Marca', price: 10000 };
    try {
      const response = await fetch('/AddVehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Consulta de Carros</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          placeholder="Pesquisar por nome..."
        />
        <button onClick={handleSearch} className="search-button">Pesquisar</button>
      </div>
      <button onClick={handleAddCar} className="add-car-button">Adicionar Carro</button>
      <div className="car-list-container">
        <ul className="car-list">
          {Array.isArray(cars) && cars.map((car) => (
            <li key={car.id} className="car-item">
              <span className="car-name">{car.name}</span> - <span className="car-brand">{car.brand}</span> - <span className="car-price">R$ {car.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
