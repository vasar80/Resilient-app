import React, { useState, useEffect } from 'react';
import './WalkingSequence.css';

const WalkingSequence = () => {
  // Stato iniziale delle immagini in ordine corretto
  const correctSequence = [
    { id: 1, src: '/walking/cammino1.jpg', alt: 'Fase 1 del cammino' },
    { id: 2, src: '/walking/cammino2.jpg', alt: 'Fase 2 del cammino' },
    { id: 3, src: '/walking/cammino3.jpg', alt: 'Fase 3 del cammino' },
    { id: 4, src: '/walking/cammino4.jpg', alt: 'Fase 4 del cammino' },
    { id: 5, src: '/walking/cammino5.jpg', alt: 'Fase 5 del cammino' },
    { id: 6, src: '/walking/cammino6.jpg', alt: 'Fase 6 del cammino' },
    { id: 7, src: '/walking/cammino7.jpg', alt: 'Fase 7 del cammino' },
  ];

  const [images, setImages] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [dragCurrentIndex, setDragCurrentIndex] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [previewPositions, setPreviewPositions] = useState([]);
  const [isDropping, setIsDropping] = useState(false);

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
    setDragStartIndex(index);
    setDragCurrentIndex(index);
    setIsDragging(true);
    setIsDropping(false);
    e.dataTransfer.effectAllowed = 'move';
    
    // Imposta l'immagine di trascinamento personalizzata
    const dragImage = e.currentTarget.querySelector('img').cloneNode(true);
    dragImage.style.width = '120px';
    dragImage.style.height = 'auto';
    dragImage.style.opacity = '0.8';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 60, 200);
    
    // Rimuovi l'immagine di trascinamento dopo che l'evento è completato
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragEnd = (e) => {
    // Se l'immagine non è stata rilasciata su un target valido, ripristina la posizione
    if (dragCurrentIndex !== null && dragStartIndex !== null && dragCurrentIndex !== dragStartIndex) {
      const newImages = [...images];
      const [removed] = newImages.splice(dragStartIndex, 1);
      newImages.splice(dragCurrentIndex, 0, removed);
      setImages(newImages);
    }
    
    setDraggedImage(null);
    setDragStartIndex(null);
    setDragCurrentIndex(null);
    setIsDragging(false);
    setPreviewPositions([]);
    setIsDropping(false);
  };

  const handleDragOver = (e, targetIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!isDragging || dragStartIndex === targetIndex) return;
    
    setDragCurrentIndex(targetIndex);
    
    // Calcola le nuove posizioni per tutte le immagini
    const newPositions = [...images].map((_, index) => {
      if (dragStartIndex < targetIndex) {
        // Spostamento verso destra
        if (index > dragStartIndex && index <= targetIndex) {
          return index - 1;
        }
      } else {
        // Spostamento verso sinistra
        if (index >= targetIndex && index < dragStartIndex) {
          return index + 1;
        }
      }
      return index;
    });

    setPreviewPositions(newPositions);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (dragStartIndex === null || dragStartIndex === targetIndex) return;

    setIsDropping(true);
    
    // Aggiorna immediatamente le posizioni delle immagini
    const newImages = [...images];
    const [removed] = newImages.splice(dragStartIndex, 1);
    newImages.splice(targetIndex, 0, removed);
    
    setImages(newImages);
    setIsDragging(false);
    setDragStartIndex(null);
    setDragCurrentIndex(null);
    setPreviewPositions([]);
    
    // Resetta lo stato di dropping dopo un breve ritardo
    setTimeout(() => {
      setIsDropping(false);
    }, 300);
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

  // Funzione per ottenere la posizione di anteprima per un'immagine
  const getPreviewPosition = (index) => {
    if (!isDragging || dragStartIndex === null) return index;
    
    // Se l'immagine è quella trascinata, non ha una posizione di anteprima
    if (index === dragStartIndex) return index;
    
    // Altrimenti, usa la posizione di anteprima calcolata
    return previewPositions[index] ?? index;
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
        {images.map((image, index) => {
          const previewIndex = getPreviewPosition(index);
          const isShifted = isDragging && index !== dragStartIndex && previewIndex !== index;
          
          return (
            <div
              key={image.id}
              draggable
              onDragStart={(e) => handleDragStart(e, image, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={`image-container ${
                isComplete
                  ? isCorrect(image, index)
                    ? 'correct'
                    : 'incorrect'
                  : ''
              } ${dragStartIndex === index ? 'dragging' : ''} ${
                isShifted ? 'shifted' : ''
              } ${isDropping && dragCurrentIndex === index ? 'dropping' : ''}`}
              style={{
                transform: isShifted 
                  ? `translateX(${(previewIndex - index) * 128}px)` 
                  : 'none'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-auto h-[400px] rounded-lg shadow-md"
              />
            </div>
          );
        })}
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