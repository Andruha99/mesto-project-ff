//Проверка валидности полей ввода

//Показ ошибки
export const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${validationConfig.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${validationConfig.errorClass}`);
};

//Убрать ошибку
export const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`);
  errorElement.textContent = "";
  errorElement.classList.remove(`${validationConfig.errorClass}`);
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, butttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    butttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
    butttonElement.disabled = true;
  } else {
    butttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`);
    butttonElement.disabled = false;
  }
};

const seEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${validationConfig.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    `${validationConfig.submitButtonSelector}`
  );
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const popupList = Array.from(
    document.querySelectorAll(`${validationConfig.formSelector}`)
  );

  popupList.forEach((formElement) => {
    seEventListeners(formElement, validationConfig);
  });
};

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${validationConfig.inputSelector}`)
  );

  const buttonElement = formElement.querySelector(
    `${validationConfig.submitButtonSelector}`
  );
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
};
