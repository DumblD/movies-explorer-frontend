import React from 'react';

function InfoToolTip({
  isActive,
  infoMessage,
  additionalInfoClassStyles,
  additionalInfotextStyles,
  isTextColorGreen,
}) {

  const infoStyle = typeof additionalInfoClassStyles === "undefined" ? '' : additionalInfoClassStyles;
  const infoTextStyle = typeof additionalInfotextStyles === "undefined" ? '' : additionalInfotextStyles;
  const isToolTipActive = typeof isActive === "undefined" ? true : isActive;
  const isGreen = typeof isTextColorGreen === "undefined" ? false : isTextColorGreen;

  return (
    <div className={`${infoStyle ? infoStyle : ''} page__info-tool-tip ${isToolTipActive ? '' : 'info-tool-tip_disabled'}`}>
      <p className={`${infoTextStyle ? infoTextStyle : ''} info-tool-tip__text ${isGreen ? 'info-tool-tip__text_color_green' : ''}`}>{infoMessage}</p>
    </div>
  );
}

export default InfoToolTip;
