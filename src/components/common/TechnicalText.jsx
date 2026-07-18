const TechnicalText = ({ as: Component = "span", children, className = "" }) => (
  <Component
    className={`technical-term ${className}`.trim()}
    dir="ltr"
    lang="en"
  >
    {children}
  </Component>
);

export default TechnicalText;
