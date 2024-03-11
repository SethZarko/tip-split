// Imports
import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AppContext = createContext({
  user: null,
  token: null,
  billFormData: null,
  tipFormData: null,
  peopleFormData: null,
  finalDisplayTip: null,
  finalDisplayTotal: null,
  selectedTip: null,
  customText: null,
  navigateToLogin: null,
  selectHST: null,
  HSTFormData: null,
  gratuityFormData: null,
  selectGratuity: null,
  finalTotalBill: null,
  HST: null,
  successMessage: null,
  setUser: () => {},
  _setToken: () => {},
  setBillFormData: () => {},
  setTipFormData: () => {},
  setPeopleFormData: () => {},
  setFinalDisplayTip: () => {},
  setFinalDisplayTotal: () => {},
  setSelectedTip: () => {},
  setCustomText: () => {},
  setNavigateToLogin: () => {},
  setSelectHST: () => {},
  setHSTFormData: () => {},
  setGrauityFormData: () => {},
  setSelectGratuity: () => {},
  setFinalTotalBill: () => {},
  setHST: () => {},
  setSuccessMessage: () => {}
});

// Context Provider
export const AppProvider = ({ children }) => {

  // Context State
  const [user, setUser] = useState([]);
  const [token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'))


  const [billFormData, setBillFormData] = useState({ bill: '' });
  const [tipFormData, setTipFormData] = useState(0);
  const [peopleFormData, setPeopleFormData] = useState({ people: '' });
  const [HSTFormData, setHSTFormData] = useState('');
  const [gratuityFormData, setGrauityFormData] = useState('')

  const [selectedTip, setSelectedTip] = useState('');
  const [selectHST, setSelectedHST] = useState('');
  const [selectGratuity, setSelectGratuity] = useState('')

  const [customText, setCustomText] = useState(true);

  const [finalDisplayTotal, setFinalDisplayTotal] = useState(0);
  const [finalDisplayTip, setFinalDisplayTip] = useState(0);
  const [finalTotalBill, setFinalTotalBill] = useState(0);
  const [HST, setHST] = useState(0)

  const [successMessage, setSuccessMessage] = useState(null)

  const [navigateToLogin, setNavigateToLogin] = useState(false);

  // Context Methods
  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const handleTextShow = () => {
    setCustomText(true);
  };

  const handleTextRemoval = () => {
    setCustomText(false);
    setTipFormData(0)
  };

  const handleTipClick = (category) => {
    setSelectedTip(category);
  };

  const handleHSTClick = (category) => {
    setSelectedHST(category);
    if(selectHST === 'hst') {
      setSelectedHST('')
    }
  };

  const handleGratuityClick = (category) => {
    setSelectGratuity(category);
    if(selectGratuity === 'g') {
      setSelectGratuity('')
    }
  };

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

  const formatNumberWithCommas = (number) => {
    // Convert number to string
    let numberString = number.toString();
  
    // Split the number into integer and decimal parts
    let parts = numberString.split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1] || '';
  
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

  const calculateResult = () => {
    let bill = parseFloat(billFormData.bill);
    let tipPercent = tipFormData;
    let tip = bill * tipPercent;
    let numOfPeople = parseFloat(peopleFormData.people)

    let totalTipPerPerson = tip / numOfPeople;
    let roundedTotalTip = Math.round(totalTipPerPerson * 100) / 100
    let convertedStringTotalTip = formatNumberWithCommas(roundedTotalTip)

    if(totalTipPerPerson > 0) {
        setFinalDisplayTip(convertedStringTotalTip)
    }

    let overallTotalPerPerson = (bill + tip) / numOfPeople 
    let roundedOverallTotal = Math.round(overallTotalPerPerson * 100) / 100
    let convertedOveralTotal = formatNumberWithCommas(roundedOverallTotal)

    if(overallTotalPerPerson > 0) {
        setFinalDisplayTotal(convertedOveralTotal)
    }
  };

  const calculateResultPro = () => {
    // Set Data from Form
    let bill = parseFloat(billFormData.bill);
    let tipPercent = tipFormData;
    let hst = parseFloat(HSTFormData);
    if(isNaN(hst)) {
      hst = 0;
    }
    let gratuity = parseFloat(gratuityFormData)
    if(isNaN(gratuity)) {
      gratuity = 0;
    }
    let numOfPeople = parseFloat(peopleFormData.people)

    // Calculate and round tip/Gratuity and HST
    let tip = bill * tipPercent;
    let hstOnBill = bill * hst;
    if(isNaN(hstOnBill)){
      hstOnBill = 0
    }
    let roundedHST = Math.round(hstOnBill * 100) / 100
    setHST(formatNumberWithCommas(roundedHST))

    if(gratuity) {
      tipPercent = 0.18
      tip = (bill + hstOnBill) * tipPercent
    }

    // Calculate/Round and Display total tip per person
    let totalTipPerPerson = tip / numOfPeople;
    let roundedTotalTip = Math.round(totalTipPerPerson * 100) / 100
    let convertedStringTotalTip = formatNumberWithCommas(roundedTotalTip)

    if(totalTipPerPerson > 0) {
      setFinalDisplayTip(convertedStringTotalTip)
    }

    // Calculate/Round and Display total bill per person
    let overallTotalPerPerson = (bill + hstOnBill + tip) / numOfPeople 
    let roundedOverallTotal = Math.round(overallTotalPerPerson * 100) / 100
    let convertedOveralTotal = formatNumberWithCommas(roundedOverallTotal)

    if(overallTotalPerPerson > 0) {
        setFinalDisplayTotal(convertedOveralTotal)
    }
    
    // Calculate and Display total bill
    let totalBill = bill + hstOnBill + tip;
    let roundedTotalBill = Math.round(totalBill * 100) / 100
    if(isNaN(roundedTotalBill)) {
      roundedTotalBill = 0;
    }
    setFinalTotalBill(formatNumberWithCommas(roundedTotalBill))
  };

  useEffect(() => {
    if(token) {
      calculateResultPro();
    } else {
      calculateResult();
    }
  }, [billFormData.bill, tipFormData, peopleFormData.people, HSTFormData, gratuityFormData])

  const resetCalculatorState = () => {
    setBillFormData({ bill: ''})
    setTipFormData(0)
    setPeopleFormData({ people: '' })
    setHSTFormData('')
    setGrauityFormData('')
    setFinalDisplayTip(0)
    setFinalDisplayTotal(0)
    setSelectedTip('')
    handleHSTClick('')
    handleGratuityClick('')
    handleTextShow()
  }

  let bill = billFormData.bill
  let people = peopleFormData.people

  const handleSaveCalculation = async (e) => {
    e.preventDefault()

    await fetch('https://tip-split.onrender.com/api/calc/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        bill,
        tipFormData,
        gratuityFormData,
        people,
        HST,
        finalDisplayTip,
        finalDisplayTotal,
        finalTotalBill
      })
    }).then(() => {
      resetCalculatorState()
      setSuccessMessage('Calculation Saved!');
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }).catch((error) => {
      console.error(error)
    })
  }

  // Context Object
  const contextValue = {
    user,
    token,
    billFormData,
    tipFormData,
    peopleFormData,
    finalDisplayTotal,
    finalDisplayTip,
    selectedTip,
    customText,
    navigateToLogin,
    selectHST,
    HSTFormData,
    gratuityFormData,
    selectGratuity,
    finalTotalBill,
    HST,
    successMessage,
    setUser,
    setToken,
    setBillFormData,
    setTipFormData,
    setPeopleFormData,
    cleanNumberInput,
    setFinalDisplayTotal,
    setFinalDisplayTip,
    resetCalculatorState,
    handleTipClick,
    handleTextShow,
    handleTextRemoval,
    setNavigateToLogin,
    handleHSTClick,
    setHSTFormData,
    handleSaveCalculation,
    setGrauityFormData,
    setSelectGratuity,
    handleGratuityClick,
    setCustomText,
    formatNumberWithCommas
  };

  // Return Context
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Export Context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Prop Validation
AppProvider.propTypes = {
  children: PropTypes.node,
};