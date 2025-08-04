import React from 'react';
import useTypes from '../hooks/useTypes';
import { getTypeIconSrc } from '../utils/pokemon-helper';

const TypesBar = ({ toggleType }) => {
    const types = useTypes();

    return (
        <nav className="types-bar" aria-label="Filter by Pokémon type">
            {types.map(({ name }) => {
                const iconSrc = getTypeIconSrc(name);

                return (
                    <button
                        key={name}
                        className={`type-button ${name}`}
                        onClick={() => toggleType(name)}
                        aria-label={`Toggle ${name} type`}
                    >
                        <img src={iconSrc} alt={`${name} icon`} />
                    </button>
                );
            })}
        </nav>
    );
};

export default TypesBar;
