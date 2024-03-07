import { useAppContext } from '../context/AppProvider';
import PropTypes from 'prop-types';

export const Bill = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange
}) => {
  const { token, billFormData, setBillFormData } = useAppContext();

  const cleanNumberInput = (numberString) => {
    // Remove any existing commas from the input
    numberString = numberString.replace(/,/g, '');

    // Remove any non-numeric characters except the decimal point
    numberString = numberString.replace(/[^\d.]+/g, '');

    // Ensure that the number is not negative
    if (parseFloat(numberString) < 0) {
      numberString = '';
    }

    // Split the number into integer and decimal parts
    const parts = numberString.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';

    // Remove any extra decimal points after the first one
    decimalPart = decimalPart.replace(/\./g, '');

    // Add commas to the integer part
    let formattedInteger = '';
    for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
      if (j % 3 === 0 && j !== 0) {
        formattedInteger = ',' + formattedInteger;
      }
      formattedInteger = integerPart.charAt(i) + formattedInteger;
    }

    // Combine the integer and decimal parts
    let formattedNumber = formattedInteger;
    if (decimalPart) {
      formattedNumber += '.' + decimalPart;
    }

    return formattedNumber;
  };

  const handleBillFormChange = (e) => {
    const { name, value } = e.target;
    setBillFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            maxLength="10"
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
            maxLength="10"
          />
        <p className='cleaned-input'>{cleanNumberInput(billFormData.bill)}</p>
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