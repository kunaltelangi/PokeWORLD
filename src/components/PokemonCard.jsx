import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { usePokemonModal } from '../context/PokemonModalProvider';
import { getTypeIconSrc } from '../utils/pokemon-helper';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const { id, paddedId, name, types, imgSrc } = pokemon;
  const { openModal } = usePokemonModal();

  const handleClick = () => openModal(pokemon);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`pokemon-card ${types[0]?.name}`}
      aria-label={`View details for ${name}`}
    >
      <div className="pokemon-card__info">
        <span className="pokemon-card__id">#{paddedId}</span>
        <span className="pokemon-card__name">{name}</span>

        <div className="pokemon-card__types">
          {types.map(({ name: typeName }) => {
            const typeImg = getTypeIconSrc(typeName);
            return (
              <div
                key={typeName}
                className={`pokemon-card__type pokemon-card__type--${typeName}`}
              >
                <img
                  src={typeImg}
                  alt={`${typeName} icon`}
                  className="pokemon-card__type-icon"
                  loading="lazy"
                />
                <span className="pokemon-card__type-name">{typeName}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pokemon-card__background" aria-hidden="true" />
      <img
        className="pokemon-card__image"
        src={imgSrc}
        alt={name}
        loading="lazy"
        onError={(e) => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
      />
    </button>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    paddedId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string.isRequired })
    ).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(PokemonCard);
