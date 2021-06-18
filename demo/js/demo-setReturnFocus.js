const { useState } = require('react');
const React = require('react');
const ReactDOM = require('react-dom');
const FocusTrap = require('../../dist/focus-trap-react');

const container = document.getElementById('demo-setReturnFocus');

const focusTrapOptions = {
  setReturnFocus: '#AlternateReturnFocusElement',
};

const DemoSetReturnFocusDialog = () => {
  const [isTrapActive, setIsTrapActive] = useState(false);

  return (
    <>
      <div>
        <p>
          <button
            onClick={() => setIsTrapActive(true)}
            aria-describedby="setReturnFocus-heading"
          >
            activate trap
          </button>
          <button id="AlternateReturnFocusElement" onClick={() => {}}>
            Alternate Return Focus Element
          </button>
        </p>
      </div>

      {isTrapActive && (
        <FocusTrap focusTrapOptions={focusTrapOptions}>
          <div className="trap">
            <p>
              Here is a focus trap <a href="#">with</a> <a href="#">some</a>{' '}
              <a href="#">focusable</a> parts.
            </p>
            <p>
              <button
                onClick={() => setIsTrapActive(false)}
                aria-describedby="setReturnFocus-heading"
              >
                deactivate trap
              </button>
            </p>
          </div>
        </FocusTrap>
      )}
    </>
  );
};

ReactDOM.render(<DemoSetReturnFocusDialog />, container);
