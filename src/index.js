import "./pages/index.css";
import {
  setOpenPopup,
  setClosePopup,
  closePopUpByOverlay,
} from "./scripts/modal.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { updateUserData, getUserAndCards, addNewCard } from "./scripts/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function renderInitialCards(userId, initialCards) {
  initialCards.forEach((item) => {
    const card = createCard(userId, item, deleteCard, likeCard, openPopupImage);
    cardsContainer.append(card);
  });
}

//Изменение информации о пользователе
const editProfileForm = document.forms["edit-profile"];
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");
const userImage = document.querySelector(".profile__image");
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;
  updateUserData(nameInput.value, jobInput.value)
    .then(() => {
      userName.textContent = nameInput.value;
      userDescription.textContent = jobInput.value;
      setClosePopup(evt.target.closest(".popup"));
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

editProfileForm.addEventListener("submit", handleEditFormSubmit);

//Находим кнопки + и Редактировать
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//Находим два попапа
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

function initClosePopupByBtn(evt) {
  setClosePopup(evt.target.closest(".popup"));
}

popupEdit.addEventListener("click", closePopUpByOverlay);
popupEdit
  .querySelector(".popup__close")
  .addEventListener("click", initClosePopupByBtn);
popupNewCard.addEventListener("click", closePopUpByOverlay);
popupNewCard
  .querySelector(".popup__close")
  .addEventListener("click", initClosePopupByBtn);

//Событие открытия попапа
editButton.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  setOpenPopup(popupEdit);
});

addCardButton.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  setOpenPopup(popupNewCard);
});

//Добавление новой карточки
const addCardForm = document.forms["new-place"];
const placeName = addCardForm.elements["place-name"];
const placeLink = addCardForm.elements["link"];

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  // const card = createCard(
  //   { name: placeName.value, link: placeLink.value },
  //   deleteCard,
  //   likeCard,
  //   openPopupImage
  // );
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  addNewCard(placeName.value, placeLink.value)
    .then((data) => {
      // const card = createCard(
      //   { name: placeName.value, link: placeLink.value },
      //   deleteCard,
      //   likeCard,
      //   openPopupImage
      // );
      const card = createCard(
        data.owner._id,
        data,
        deleteCard,
        likeCard,
        openPopupImage
      );

      cardsContainer.prepend(card);
      addCardForm.reset();

      setClosePopup(evt.target.closest(".popup"));
    })
    .finally(() => {
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
  // cardsContainer.prepend(card);

  // addCardForm.reset();

  // setClosePopup(evt.target.closest(".popup"));
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Попап с большой картинкой
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

popupTypeImage.addEventListener("click", closePopUpByOverlay);
popupTypeImage
  .querySelector(".popup__close")
  .addEventListener("click", initClosePopupByBtn);

function openPopupImage(cardImage, cardTitle) {
  popupImage.src = cardImage;
  popupImage.alt = cardTitle;
  popupCaption.textContent = cardTitle;

  setOpenPopup(popupTypeImage);
}

enableValidation(validationConfig);

const setUserInfo = (data) => {
  userName.textContent = data.name;
  userDescription.textContent = data.about;
  userImage.style = `background-image: url(${data.avatar})`;
};

getUserAndCards().then(([user, cards]) => {
  renderInitialCards(user._id, cards);
  setUserInfo(user);
});
