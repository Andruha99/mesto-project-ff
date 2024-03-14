(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function n(e){e.target===e.currentTarget&&t(e.currentTarget)}function r(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://nomoreparties.co/v1/".concat("wff-cohort-9"),headers:{authorization:"f168f72d-7e04-4570-b224-2f0c655e04c0","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},a=document.querySelector("#card-template").content;function i(e,t,n,r,o){var c=a.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__title"),l=c.querySelector(".card__like-number");i.src=t.link,i.alt=t.name,u.textContent=t.name,l.textContent=t.likes.length;var s=c.querySelector(".card__delete-button");e===t.owner._id?s.addEventListener("click",(function(){return n(c,t._id)})):s.remove();var d=c.querySelector(".card__like-button");return t.likes.forEach((function(t){t._id===e&&d.classList.add("card__like-button_is-active")})),d.addEventListener("click",(function(){return r(d,t._id,l)})),i.addEventListener("click",(function(){return o(t.link,t.name)})),c}function u(e,t){(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then(c)})(t).then((function(){e.remove()})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))}))}function l(e,t,n){e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)}(t).then((function(t){e.classList.remove("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)}(t).then((function(t){e.classList.add("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))}))}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("".concat(n.inputErrorClass)),r.textContent="",r.classList.remove("".concat(n.errorClass))},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("".concat(n.inactiveButtonClass)),t.disabled=!1):(t.classList.add("".concat(n.inactiveButtonClass)),t.disabled=!0)},p=function(e,t){var n=Array.from(e.querySelectorAll("".concat(t.inputSelector))),r=e.querySelector("".concat(t.submitButtonSelector));d(n,r,t),n.forEach((function(n){s(e,n,t)}))};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=document.querySelector(".places__list"),_=document.forms["edit-profile"],y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),S=_.elements.name,g=_.elements.description;_.addEventListener("submit",(function(e){e.preventDefault();var n,r,a=e.target.querySelector(".popup__button");a.textContent="Сохранение...",a.disabled=!0,(n=S.value,r=g.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then(c)).then((function(){y.textContent=S.value,h.textContent=g.value,t(e.target.closest(".popup"))})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))})).finally((function(){a.textContent="Сохранить",a.disabled=!1}))}));var k=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_new-card");function L(e){t(e.target.closest(".popup"))}q.addEventListener("click",n),q.querySelector(".popup__close").addEventListener("click",L),C.addEventListener("click",n),C.querySelector(".popup__close").addEventListener("click",L),k.addEventListener("click",(function(){S.value=y.textContent,g.value=h.textContent,p(q,v),e(q)})),E.addEventListener("click",(function(){p(C,v),e(C)}));var x=document.forms["new-place"],A=x.elements["place-name"],w=x.elements.link;x.addEventListener("submit",(function(e){e.preventDefault();var n,r,a=e.target.querySelector(".popup__button");a.textContent="Сохранение...",a.disabled=!0,(n=A.value,r=w.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then(c)).then((function(n){var r=i(n.owner._id,n,u,l,O);m.prepend(r),x.reset(),t(e.target.closest(".popup"))})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))})).finally((function(){a.textContent="Сохранить",a.disabled=!1}))}));var U=document.querySelector(".popup_type_image"),T=U.querySelector(".popup__image"),j=U.querySelector(".popup__caption");function O(t,n){T.src=t,T.alt=n,j.textContent=n,e(U)}U.addEventListener("click",n),U.querySelector(".popup__close").addEventListener("click",L),function(e){Array.from(document.querySelectorAll("".concat(e.formSelector))).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll("".concat(t.inputSelector))),r=e.querySelector("".concat(t.submitButtonSelector));d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("".concat(r.inputErrorClass)),o.textContent=n,o.classList.add("".concat(r.errorClass))}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(v),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(c),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c)]).then((function(e){var t,n,r,o,c=(o=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(r,o)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],s=c[1];t=a._id,s.forEach((function(e){var n=i(t,e,u,l,O);m.append(n)})),n=a,y.textContent=n.name,h.textContent=n.about,b.style="background-image: url(".concat(n.avatar,")")})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))}));var B=document.querySelector(".popup_type_change-avatar"),P=document.forms["change-avatar"],D=P.elements["place-avatar-url"];b.addEventListener("click",(function(){p(B,v),e(B)})),B.addEventListener("click",n),B.querySelector(".popup__close").addEventListener("click",L),P.addEventListener("submit",(function(e){e.preventDefault();var n,r=e.target.querySelector(".popup__button");r.textContent="Сохранение...",r.disabled=!0,(n=D.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then(c)).then((function(){b.style="background-image: url(".concat(D.value,")"),P.reset(),t(e.target.closest(".popup"))})).catch((function(e){console.log("Произошла ошибка, попробуйте позже: ".concat(e))})).finally((function(){r.textContent="Сохранить",r.disabled=!1}))}))})();