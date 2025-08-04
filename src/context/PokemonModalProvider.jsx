import React, { createContext, useContext, useState } from 'react';

const PokemonModalContext = createContext();

export const usePokemonModal = () => {
    const context = useContext(PokemonModalContext);
    if (!context) {
        throw new Error('usePokemonModal must be used within a PokemonModalProvider');
    }
    return context;
};

export const PokemonModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ isOpen: false, pokemon: null });

    const openModal = (pokemon) => setModal({ isOpen: true, pokemon });

    const closeModal = () =>
        setModal(prev => ({ ...prev, isOpen: false }));

    const value = {
        currentPokemon: modal.pokemon,
        isModalOpen: modal.isOpen,
        openModal,
        closeModal,
    };

    return (
        <PokemonModalContext.Provider value={value}>
            {children}
        </PokemonModalContext.Provider>
    );
};
