// @todo: Темплейт карточки

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(link, name, deleteFn) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = `${name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const deleteElement = deleteButton.closest(".card");

  deleteButton.addEventListener("click", () => deleteFn(deleteElement));

  cardsList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((item) => {
    createCard(item.link, item.name, deleteCard);
  });
}

renderCards();
