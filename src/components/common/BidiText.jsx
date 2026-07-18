import React from "react";
import TechnicalText from "./TechnicalText";

const TECHNICAL_TERMS =
  /(Tailwind CSS|JavaScript|Bootstrap|Full-Stack|LocalStorage|Frontend|GitHub|MySQL|React|HTML|CSS|PHP|JSON|PWA|API|UI|UX|RTL|Git)/g;
const EXACT_TECHNICAL_TERM =
  /^(Tailwind CSS|JavaScript|Bootstrap|Full-Stack|LocalStorage|Frontend|GitHub|MySQL|React|HTML|CSS|PHP|JSON|PWA|API|UI|UX|RTL|Git)$/;

const BidiText = ({ children, as: Component = React.Fragment, ...props }) => {
  if (typeof children !== "string") {
    return <Component {...props}>{children}</Component>;
  }

  const parts = children.split(TECHNICAL_TERMS);
  const content = parts.map((part, index) =>
    EXACT_TECHNICAL_TERM.test(part) ? (
      <TechnicalText key={`${part}-${index}`}>{part}</TechnicalText>
    ) : (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    ),
  );

  return <Component {...props}>{content}</Component>;
};

export default BidiText;
