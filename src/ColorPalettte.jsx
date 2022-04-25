import React, { useState } from 'react';

const ColorPalette = ({ title, colors }) => {
  const [activeColor, setActiveColor] = useState(null);

  const onTileClick = async (color) => {
    setActiveColor(color);

    try {
      await navigator.clipboard.writeText(color);
    } catch (e) {
      console.log(`${e} - the action is not supported`);
    }
  };

  const onHover = (color) => {
    if (color !== activeColor) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="palette-container">
      <div className="tiles">
        {colors.map(({ value, lightLabel }) => (
          <button
            onClick={() => onTileClick(value)}
            onMouseOver={() => onHover(value)}
            key={value}
            className={`tile ${value === activeColor ? 'active' : 'inactive'}`}
            style={{ background: value }}
          >
            <span className={`label ${lightLabel ? 'light' : 'dark'}`}>
              {value.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
      <div className="palette-info">
        <h3>{title}</h3>
        {activeColor && (
          <div>
            <span className="tile-sm" style={{ background: activeColor }} />
            <span>{activeColor} - copied!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPalette;
