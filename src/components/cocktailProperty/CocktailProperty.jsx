import React from 'react';

const CocktailProperty = ({title, desc}) => {
  return (
    <div className="cocktailPage__property">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default CocktailProperty;