import { cardTemplate } from "../index.js";

// Функция создания карточки
export function createCard(cardData, onDelete, setLike, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = `${cardData.name}`;
  cardElement.querySelector(".card__title").textContent = `${cardData.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => onDelete(cardElement));

  setLike(cardElement);
  openPopupImage(cardElement);

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(element) {
  element.remove();
}

//Лайк карточки
export function toggleLike(card) {
  card.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button")) {
      likeCard(evt.target);
    }
  });
}

function likeCard(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}
