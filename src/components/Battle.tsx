"use client"

import React, { useState } from 'react';

type PlayerStats = {
  health: number;
  attack: number;
  armor: number;
  dodgeChance: number; // in percentage
  movementPoints: number;
  regeneration: number;
};

const initialPlayerStats: PlayerStats = {
  health: 20,
  attack: 5,
  armor: 2,
  dodgeChance: 30,
  movementPoints: 2,
  regeneration: 3,
};

const label: { [key in keyof PlayerStats]: string } = { 'health': 'Zdrowie', 
    'attack': 'Atak',
    'armor': 'Pancerz',
    'dodgeChance': 'Szansa na unik (%)',
    'movementPoints': 'Punkty ruchu' ,
    'regeneration': 'Regeneracja'
}

const Battle: React.FC = () => {
  const [player1, setPlayer1] = useState<PlayerStats>(initialPlayerStats);
  const [player2, setPlayer2] = useState<PlayerStats>(initialPlayerStats);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  const [turn, setTurn] = useState<number>(1);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, player: 'player1' | 'player2') => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    const updatedStats = {
      ...((player === 'player1' ? player1 : player2) as PlayerStats),
      [name]: isNaN(parsedValue) ? 0 : parsedValue,
    };

    if (player === 'player1') {
      setPlayer1(updatedStats);
    } else {
      setPlayer2(updatedStats);
    }
  };

  const calculateHit = (attacker: PlayerStats, defender: PlayerStats): boolean => {
    const hitChance = 100 - defender.dodgeChance;
    const roll = Math.random() * 100;
    return roll <= hitChance;
  };

  const calculateDamage = (attacker: PlayerStats, defender: PlayerStats): number => {
    return Math.max(0, attacker.attack - 0.5 * defender.armor);
  };

  const handleAttack = () => {
    const attacker = currentPlayer === 'player1' ? player1 : player2;
    const defender = currentPlayer === 'player1' ? player2 : player1;
    let log = `Tura ${turn}: ${currentPlayer === "player1" ? "Pirat 1" : "Pirat 2"} atakuje. `;

    if (calculateHit(attacker, defender)) {
      const damage = calculateDamage(attacker, defender);
      log += `Uderza i zadaje ${damage.toFixed(2)} obrażeń!`;

      if (currentPlayer === 'player1') {
        setPlayer2({ ...defender, health: Math.max(0, defender.health - damage) });
      } else {
        setPlayer1({ ...defender, health: Math.max(0, defender.health - damage) });
      }
    } else {
      log += "Ale nie trafia!";
    }

    setBattleLog([...battleLog, log]);
    setTurn(turn + 1);
    setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  };

  const handleDefense = () => {
    const defender = currentPlayer === 'player1' ? player1 : player2;
    const newArmor = defender.armor * 1.5; // Increase armor by 50%
    const log = `Tura ${turn}: ${currentPlayer === "player1" ? "Pirat 1" : "Pirat 2"} broni się i dostaje dodatkową ilość punktów do pancerza: ${newArmor.toFixed(2)}.`;

    if (currentPlayer === 'player1') {
      setPlayer1({ ...defender, armor: newArmor });
    } else {
      setPlayer2({ ...defender, armor: newArmor });
    }

    setBattleLog([...battleLog, log]);
    setTurn(turn + 1);
    setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  };

  const handleEvade = () => {
    const evader = currentPlayer === 'player1' ? player1 : player2;
    const newDodgeChance = evader.dodgeChance + (evader.movementPoints * 6); // Increase dodge chance
    const log = `Tura ${turn}: ${currentPlayer === "player1" ? "Pirat 1" : "Pirat 2"} robi unik i dostaje dodatkową ilość punktów punktów procentowych do szansy na unik: ${newDodgeChance.toFixed(2)}%.`;

    if (currentPlayer === 'player1') {
      setPlayer1({ ...evader, dodgeChance: newDodgeChance });
    } else {
      setPlayer2({ ...evader, dodgeChance: newDodgeChance });
    }

    setBattleLog([...battleLog, log]);
    setTurn(turn + 1);
    setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  };

  const handleAction = (action: 'attack' | 'defend' | 'evade') => {
    switch (action) {
      case 'attack':
        handleAttack();
        break;
      case 'defend':
        handleDefense();
        break;
      case 'evade':
        handleEvade();
        break;
      default:
        break;
    }
  };

  const checkWinner = () => {
    if (player1.health <= 0) {
      return 'Player 2';
    }
    if (player2.health <= 0) {
      return 'Player 1';
    }
    return null;
  };

  const winner = checkWinner();

  return (
    <div>
      <h1>Bitwa</h1>
      <div>
        <h2>Pirat 1</h2>
        <label>
          Zdrowie:
          <input className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="health" value={player1.health} onChange={(e) => handleInputChange(e, 'player1')} />
        </label>
        <label>
          Atak:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="attack" value={player1.attack} onChange={(e) => handleInputChange(e, 'player1')} />
        </label>
        <label>
          Pancerz:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="armor" value={player1.armor} onChange={(e) => handleInputChange(e, 'player1')} />
        </label>
        <label>
          Szansa na unik (%):
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="dodgeChance" value={player1.dodgeChance} onChange={(e) => handleInputChange(e, 'player1')} />
        </label>
        <label>
          Punkty ruchu:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="movementPoints" value={player1.movementPoints} onChange={(e) => handleInputChange(e, 'player1')} />
        </label>
        <label>
          Regeneracja:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="regeneration" value={player1.regeneration} onChange={(e) => handleInputChange(e, 'player1')} />
        </label>
      </div>
      <div>
        <h2>Pirat 2</h2>
        <label>
          Zdrowie:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="health" value={player2.health} onChange={(e) => handleInputChange(e, 'player2')} />
        </label>
        <label>
          Atak:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="attack" value={player2.attack} onChange={(e) => handleInputChange(e, 'player2')} />
        </label>
        <label>
          Pancerz:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="armor" value={player2.armor} onChange={(e) => handleInputChange(e, 'player2')} />
        </label>
        <label>
          Szansa na unik (%):
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="dodgeChance" value={player2.dodgeChance} onChange={(e) => handleInputChange(e, 'player2')} />
        </label>
        <label>
          Punkty ruchu:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="movementPoints" value={player2.movementPoints} onChange={(e) => handleInputChange(e, 'player2')} />
        </label>
        <label>
          Regeneracja:
          <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="regeneration" value={player2.regeneration} onChange={(e) => handleInputChange(e, 'player2')} />
        </label>
      </div>
      {!winner && (
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAction('attack')}>Atak</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAction('defend')}>Obrona</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAction('evade')}>Unik</button>
        </div>
      )}
      {winner && <h2>{winner} wins!</h2>}
      <div>
        <h2>Przebieg bitwy</h2>
        <ul>
          {battleLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
          <li>{turn >= 6 &&
            <>
              <div>
                  Pirat 1 statystyki:
                {
                  Object.entries(player1).map(([key, value]) => <div key={key}>
                  {label[key as keyof PlayerStats]} : {value}
                </div>)
                }
              </div>
              <div>
                Pirat 2 statystyki:
                {
                  Object.entries(player2).map(([key, value]) =><div key={key}>
                  {label[key as keyof PlayerStats]} : {value}
                </div>)
                }
              </div>
            </>
          }</li>
        </ul>
      </div>
    </div>
  );
};

export default Battle;
