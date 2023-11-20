import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCocktailCard = (props) => {
  return (
    <ContentLoader 
      speed={2}
      width={400}
      height={350}
      viewBox="0 0 400 350"
      backgroundColor="#6b6b6b"
      foregroundColor="#b0b0b0"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="260" height="335" />
  </ContentLoader>
  );
};

export default SkeletonCocktailCard;