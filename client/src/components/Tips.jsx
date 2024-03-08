import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

export const Tips = ({ 
  values, 
  errors, 
  touched, 
  handleBlur,
  handleChange 
  }) => {

  const { token, tipFormData, setTipFormData, handleTipClick, selectedTip } = useAppContext();

  const [customText, setCustomText] = useState(true);

  const handleTipFormChange = (e) => {
    const { value } = e.target;
    setTipFormData(value);
  };

  const handleTextRemoval = () => {
    setCustomText(false);
    setTipFormData(0)
  };

  const handleTextShow = () => {
    setCustomText(true);
  };

  let text = 'Custom';

  return (
    <section id="tip">
      {token ? (
        <>
        
        </>
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
              onClick={() => {
                handleTextShow(),
                handleTipClick('5')
              }}
              required
            />
            <span className={`radio-custom ${selectedTip === '5' ? 'active' : ''}`}>5%</span>
          </label>
          <label className="radio-container" htmlFor="10%">
            <input
              id="10%"
              type="radio"
              name="10%"
              value="0.10"
              checked={tipFormData === '10%'}
              onChange={handleTipFormChange}
              onClick={() => {
                handleTextShow(),
                handleTipClick('10')
              }}
              required
            />
            <span className={`radio-custom ${selectedTip === '10' ? 'active' : ''}`}>10%</span>
          </label>
          <label className="radio-container" htmlFor="15%">
            <input
              id="15%"
              type="radio"
              name="15%"
              value="0.15"
              checked={tipFormData === '15%'}
              onChange={handleTipFormChange}
              onClick={() => {
                handleTextShow(),
                handleTipClick('15')
              }}
              required
            />
            <span className={`radio-custom ${selectedTip === '15' ? 'active' : ''}`}>15%</span>
          </label>
          <label className="radio-container" htmlFor="25%">
            <input
              id="25%"
              type="radio"
              name="25%"
              value="0.25"
              checked={tipFormData === '25%'}
              onChange={handleTipFormChange}
              onClick={() => {
                handleTextShow(),
                handleTipClick('25')
              }}
              required
            />
            <span className={`radio-custom ${selectedTip === '25' ? 'active' : ''}`}>25%</span>
          </label>
          <label className="radio-container" htmlFor="50%">
            <input
              id="50%"
              type="radio"
              name="50%"
              value="0.50"
              checked={tipFormData === '50%'}
              onChange={handleTipFormChange}
              onClick={() => {
                handleTextShow(),
                handleTipClick('50')
              }}
              required
            />
            <span className={`radio-custom ${selectedTip === '50' ? 'active' : ''}`}>50%</span>
          </label>
          <label className="radio-container" htmlFor="custom">
            <input
              id="custom"
              className={!customText ? 'custom-show ' : ''}
              type="range"
              min="0.01"
              max="1"
              step="0.01"
              value={tipFormData}
              onChange={handleTipFormChange}
            />
            <span 
              className="radio-custom custom" 
              onClick={() => {
                handleTextRemoval(),
                handleTipClick('')
              }}>
                {customText ? text : `${Math.round(tipFormData * 100)}%` }
            </span>
          </label>
        </>
      )}
    </section>
  );
};