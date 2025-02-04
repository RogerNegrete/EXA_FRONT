import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './App.css';

//https://back-mongo-deploy.vercel.app
const baseURL = 'http://localhost:3001';
axios.defaults.baseURL = baseURL;
console.log('Backend URL:', axios.defaults.baseURL);

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Detalle del error de axios:', error);
    return Promise.reject(error);
  }
);


function App() {
    const [items, setItems] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [formData, setFormData] = useState({
        estacion: '',
        nivel_productividad: '',
        produccion_dia: '',
        total_produccion: '',
        editandoId: null
    });



    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargarItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/api/estacion');
            setItems(res.data);
        } catch (error) {
            setError('Error al cargar items: ' + error.message);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    
    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            const itemData = {
                estacion: formData.estacion,
                nivel_productividad: formData.nivel_productividad,
                produccion_dia: formData.produccion_dia,
                total_produccion:formData.total_produccion,
            };

            if (formData.editandoId) {
                 await axios.post('/api/estacion', itemData);
            }
            setFormData({
                estacion: '',
                nivel_productividad: '',
                produccion_dia: '',
                total_produccion: '',
                editandoId: null
            });
            await cargarItems();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    useEffect(() => {
        cargarItems();
    }, []);

    return (
        <div>
            <h1>Estaciones de trabajo</h1>
            
            {error && <div className="error-mensaje">{error}</div>}
            {loading && <div className="loading-mensaje">Cargando...</div>}
            
            <div>
                <button onClick={cargarItems}>Mostrar Todos</button>
            </div>

            <form onSubmit={manejarSubmit}>
            <select
                    value={formData.nivel_productividad}
                    onChange={(e) => setFormData({...formData, nivel_productividad: e.target.value})}
                >
                    <option value="1"> Estacion 1 </option>
                    <option value="2">Estacion 2 </option>
                    <option value="3">Estacion 3 </option>
                    <option value="4">Estacion 4 </option>
                    <option value="5">Estacion 5 </option>
                    <option value="6">Estacion 6 </option>
                    <option value="7">Estacion 7 </option>
                    <option value="8">Estacion 8 </option>
                    <option value="9">Estacion 9 </option>
                    <option value="10">Estacion 10</option>
                </select>
                    <select
                    value={formData.nivel_productividad}
                    onChange={(e) => setFormData({...formData, nivel_productividad: e.target.value})}
                >
                    <option value="Excelente">Excelente (Excelente)</option>
                    <option value="Bueno">Bueno (Bueno)</option>
                    <option value="Deficiente">Deficiente (Deficiente)</option>

                </select>

                <input
                    type="number"
                    placeholder="Produccion_dia"
                    required
                    value={formData.produccion_dia}
                    onChange={(e) => setFormData({...formData, produccion_dia: e.target.value})}
                />
                <input
                    type="number" 
                    placeholder="Total_produccion"
                    required
                    value={formData.total_produccion}
                    onChange={(e) => setFormData({...formData, total_produccion: e.target.value})}
                />

                <button type="submit">
                    {formData.editandoId ? 'Actualizar' : 'Agregar estacion'}
                </button>
            </form>

            <div>
                {items.map(item => (
                    <div key={item.id}>
                        <h3>{item.estacion}</h3>
                        <p>nivel_productividad: {item.nivel_productividad}</p>
                        <p>total_produccion: ${item.total_produccion?.toFixed(2)}</p>
                        <p>Costo Total: ${item.costoTotal?.toFixed(2)}</p>
                        <div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;