// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = `${cardData.name}`;
  cardElement.querySelector(".card__title").textContent = `${cardData.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => onDelete(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
function renderInitialCards() {
  initialCards.forEach((item) => {
    const card = createCard(item, deleteCard);
    cardsContainer.append(card);
  });
}

renderInitialCards();
