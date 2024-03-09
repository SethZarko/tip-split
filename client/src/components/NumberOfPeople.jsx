import { useState } from 'react';
import { useAppContext } from '../context/AppProvider';

export const NumberOfPeople = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  const { token, peopleFormData, setPeopleFormData, cleanNumberInput } =
    useAppContext();

  const [errorState, setErrorState] = useState('');
  const [showErrorState, setShowErrorState] = useState(false);

  const handlePeopleFormChange = (e) => {
    const { name, value } = e.target;

    // Regular expression to match an empty string or a whole number
    const numericRegex = /^$|^\d+$/;

    // Check if the value matches the numeric pattern
    if (numericRegex.test(value)) {
      // If the value is numeric or empty, update the state
      setPeopleFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // If the value does not match the numeric pattern, set an error state
      setErrorState('Value must be a whole number');
      setShowErrorState(true);
      setTimeout(() => {
        setShowErrorState(false);
        setErrorState('');
      }, 3000);
    }
  };

  return (
    <section id="number-of-people">
      {token ? (
        <>
          <label htmlFor="num-people">Number of People</label>
          <input
            type="text"
            name="people"
            id="number-of-people"
            value={peopleFormData.people}
            onChange={handlePeopleFormChange}
            maxLength="4"
            autoComplete="off"
          />
          <p className="cleaned-input">
            {cleanNumberInput(peopleFormData.people)}
          </p>
          <i className="fa-solid fa-user"></i>
          {showErrorState && <p className="basic-user-error">{errorState}</p>}
        </>
      ) : (
        <>
          <label htmlFor="num-people">Number of People</label>
          <input
            type="text"
            name="people"
            id="number-of-people"
            value={peopleFormData.people}
            onChange={handlePeopleFormChange}
            maxLength="4"
            autoComplete="off"
          />
          <p className="cleaned-input">
            {cleanNumberInput(peopleFormData.people)}
          </p>
          <i className="fa-solid fa-user"></i>
          {showErrorState && <p className="basic-user-error">{errorState}</p>}
        </>
      )}
    </section>
  );
};
