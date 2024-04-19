import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCocktailCardMini = (props) => {
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
      <rect x="0" y="0" rx="10" ry="10" width="287" height="380" />
  </ContentLoader>
  );
};

export default SkeletonCocktailCardMini;