import React, { useState } from 'react';

export const Reportes = ({ setCarnet }) => {

    const [inputValue, setInputValue] = useState('')
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const buscarCarnet = (e) => {
        e.preventDefault();
        setCarnet(inputValue);
        console.log(inputValue);
    }

    return (
        <div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Carnet</span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Carnet" 
                    aria-label="Carnet" 
                    aria-describedby="basic-addon1" 
                    value={ inputValue }
                    onChange={ handleInputChange }
                />
            </div>
            <button 
                className="btn btn-dark"
                onClick= { buscarCarnet }
            >
                Buscar
            </button>
            <hr />
        </div>
    )
}
