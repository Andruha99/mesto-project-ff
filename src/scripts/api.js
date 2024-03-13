//Интеграция с API
const tocken = "f168f72d-7e04-4570-b224-2f0c655e04c0";
const cohortId = "wff-cohort-9";
const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: tocken,
    "Content-Type": "application/json",
  },
};

//Получение даннах пользователя
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
};

//Получение карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
};

export const getUserAndCards = () => {
  return Promise.all([getUserInfo(), getCards()]);
};

//Обновление данных о пользователе
export const updateUserData = (newName, newDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription,
    }),
  });
};

//Добавление новой карточки
export const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    return res.json();
  });
};

//Удаление карточки
export const deleteCardFromApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

//Установить лайк
export const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
  // .then((data) => {
  //   console.log(data);
  // });
};

//Убрать лайк
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return res.json();
  });
  // .then((data) => {
  //   console.log(data);
  // });
};
