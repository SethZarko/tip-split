import { useAppContext } from '../context/AppProvider';
import { useState } from 'react';
import { useFormik } from 'formik';
import { formSchema } from '../Yup/index.js';

let initialValues = {
  bill: '',
  tip: '',
  numberOfPeople: '',
};

// Components
import { Bill } from '../components/Bill.jsx';
import { Tips } from '../components/Tips.jsx';
import { NumberOfPeople } from '../components/NumberOfPeople.jsx';
import { FinalDisplay } from '../components/FinalDisplay.jsx';

export const Home = () => {
  const { token } = useAppContext();

  // ProUserForm
  const [proFormState, setProFormState] = useState(initialValues);
  const [successMessage, setSuccessMessage] = useState('');
  const [toggleSuccessMessage, setToggleSuccessMessage] = useState(false);
  const [serverFormError, setServerFormError] = useState([]);

  const handleForm = (values, actions) => {
    fetch('http://localhost:8000/api/calculations/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors && data.errors.length > 0) {
          setServerFormError(data.errors);
        } else {
          setSuccessMessage('Message Sent Successfully');
          setToggleSuccessMessage(true);

          setTimeout(() => {
            setToggleSuccessMessage(false);
          }, 5000);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        actions.resetForm();
      });
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: proFormState,
    validationSchema: formSchema,
    onSubmit: (values, actions) => handleForm(values, actions),
  });

  const props = {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    successMessage,
    toggleSuccessMessage,
    serverFormError,
  };

  return (
    <section id="home">
      {token ? (
        <>
          {serverFormError.map((errors, index) => {
            return (
              <p key={index} className="error-message server-form-errors">
                {errors.msg}
              </p>
            );
          })}
          {toggleSuccessMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <Bill {...props} />
            <Tips {...props} />
            <NumberOfPeople {...props} />
            <FinalDisplay  {...props}/>
          </form>
        </>
      ) : (
        <>
        <div className="desktop-container">
          <div className="desktop-sub-container">
            <Bill />
            <Tips />
            <NumberOfPeople />
          </div>
          <FinalDisplay />
        </div>
        
        </>
      )}
    </section>
  );
};