//Функция открытия попапа
export function setOpenPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", (evt) => closePopupByEsc(evt, popup));
}

//Функция закрытия попапа
export function setClosePopup(popup) {
  closePopupByBtn(popup);

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });

  document.removeEventListener("keydown", (evt) => closePopupByEsc(evt, popup));
}

function closePopupByBtn(popup) {
  const closePopupBtn = popup.querySelector(".popup__close");

  closePopupBtn.addEventListener("click", () => {
    popup.classList.remove("popup_is-opened");
  });
}

function closePopupByEsc(evt, popup) {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_is-opened");
  }
}
