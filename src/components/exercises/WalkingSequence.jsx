import React, { useEffect, useRef, useState } from 'react';
import './WalkingSequence.css';

// Importiamo Dragula direttamente
const loadDragula = () => {
  return new Promise((resolve, reject) => {
    // Controlla se dragula è già caricato
    if (window.dragula) {
      return resolve(window.dragula);
    }

    // Altrimenti carichiamo il CSS e JS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.3/dragula.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.3/dragula.min.js';
    script.onload = () => resolve(window.dragula);
    script.onerror = () => reject(new Error('Failed to load Dragula'));
    document.body.appendChild(script);
  });
};

const WalkingSequence = () => {
  const containerRef = useRef(null);
  const drakeRef = useRef(null);
  const correctSequence = [
    { id: 1, src: '/walking/cammino1.jpg', alt: 'Fase 1 del cammino' },
    { id: 2, src: '/walking/cammino2.jpg', alt: 'Fase 2 del cammino' },
    { id: 3, src: '/walking/cammino3.jpg', alt: 'Fase 3 del cammino' },
    { id: 4, src: '/walking/cammino4.jpg', alt: 'Fase 4 del cammino' },
    { id: 5, src: '/walking/cammino5.jpg', alt: 'Fase 5 del cammino' },
    { id: 6, src: '/walking/cammino6.jpg', alt: 'Fase 6 del cammino' },
    { id: 7, src: '/walking/cammino7.jpg', alt: 'Fase 7 del cammino' }
  ];
  const [cards, setCards] = useState([...correctSequence]);
  const [dragulaLoaded, setDragulaLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Carica Dragula
  useEffect(() => {
    loadDragula()
      .then(dragula => {
        console.log('Dragula caricato con successo');
        setDragulaLoaded(true);
      })
      .catch(error => {
        console.error('Errore nel caricamento di Dragula:', error);
      });
  }, []);

  // Inizializza le immagini in ordine casuale e avvia il timer
  useEffect(() => {
    const shuffledCards = [...correctSequence].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setStartTime(Date.now());
  }, []);

  // Gestisce il timer
  useEffect(() => {
    let interval;
    if (startTime && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  // Inizializza Dragula dopo che il componente è montato e Dragula è caricato
  useEffect(() => {
    if (!dragulaLoaded || !containerRef.current) return;

    console.log('Inizializzazione di Dragula');
    
    // Inizializza Dragula con il riferimento diretto al DOM
    const drake = window.dragula([containerRef.current], {
      moves: function(el, container, handle) {
        // Permette il trascinamento solo se è una scheda e non è stata completata la verifica
        return el.classList.contains('card') && !isComplete;
      },
      direction: 'horizontal'
    });

    drake.on('drag', function(el) {
      console.log('Elemento in fase di dragging:', el);
    });

    drakeRef.current = drake;

    // Gestisci l'evento drop
    drake.on('drop', function(el, target, source, sibling) {
      console.log('Elemento rilasciato:', el);
      
      // Riordiniamo le carte in base alla nuova posizione nel DOM
      const updatedCards = Array.from(containerRef.current.children)
        .filter(child => child.classList.contains('card'))
        .map((cardEl) => {
          const cardId = parseInt(cardEl.getAttribute('data-id'), 10);
          const card = cards.find(c => c.id === cardId);
          return card ? { ...card } : null;
        })
        .filter(Boolean);
      
      console.log('Carte aggiornate:', updatedCards);
      setCards(updatedCards);
    });

    // Cleanup quando il componente viene smontato
    return () => {
      if (drakeRef.current) {
        console.log('Distruzione di Dragula');
        drakeRef.current.destroy();
      }
    };
  }, [dragulaLoaded, cards, isComplete]);

  // Formatta il tempo in minuti:secondi
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Verifica se una carta è nella posizione corretta
  const isCorrect = (card, index) => {
    return card.id === correctSequence[index].id;
  };

  // Gestisce il click sul bottone "Verifica Sequenza"
  const handleComplete = () => {
    setIsComplete(true);
  };

  // Calcola il punteggio
  const calculateScore = () => {
    let correctCount = 0;
    cards.forEach((card, index) => {
      if (isCorrect(card, index)) {
        correctCount++;
      }
    });
    return correctCount;
  };

  return (
    <div className="walking-sequence">
      <h1>Ordina le fasi del cammino</h1>
      
      {!isComplete && (
        <div className="timer">
          Tempo: {formatTime(timeElapsed)}
        </div>
      )}
      
      <div className="board">
        <div className="column-header">Sequenza di immagini</div>
        <div className="column" id="tasks" ref={containerRef}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              data-id={card.id}
              className={`card ${
                isComplete ? (isCorrect(card, index) ? 'correct' : 'incorrect') : ''
              }`}
            >
              <img 
                src={card.src} 
                alt={card.alt} 
                className="card-image"
              />
            </div>
          ))}
        </div>
      </div>

      {!isComplete ? (
        <div className="verify-button-container">
          <button 
            className="verify-button" 
            onClick={handleComplete}
          >
            Verifica Sequenza
          </button>
        </div>
      ) : (
        <div className="result-container">
          <h2>Risultato:</h2>
          <p className="result-correct">✓ Immagini in verde: posizionate correttamente</p>
          <p className="result-incorrect">✗ Immagini in rosso: posizionate in modo scorretto</p>
          <p className="result-score">Punteggio: {calculateScore()} / {correctSequence.length}</p>
          <p className="result-time">Tempo impiegato: {formatTime(timeElapsed)}</p>
        </div>
      )}
    </div>
  );
};

export default WalkingSequence; 