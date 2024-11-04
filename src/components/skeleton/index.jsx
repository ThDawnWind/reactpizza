import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => {
  return (
  <ContentLoader 
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 459"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="446" y="682" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="121" cy="136" r="126" /> 
    <circle cx="535" cy="556" r="23" /> 
    <circle cx="188" cy="153" r="6" /> 
    <rect x="2" y="274" rx="0" ry="0" width="239" height="41" /> 
    <rect x="-1" y="332" rx="0" ry="0" width="241" height="80" /> 
    <rect x="1" y="430" rx="0" ry="0" width="110" height="21" /> 
    <rect x="509" y="574" rx="0" ry="0" width="51" height="11" /> 
    <rect x="134" y="431" rx="0" ry="0" width="108" height="19" />
  </ContentLoader>
  );
};
