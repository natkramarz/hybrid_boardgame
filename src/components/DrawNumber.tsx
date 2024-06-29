"use client"
import React, { useState } from 'react';

const DrawNumber: React.FC = () => {
  const [availableNumbers, setAvailableNumbers] = useState<String[]>(["A", "B", "C", "D"]);
  const [drawnNumbers, setDrawnNumbers] = useState<String[]>([]);

  const drawNumber = () => {
    if (availableNumbers.length === 0) {
      alert('All numbers have been drawn!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers[randomIndex];

    setAvailableNumbers(availableNumbers.filter((_, index) => index !== randomIndex));
    setDrawnNumbers([...drawnNumbers, drawnNumber]);
  };

  return (
    <div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={drawNumber}>
        Wylosuj misję
      </button>
        <h2>Wylosowane misje:</h2>
        <ul>
          {drawnNumbers.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
  );
};

export default DrawNumber;
