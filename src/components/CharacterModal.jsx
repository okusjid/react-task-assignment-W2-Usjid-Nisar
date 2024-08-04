import React from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';

Modal.setAppElement('#root');

const CharacterModal = ({ isOpen, onRequestClose, character, homeWorld }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);

export default CharacterModal;
