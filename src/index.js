import "./pages/index.css";
import { initialCards } from "./cards.js";
import { setOpenPopup, setClosePopup } from "./scripts/modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, onDelete, setLike, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = `${cardData.name}`;
  cardElement.querySelector(".card__title").textContent = `${cardData.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => onDelete(cardElement));
  console.log(cardElement);

  setLike(cardElement);
  openPopupImage(cardElement);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, toggleLike, openPopupImage);
    cardsContainer.append(card);
  });
}

renderInitialCards();

//@todo: Находим кнопки + и Редактировать
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//@todo: Находим два попапа
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

//@todo: Событие открытия попапа
editButton.addEventListener("click", () => {
  setOpenPopup(popupEdit);
  setClosePopup(popupEdit);
});

addCardButton.addEventListener("click", () => {
  setOpenPopup(popupNewCard);
  setClosePopup(popupNewCard);
});

//@todo: Изменение информации о пользователе
const editProfileForm = document.forms["edit-profile"];
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

nameInput.value = userName.textContent;
jobInput.value = userDescription.textContent;

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  evt.target.closest(".popup").classList.remove("popup_is-opened");
}

editProfileForm.addEventListener("submit", handleEditFormSubmit);

//@todo: Добавление новой карточки
const addCardForm = document.forms["new-place"];
const placeName = addCardForm.elements["place-name"];
const placeLink = addCardForm.elements["link"];

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const card = createCard(
    { name: placeName.value, link: placeLink.value },
    deleteCard,
    toggleLike,
    openPopupImage
  );
  cardsContainer.prepend(card);

  addCardForm.reset();
  evt.target.closest(".popup").classList.remove("popup_is-opened");
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//@todo: Лайк карточки
function toggleLike(card) {
  card.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button")) {
      likeCard(evt.target);
    }
  });
}

function likeCard(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

//@todo: Попап с большой картинкой
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

function openPopupImage(card) {
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.addEventListener("click", () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;

    setOpenPopup(popupTypeImage);
    setClosePopup(popupTypeImage);
  });
}
