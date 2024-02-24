//Функция открытия попапа
export function setOpenPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

//Функция закрытия попапа
export function setClosePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupByEsc);
}

export function closePopUpByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    setClosePopup(evt.currentTarget);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    setClosePopup(document.querySelector(".popup_is-opened"));
  }
}
