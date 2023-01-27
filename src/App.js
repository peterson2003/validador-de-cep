import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const[input, setInput] = useState('');
  const[cep, setCep] = useState({});

   async function searchCep(){
    if(input === ''){
      alert('preencha algum cep!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }catch{
      alert('Ops!!! Erro ao encontrar o CEP');
      setInput("");
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        maxLength="8"
        />

        <button className="buttonSearch" onClick={searchCep}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade e UF: {cep.localidade}-{cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
