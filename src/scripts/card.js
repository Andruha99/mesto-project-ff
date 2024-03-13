import { cardTemplate } from "../index.js";
import { deleteCardFromApi, deleteLike, setLike } from "./api.js";

// Функция создания карточки
export function createCard(
  userId,
  cardData,
  onDelete,
  isLikeCard,
  openPopupImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardElemntImage = cardElement.querySelector(".card__image");
  const cardElemntTitle = cardElement.querySelector(".card__title");
  const cardElemntLikes = cardElement.querySelector(".card__like-number");

  cardElemntImage.src = cardData.link;
  cardElemntImage.alt = cardData.name;
  cardElemntTitle.textContent = cardData.name;
  cardElemntLikes.textContent = cardData.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () =>
      onDelete(cardElement, cardData._id)
    );
  } else {
    deleteButton.remove();
  }

  const likeBtn = cardElement.querySelector(".card__like-button");

  cardData.likes.forEach((userLike) => {
    if (userLike._id === userId) {
      likeBtn.classList.add("card__like-button_is-active");
    }
  });
  likeBtn.addEventListener("click", () =>
    isLikeCard(likeBtn, cardData._id, cardElemntLikes)
  );

  cardElemntImage.addEventListener("click", () =>
    openPopupImage(cardData.link, cardData.name)
  );

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(element, cardId) {
  deleteCardFromApi(cardId)
    .then(() => {
      element.remove();
    })
    .catch((err) => {
      console.log(`Произошла ошибка, попробуйте позже: ${err}`);
    });
}

//Лайк карточки
export function likeCard(likeBtn, cardId, cardLikes) {
  if (likeBtn.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((data) => {
        likeBtn.classList.remove("card__like-button_is-active");
        cardLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(`Произошла ошибка, попробуйте позже: ${err}`);
      });
  } else {
    setLike(cardId)
      .then((data) => {
        likeBtn.classList.add("card__like-button_is-active");
        cardLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(`Произошла ошибка, попробуйте позже: ${err}`);
      });
  }
}
