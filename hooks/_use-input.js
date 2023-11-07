import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const stateReducerFn = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: true };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  return initialInputState;
};

const useInput = (validateEnteredValueFn) => {
  const [stateValue, dispatchFn] = useReducer(
    stateReducerFn,
    initialInputState
  );

  const valueIsValid = validateEnteredValueFn(stateValue.value);
  const inputIsInvalid = !valueIsValid && stateValue.isTouched;

  const valueChangeHandler = ({ target: { value } }) => {
    dispatchFn({ type: 'INPUT', value });
  };

  const inputBlurHandler = (event) => {
    dispatchFn({ type: 'BLUR' });
  };

  const reset = () => {
    dispatchFn({ type: 'RESET' });
  };

  return {
    value: stateValue.value,
    valueIsValid,
    inputIsInvalid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
