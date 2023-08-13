import React from 'react';

function AboutProjectSectionHeading({
  headingTitle,
}) {

  return (
    <div className="about-project__heading">
      <h2 className="about-project__heading-title">{headingTitle}</h2>
    </div>
  );
}

export default AboutProjectSectionHeading;
