import { useEffect, useState } from "react";
import "./OptimizedImage.css";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  fetchPriority,
  onLoad,
  onError,
  ...imageProps
}) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
  }, [src]);

  const handleLoad = (event) => {
    setStatus("loaded");
    onLoad?.(event);
  };

  const handleError = (event) => {
    setStatus("error");
    onError?.(event);
  };

  return (
    <span
      className={`optimized-image__container optimized-image__container--${status}`}
    >
      <img
        {...imageProps}
        src={src}
        alt={alt}
        className={`optimized-image ${className}`.trim()}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  );
};

export default OptimizedImage;
