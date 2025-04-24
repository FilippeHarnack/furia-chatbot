// PanteraBot - Layout Dark Modernizado com Agenda de Jogos
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const mockResponses = {
  "ola": "Fala, torcedor da FURIA! Preparado pra ver bala hoje? 🐱‍👤",
  "ultimos jogos": "Nos últimos jogos, a FURIA enfrentou NAVI, G2 e Liquid. 2 vitórias e 1 derrota! 🔥",
  "jogadores": null,
  "proximos jogos": null,
  "memes": "FAZ O L! 😂🐾",
  "merch": "Confere a loja oficial da FURIA aqui: https://shop.furia.gg 👕🧢"
};

const playerData = [
  { name: "KSCERATO", fullName: "Gabriel 'KSCERATO' Veronese", role: "Entry Fragger", kd: "1.20", rating: "1.18", img: "https://via.placeholder.com/150?text=KSCERATO" },
  { name: "yuurih", fullName: "Yuri 'yuurih' Santos", role: "AWPer", kd: "1.14", rating: "1.12", img: "https://via.placeholder.com/150?text=yuurih" },
  { name: "arT", fullName: "Andrei 'arT' Piovezan", role: "Support", kd: "0.95", rating: "0.98", img: "https://via.placeholder.com/150?text=arT" },
  { name: "chelo", fullName: "Henrique 'chelo' Bastos", role: "Rifler", kd: "1.05", rating: "1.02", img: "https://via.placeholder.com/150?text=chelo" },
  { name: "FalleN", fullName: "Gabriel 'FalleN' Toledo", role: "In-Game Leader", kd: "1.08", rating: "1.10", img: "https://via.placeholder.com/150?text=FalleN" }
];

const upcomingGames = [
  { team: "FaZe Clan", date: "25/04/2025", time: "18:00", tournament: "IEM Dallas 2025" },
  { team: "NAVI", date: "27/04/2025", time: "15:30", tournament: "IEM Dallas 2025" },
  { team: "Vitality", date: "29/04/2025", time: "20:00", tournament: "IEM Dallas 2025" }
];

const userBubbleStyle = {
  background: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
  color: '#ffffff',
  borderRadius: '20px',
  padding: '0.75rem 1rem',
  maxWidth: '80%',
};

const botBubbleStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#f1f1f1',
  borderRadius: '20px',
  padding: '0.75rem 1rem',
  maxWidth: '80%',
};

const inputStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  border: 'none',
};

const gradientTextStyle = {
  background: 'linear-gradient(135deg, #FF3CAC, #784BA0, #2B86C5)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

function PlayerCards() {
  return (
    <div className="mt-4">
      <h4 className="text-white mb-3">Jogadores da FURIA CS:GO</h4>
      <div className="row g-3">
        {playerData.map((p, idx) => (
          <div className="col-12 col-sm-6" key={idx}>
            <div className="card bg-dark text-white h-100 shadow-lg" style={{ border: '1px solid #333' }}>
              <img src={p.img} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title" style={gradientTextStyle}>{p.name}</h5>
                <p className="card-text text-muted small">{p.fullName}</p>
                <ul className="list-unstyled">
                  <li><strong>Função:</strong> {p.role}</li>
                  <li><strong>KD:</strong> {p.kd}</li>
                  <li><strong>Rating:</strong> {p.rating}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div className="mt-4">
      <h4 className="text-white mb-3">Agenda de Jogos</h4>
      {upcomingGames.map((game, idx) => (
        <div key={idx} className="card bg-dark text-white mb-3 shadow-sm" style={{ border: '1px solid #444' }}>
          <div className="card-body">
            <h5 className="card-title">FURIA vs {game.team}</h5>
            <p className="card-text">
              <strong>Data:</strong> {game.date}<br />
              <strong>Hora:</strong> {game.time}<br />
              <strong>Torneio:</strong> {game.tournament}
            </p>
            <button className="btn btn-outline-light btn-sm">Ver mais</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "E aí! Eu sou o PanteraBot. Pergunta aí o que quiser saber sobre a FURIA! 🐱‍🏍" }
  ]);
  const [input, setInput] = useState("");
  const [showPlayers, setShowPlayers] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.toLowerCase();
    const userMessage = { sender: "user", text: input };

    if (userText === "jogadores") {
      setShowPlayers(true);
      setShowSchedule(false);
      setMessages([...messages, userMessage, { sender: "bot", text: "Confira abaixo os jogadores atuais da equipe!" }]);
    } else if (userText === "proximos jogos") {
      setShowSchedule(true);
      setShowPlayers(false);
      setMessages([...messages, userMessage, { sender: "bot", text: "Segue a agenda dos próximos jogos! 🗓️" }]);
    } else {
      setShowPlayers(false);
      setShowSchedule(false);
      const reply = mockResponses[userText] || "Não entendi 🤔 Tenta perguntar de outro jeito.";
      setMessages([...messages, userMessage, { sender: "bot", text: reply }]);
    }
    setInput("");
  };

  return (
    <div className="bg-black min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="card bg-dark bg-opacity-75 border-0 p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>

        {/* Header centralizado com logos e nome */}
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <img
              src="/pantera.png"
              alt="Pantera Mascote Cowboy"
              height="60"
              style={{ borderRadius: '50%', boxShadow: '0 0 12px #8E2DE2' }}
            />
            <span className="h2 fw-bold mb-0" style={gradientTextStyle}>PanteraBot 🐾</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/94/FURIA_Esports_logo.svg"
              alt="FURIA Logo"
              height="60"
            />
          </div>
        </div>

        <div className="mb-3 overflow-auto" style={{ maxHeight: '300px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`d-flex mb-2 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
              <div style={msg.sender === "user" ? userBubbleStyle : botBubbleStyle}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          {showPlayers && <PlayerCards />}
          {showSchedule && <Schedule />}
        </div>

                {/* Input */}
                <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Manda tua pergunta aí..."
            style={inputStyle}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="btn btn-primary" onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
