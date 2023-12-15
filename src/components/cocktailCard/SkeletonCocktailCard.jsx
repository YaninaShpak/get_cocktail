import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonCocktailCard = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={705}
    viewBox="0 0 1340 705"
    backgroundColor="#6b6b6b"
    foregroundColor="#b0b0b0"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="580" height="704" /> 
    <rect x="630" y="0" rx="10" ry="10" width="700" height="705" />
  </ContentLoader>
)

export default SkeletonCocktailCard;