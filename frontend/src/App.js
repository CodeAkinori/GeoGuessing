import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [flagUrl, setFlagUrl] = useState('');
  const [country, setCountry] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');

  const fetchFlag = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_flag');
      setFlagUrl(`http://localhost:5000${response.data.flag_url}`);
      setCountry(response.data.country);
      setAnswer('');
      setResult('');
    } catch (error) {
      console.error("Erro ao buscar a bandeira:", error);
    }
  };

  useEffect(() => {
    fetchFlag();
  }, []);

  const checkAnswer = async () => {
    const response = await axios.post('http://localhost:5000/check_answer', {
      answer,
      country,
    });
    setResult(response.data.result === 'correct' ? 'Acertou!' : 'Errou!');
    setTimeout(fetchFlag, 2000); // Mostra o próximo país após 2 segundos
  };

  return (
    <div className="container">
      <img src={flagUrl} alt="Bandeira do país" />
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Nome do país"
      />
      <button onClick={checkAnswer}>Enviar</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
