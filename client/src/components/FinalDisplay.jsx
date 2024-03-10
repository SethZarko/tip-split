import { useAppContext } from '../context/AppProvider';

export const FinalDisplay = () => {
  const { token, finalDisplayTotal, finalDisplayTip, resetCalculatorState, handleSaveCalculation, finalTotalBill, HST } =
    useAppContext();

  return (
    <section id="final-display">
      {token ? (
        <>
          <div className="display-container-pro">
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
              <br />
              <div className="display-row">
                <div className="display-row-text-container">
                  <p>HST</p>
                </div>

                <h3>${HST}</h3>
              </div>
              <br />
              <div className="display-row">
                <div className="display-row-text-container">
                  <p>Total Bill</p>
                </div>

                <h3 className='total-bill'>${finalTotalBill}</h3>
              </div>

            </div>

            <br />

            <button onClick={resetCalculatorState}>RESET</button>
            <br />
            <button onClick={handleSaveCalculation} style={{ color: 'white' }}>Save Calculation</button>
          </div>
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
