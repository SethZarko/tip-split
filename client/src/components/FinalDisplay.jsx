import { useAppContext } from '../context/AppProvider';

export const FinalDisplay = ({ isSubmitting }) => {
  const { token, finalDisplayTotal, finalDisplayTip, resetCalculatorState } = useAppContext();

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
                <h3>${finalDisplayTip}</h3>
  

              </div>
              <br />
              <div className="display-row">

                <div className="display-row-text-container">
                  <p>Total</p>
                  <p>/ person</p>
                </div>

                <h3>${finalDisplayTotal}</h3>

              </div>

            </div>
            <br />
            <button onClick={resetCalculatorState}>RESET</button>
          </div>
        </>
      )}
    </section>
  );
};
