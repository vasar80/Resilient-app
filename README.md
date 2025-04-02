# Resilient App

Un'applicazione web per la valutazione e il training cognitivo, con particolare focus sul neglect spaziale.

## Funzionalità

- Test di Neglect Spaziale
  - Test di cancellazione delle lettere H
  - Analisi della performance per emicampo
  - Diagnosi automatica del livello di neglect

- Esercizi di Training
  - Sequenza del cammino
  - Ordinamento delle fasi del cammino
  - Feedback in tempo reale

## Tecnologie Utilizzate

- React
- Vite
- Tailwind CSS
- React Router

## Requisiti di Sistema

- Node.js >= 14.0.0
- npm >= 6.0.0

## Installazione

1. Clona il repository:
```bash
git clone https://github.com/yourusername/resilient-app.git
```

2. Installa le dipendenze:
```bash
cd resilient-app
npm install
```

3. Avvia l'applicazione in modalità sviluppo:
```bash
npm run dev
```

4. Apri il browser all'indirizzo: http://localhost:3000

## Struttura del Progetto

```
resilient-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── test/
│   │   └── exercises/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── walking/
├── index.html
└── package.json
```

## Licenza

MIT 