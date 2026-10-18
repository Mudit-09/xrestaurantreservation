
import React from "react";

function SliderButtons({
  onPrevious,
  onNext,
  onPrev,
  previousDisabled = false,
  nextDisabled = false,
  prevDisabled,
}) {
  const handlePrevious = onPrevious || onPrev;
  const isPreviousDisabled = prevDisabled ?? previousDisabled;

  return (
    <div className="slider-buttons">
      <button
        type="button"
        className="slider-button"
        onClick={handlePrevious}
        disabled={isPreviousDisabled || !handlePrevious}
        aria-label="Previous dates"
      >
        &#8592;
      </button>

      <button
        type="button"
        className="slider-button"
        onClick={onNext}
        disabled={nextDisabled || !onNext}
        aria-label="Next dates"
      >
        &#8594;
      </button>
    </div>
  );
}

export default SliderButtons;
