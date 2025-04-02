import React, { useState, useEffect } from 'react';
import './WalkingSequence.css';

const WalkingSequence = () => {
  // Stato iniziale delle immagini in ordine corretto
  const correctSequence = [
    { id: 1, src: '/walking/1.png', alt: 'Fase 1 del cammino' },
    { id: 2, src: '/walking/2.png', alt: 'Fase 2 del cammino' },
    { id: 3, src: '/walking/3.png', alt: 'Fase 3 del cammino' },
    { id: 4, src: '/walking/4.png', alt: 'Fase 4 del cammino' },
    { id: 5, src: '/walking/5.png', alt: 'Fase 5 del cammino' },
    { id: 6, src: '/walking/6.png', alt: 'Fase 6 del cammino' },
    { id: 7, src: '/walking/7.png', alt: 'Fase 7 del cammino' },
  ];

  const [images, setImages] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Inizializza le immagini in ordine casuale
  useEffect(() => {
    const shuffledImages = [...correctSequence].sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
    setStartTime(Date.now());
  }, []);

  // Aggiorna il timer ogni secondo
  useEffect(() => {
    let interval;
    if (startTime && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const handleDragStart = (e, image, index) => {
    setDraggedImage(image);
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedImage(null);
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newImages = [...images];
    const [removed] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, removed);
    
    setImages(newImages);
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  const isCorrect = (image, index) => {
    return image.id === correctSequence[index].id;
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="walking-sequence">
      <h2 className="text-2xl font-bold mb-6">Ordina le fasi del cammino</h2>
      
      {!isComplete && (
        <div className="text-lg mb-4">
          Tempo: {formatTime(timeElapsed)}
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {images.map((image, index) => (
          <div
            key={image.id}
            draggable
            onDragStart={(e) => handleDragStart(e, image, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={`image-container ${
              isComplete
                ? isCorrect(image, index)
                  ? 'correct'
                  : 'incorrect'
                : ''
            } ${draggedIndex === index ? 'dragging' : ''}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-auto h-[400px] rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      {!isComplete && (
        <div className="mt-8 text-center">
          <button
            onClick={handleComplete}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Verifica Sequenza
          </button>
        </div>
      )}

      {isComplete && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Risultato:</h3>
          <p className="text-green-600 mb-2">✓ Immagini in verde: posizionate correttamente</p>
          <p className="text-red-600 mb-4">✗ Immagini in rosso: posizionate in modo scorretto</p>
          <p className="text-gray-600">Tempo impiegato: {formatTime(timeElapsed)}</p>
        </div>
      )}
    </div>
  );
};

export default WalkingSequence; 