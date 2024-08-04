import React, { useState } from 'react';

// CSS styles for the modal
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const overlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: '1000'
};

const CharacterModal = ({ isOpen, close, character, homeWorld }) => {
  if (!isOpen) return null;

  return (
    <>
      <div style={overlayStyle} onClick={close} />
      <div style={modalStyle}>
        <h2>{character.name}</h2>
        <p>Height: {character.height / 100} meters</p>
        <p>Mass: {character.mass} kg</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Date Added: {format(new Date(character.created), 'dd-MM-yyyy')}</p>
        <p>Number of Films: {character.films.length}</p>
        {homeWorld && (
          <>
            <h3>Home World</h3>
            <p>Name: {homeWorld.name}</p>
            <p>Terrain: {homeWorld.terrain}</p>
            <p>Climate: {homeWorld.climate}</p>
            <p>Number of Residents: {homeWorld.residents.length}</p>
          </>
        )}
        <button onClick={close}>Close</button>
      </div>
    </>
  );
};


export default CharacterModal;