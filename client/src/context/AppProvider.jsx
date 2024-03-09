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
  setUser: () => {},
  _setToken: () => {},
  setBillFormData: () => {},
  setTipFormData: () => {},
  setPeopleFormData: () => {},
  setFinalDisplayTip: () => {},
  setFinalDisplayTotal: () => {},
  setSelectedTip: () => {},
  setCustomText: () => {},
  setNavigateToLogin: () => {}
});

// Context Provider
export const AppProvider = ({ children }) => {

  // Context State
  const [user, setUser] = useState([]);
  const [token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'))


  const [billFormData, setBillFormData] = useState({ bill: '' });
  const [tipFormData, setTipFormData] = useState(0);
  const [peopleFormData, setPeopleFormData] = useState({ people: '' });

  const [finalDisplayTotal, setFinalDisplayTotal] = useState(0);
  const [finalDisplayTip, setFinalDisplayTip] = useState(0);
  const [selectedTip, setSelectedTip] = useState('');

  const [customText, setCustomText] = useState(true);

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

  useEffect(() => {
    calculateResult();
  }, [billFormData.bill, tipFormData, peopleFormData.people])

  const resetCalculatorState = () => {
    setBillFormData({ bill: ''})
    setTipFormData(0)
    setPeopleFormData({ people: '' })
    setFinalDisplayTip(0)
    setFinalDisplayTotal(0)
    setSelectedTip('')
    handleTextShow()
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
    setNavigateToLogin
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