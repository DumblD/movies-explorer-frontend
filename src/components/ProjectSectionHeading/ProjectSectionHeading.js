import React from 'react';

function ProjectSectionHeading({
  headingTitle,
  sectionClassName,
}) {

  return (
    <div className={`${sectionClassName}__heading project-heading`}>
      <h2 className="project-heading__heading-title">{headingTitle}</h2>
    </div>
  );
}

export default ProjectSectionHeading;
