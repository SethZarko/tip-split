import { useState } from 'react'
import { useAppContext } from '../context/AppProvider';
import PropTypes from 'prop-types';

export const Bill = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}) => {
  const { token, billFormData, setBillFormData, cleanNumberInput } = useAppContext();

  const [errorState, setErrorState] = useState('')
  const [showErrorState, setShowErrorState] = useState(false)

  const handleBillFormChange = (e) => {
    const { name, value } = e.target;
  
    // Regular expression to match a number with up to two digits after the decimal place
    const numericRegex = /^\d*\.?\d{0,2}$/;
  
    // Check if the value matches the numeric pattern
    if (numericRegex.test(value)) {
      // If the value is numeric, update the state
      setBillFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // If the value does not match the numeric pattern, set an error state
      setErrorState('Value must be numeric');
      setShowErrorState(true)
      setTimeout(() => {
        setShowErrorState(false)
        setErrorState('');
      }, 3000)
    }
  };

  return (
    <section id="bill">
      {token ? (
        <>
          {errors.bill && touched.bill && (
            <p className="error-message">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.bill}
            </p>
          )}
          <label htmlFor="bill">Bill</label>
          <input
            className={errors.bill && touched.bill ? 'input-error' : ''}
            type="text"
            name="bill"
            id="bill"
            value={values.bill}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength="6"
            autoComplete="off"
          />
        </>
      ) : (
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
        <p className='cleaned-input'>{cleanNumberInput(billFormData.bill)}</p>
        {showErrorState && <p className='basic-user-error'>{errorState}</p>}
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