import { fireEvent, render, screen } from "@testing-library/react";
import OptimizedImage from "./OptimizedImage";

describe("OptimizedImage", () => {
  test("marks the image as loaded and forwards the load callback", () => {
    const onLoad = jest.fn();
    const { container } = render(
      <OptimizedImage src="/image.png" alt="Project preview" onLoad={onLoad} />
    );

    fireEvent.load(screen.getByAltText("Project preview"));

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toHaveClass(
      "optimized-image__container--loaded"
    );
  });

  test("keeps the alt text and exposes an error state without replacing src", () => {
    const { container } = render(
      <OptimizedImage src="/missing.png" alt="Missing project preview" />
    );
    const image = screen.getByAltText("Missing project preview");

    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/missing.png");
    expect(container.firstChild).toHaveClass(
      "optimized-image__container--error"
    );
  });
});
