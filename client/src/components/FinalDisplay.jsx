import { useAppContext } from '../context/AppProvider';

export const FinalDisplay = ({ isSubmitting }) => {
  const { token } = useAppContext();

  return (
    <section id="final-display">
      {token ? (
        <>
          <input
            type="submit"
            value="Save Calculation"
            disabled={isSubmitting}
          />
        </>
      ) : (
        <>
          <div className="display-container">
            <div className="display-sub-container">

              <div className="display-row">

                <div className="display-row-text-container">
                  <p>Tip Amount</p>
                  <p>/ person</p>
             
                </div>
                <h3>$4.25</h3>
  

              </div>
              <br />
              <div className="display-row">

                <div className="display-row-text-container">
                  <p>Total</p>
                  <p>/ person</p>
                </div>

                <h3>$32.79</h3>

              </div>

            </div>
            <br />
            <button>RESET</button>
          </div>
        </>
      )}
    </section>
  );
};
