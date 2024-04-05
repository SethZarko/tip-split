import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';

import { axiosClientLogin } from '../axiosClient.js';

export const UserProfile = () => {
  const { token, formatNumberWithCommas } = useAppContext();

  const [savedFormData, setSavedFormData] = useState([]);
  const [deletedMessage, setDeletedMessage] = useState({});

  useEffect(() => {
    if (token !== null) {
      axiosClientLogin
        .get('https://tip-split.onrender.com/api/calc/all')
        .then((response) => {
          const data = response.data;
          setSavedFormData(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        })
        .catch((error) => {
          console.error('Error fetching saved data:', error);
        });
    }
  }, [token]);

  const handleDeleteCalculation = (id) => {
    axiosClientLogin
      .delete(`https://tip-split.onrender.com/api/calc/${id}`)
      .then((response) => {
        const deletedCalcID = savedFormData.filter((elem) => elem._id !== id);
        setSavedFormData(deletedCalcID);
        setDeletedMessage(response.data);
        setTimeout(() => {
          setDeletedMessage({});
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <section id="user-profile">
      <h3>Saved Calculations</h3>
      <div className="user-profile-return-home-btn-container">
        <Link to="/pro/home">Return Home</Link>
      </div>
      <br />
      {savedFormData.length === 0 && <h3 className='no-saved-calculations'>No Saved Calculations</h3>}
      {Object.keys(deletedMessage).map((id) => (
        <h2 key={id} className="deleted-message">
          {deletedMessage[id]}
        </h2>
      ))}
      {savedFormData.map((elem) => (
        <div key={elem._id} className="saved-calculation-container">
          <div className="date-delete-btn-container">
            <h2>
              Date:{' '}
              {new Date(elem.createdAt).toLocaleDateString('en-US', options)}
            </h2>
            <i
              className="fa-solid fa-trash"
              onClick={() => {
                handleDeleteCalculation(elem._id),
                window.scrollTo(0, 0);
              }}
            ></i>
          </div>

          <div className="bill-container">
            <div className="bill-sub-container">
              <h4>Pre-Bill:</h4>
              <p>${formatNumberWithCommas(elem.bill)}</p>
            </div>

            <div className="bill-sub-container">
              <h4>Tip:</h4>
              <p>{elem.tipFormData * 100}%</p>
            </div>

            <div className="bill-sub-container">
              <h4>Gratuity:</h4>
              <p>
                {elem.gratuityFormData == 0
                  ? 'NONE'
                  : elem.gratuityFormData * 100 + '%'}
              </p>
            </div>

            <div className="bill-sub-container">
              <h4>HST:</h4>
              <p>{elem.HST == 0 ? 'NONE' : '$'+elem.HST}</p>
            </div>
          </div>

          <div className="bill-people-container">
            <div className="bill-people-sub-container">
              <div className="bill-sub-container">
                <h4>People At Table:</h4>
                <p>{elem.people}</p>
              </div>

              <div className="bill-sub-container">
                <h4>Tip Per Person:</h4>
                <p>${elem.finalDisplayTip}</p>
              </div>

              <div className="bill-sub-container">
                <h4>Bill Per Person:</h4>
                <p>${elem.finalDisplayTotal}</p>
              </div>
            </div>

            <div className="total-bill-container">
              <h4>Total Bill:</h4>
              <p>${elem.finalTotalBill}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};