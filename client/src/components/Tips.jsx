import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

export const Tips = ({ values, errors, touched, handleBlur, handleChange }) => {
  const { token, tipFormData, setTipFormData } = useAppContext();
  const [customText, setCustomText] = useState(true);

  const handleTipFormChange = (e) => {
    const { value } = e.target;
    setTipFormData(value);
  };

  const handleTextRemoval = () => {
    setCustomText((prev) => !prev);
    setTipFormData(0)
  };

  let text = 'Custom';

  console.log(tipFormData);

  return (
    <section id="tip">
      {token ? (
        <></>
      ) : (
        <>
          <label className="radio-container" htmlFor="5%">
            <input
              id="5%"
              type="radio"
              name="5%"
              value="0.05"
              checked={tipFormData === '5%'}
              onChange={handleTipFormChange}
            />
            <span className="radio-custom">5%</span>
          </label>
          <label className="radio-container" htmlFor="10%">
            <input
              id="10%"
              type="radio"
              name="10%"
              value="0.10"
              checked={tipFormData === '10%'}
              onChange={handleTipFormChange}
            />
            <span className="radio-custom">10%</span>
          </label>
          <label className="radio-container" htmlFor="15%">
            <input
              id="15%"
              type="radio"
              name="15%"
              value="0.15"
              checked={tipFormData === '15%'}
              onChange={handleTipFormChange}
            />
            <span className="radio-custom">15%</span>
          </label>
          <label className="radio-container" htmlFor="25%">
            <input
              id="25%"
              type="radio"
              name="25%"
              value="0.25"
              checked={tipFormData === '25%'}
              onChange={handleTipFormChange}
            />
            <span className="radio-custom">25%</span>
          </label>
          <label className="radio-container" htmlFor="50%">
            <input
              id="50%"
              type="radio"
              name="50%"
              value="0.50"
              checked={tipFormData === '50%'}
              onChange={handleTipFormChange}
            />
            <span className="radio-custom">50%</span>
          </label>
          <label className="radio-container" htmlFor="custom">
            <input
              id="custom"
              className={!customText ? 'custom-show ' : ''}
              type="range"
              min="0"
              max="100"
              value={tipFormData}
              onChange={handleTipFormChange}
            />
            <span className="radio-custom custom" onClick={handleTextRemoval}>{customText ? text : `${tipFormData}%` }</span>
          </label>
        </>
      )}
    </section>
  );
};
