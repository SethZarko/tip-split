import { Link, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import { useAppContext } from '../context/AppProvider.jsx';

import axiosClientLogin from '../axiosClient.js';

export const Register = () => {
  const { navigateToLogin, setNavigateToLogin } = useAppContext();

  const [errors, setErrors] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClientLogin
      .post('http://localhost:8000/api/admin/create', payload)
      .then(({ data }) => {
        if (data) {
          emailRef.current.value = '';
          passwordRef.current.value = '';

          setNavigateToLogin(true);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  if (navigateToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <div className="go-pro-container">
      <h2>Benefits of Going Pro!</h2>
      <br />
      <ul>
        <li><i className="fa-solid fa-check"></i><p>Enjoy the Same Features of the Free Version +: </p></li>
        <li><i className="fa-solid fa-check"></i><p>Create Your Own Profile and Save Your Calculations!</p></li>
        <li><i className="fa-solid fa-check"></i><p>Calculate HST Payable</p></li>
        <li><i className="fa-solid fa-check"></i><p>Select Gratuity Option</p></li>
        <li><i className="fa-solid fa-check"></i><p>Calculate the Total Bill</p></li>
        <li><i className="fa-solid fa-check"></i><p>And Much More!!</p></li>
        
        <li><p></p></li>
        <li><p></p></li>
      </ul>
    </div>
      <form className="register-form" onSubmit={handleForm}>
        <h1 className="title">Register</h1>

        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <>
                <p key={key}>{errors[key][0]}</p>
              </>
            ))}
          </div>
        )}

        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button className="btn btn-block">Register</button>
        <p className="login-to-register-link">
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
      <Link to='/' className='free-btn-redicrect' onClick={window.scrollTo(0, 0)}>Stick With The Free Version</Link>
    </>
  );
};
