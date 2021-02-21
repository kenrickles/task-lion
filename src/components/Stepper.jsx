import React, { useState, useEffect } from 'react';
import './Stepper.scss';
import PropTypes from 'prop-types';

export default function Stepper({
  steps, direction, currentStep = 1, sendCurrentStep,
}) {
  const [stepState, setStepState] = useState([]);
  useEffect(() => {
    const createSteps = steps.map((step, index) => ({
      description: step,
      completed: index < currentStep - 1, // past are completed
      selected: index <= currentStep - 1, // past & present are colored
      highlighted: index === currentStep - 1, // only present is highlighted
    }));

    setStepState(createSteps);
    console.log(currentStep);
  }, [steps, currentStep]);

  return (
    <div className={`stepper-wrapper-${direction}`}>
      {stepState.map(
        ({
          selected, completed, highlighted, description,
        }, index) => (
          <div className="step-wrapper" key={index}>
            <div
              className={`step-number step-number-${
                selected ? 'active' : 'disabled'
              }`}
            >
              {completed ? '✔' : index + 1}
            </div>
            <div
              className={`step-description ${
                highlighted ? 'step-description-active' : ''
              }`}
            >
              {description}
            </div>
            {index + 1 !== stepState.length && (
            <div
              className={`divider-line divider-line-${stepState.length}`}
            />
            )}
          </div>
        ),
      )}
    </div>
  );
}
Stepper.propTypes = {
  direction: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
};
