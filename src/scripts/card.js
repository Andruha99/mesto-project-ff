import { cardTemplate } from "../index.js";

// Функция создания карточки
export function createCard(cardData, onDelete, isLikeCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardElemntImage = cardElement.querySelector(".card__image");
  const cardElemntTitle = cardElement.querySelector(".card__title");

  cardElemntImage.src = cardData.link;
  cardElemntImage.alt = cardData.name;
  cardElemntTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => onDelete(cardElement));

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => isLikeCard(likeBtn));

  cardElemntImage.addEventListener("click", () =>
    openPopupImage(cardData.link, cardData.name)
  );

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(element) {
  element.remove();
}

//Лайк карточки

export function likeCard(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}
