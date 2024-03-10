import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';
import PropTypes from 'prop-types';

export const Bill = () => {
  const {
    token,
    billFormData,
    setBillFormData,
    cleanNumberInput,
    handleHSTClick,
    selectHST,
    HSTFormData,
    setHSTFormData,
    gratuityFormData,
    setGrauityFormData,
    handleGratuityClick,
    selectGratuity,
    setTipFormData,
    handleTipClick,
    setCustomText,
  } = useAppContext();

  const [errorState, setErrorState] = useState('');
  const [showErrorState, setShowErrorState] = useState(false);

  const handleBillFormChange = (e) => {
    const { name, value } = e.target;

    // Regular expression to match a number with up to two digits after the decimal place
    const numericRegex = /^\d*\.?\d{0,2}$/;

    // Check if the value matches the numeric pattern
    if (numericRegex.test(value)) {
      setBillFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setErrorState('Value must be numeric');
      setShowErrorState(true);
      setTimeout(() => {
        setShowErrorState(false);
        setErrorState('');
      }, 3000);
    }
  };

  const handleHSTFormChange = () => {
    if (HSTFormData === '0.13') {
      setHSTFormData('');
    } else {
      setHSTFormData('0.13');
    }
  };

  const handleGratuityFormChange = () => {
    if (gratuityFormData === '0.18') {
      setGrauityFormData('');
    } else {
      setGrauityFormData('0.18');
      setTipFormData(0);
      handleTipClick('');
      setCustomText(true);
    }
  };

  return (
    <section id="bill">
      {token ? (
        // Pro User
        <>
          <label htmlFor="bill">Bill</label>
          <input
            type="text"
            name="bill"
            id="bill"
            value={billFormData.bill}
            onChange={handleBillFormChange}
            maxLength="6"
            autoComplete="off"
          />
          <p className="cleaned-input">{cleanNumberInput(billFormData.bill)}</p>
          {showErrorState && <p className="basic-user-error">{errorState}</p>}
          <br />
          <div className="taxes-title-container">
            <h3>HST</h3>
            <h3>Gratuity</h3>
          </div>
          <div className="taxes-container">
            <label className="hst-container" htmlFor="hst">
              <input
                id="hst"
                type="radio"
                name="hst"
                value={HSTFormData}
                checked={HSTFormData === '13%'}
                onChange={handleHSTFormChange}
                onClick={() => {
                  handleHSTClick('hst');
                }}
              />
              <span className={`hst ${selectHST === 'hst' ? 'active' : ''}`}>
                13%
              </span>
            </label>
            <label className="hst-container" htmlFor="gratuity">
              <input
                id="gratuity"
                type="radio"
                name="gratuity"
                value={gratuityFormData}
                checked={gratuityFormData === '18%'}
                onChange={() => {
                  handleGratuityFormChange();
                }}
                onClick={() => {
                  handleGratuityClick('g');
                }}
              />
              <span className={`hst ${selectGratuity === 'g' ? 'active' : ''}`}>
                18%
              </span>
            </label>
          </div>
        </>
      ) : (
        // Basic User
        <>
          <label htmlFor="bill">Bill</label>
          <input
            type="text"
            name="bill"
            id="bill"
            value={billFormData.bill}
            onChange={handleBillFormChange}
            maxLength="6"
            autoComplete="off"
          />
          <p className="cleaned-input">{cleanNumberInput(billFormData.bill)}</p>
          {showErrorState && <p className="basic-user-error">{errorState}</p>}
        </>
      )}
    </section>
  );
};

// Prop Validation
Bill.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  successMessage: PropTypes.string,
  toggleSuccessMessage: PropTypes.bool,
  serverFormError: PropTypes.array,
};
