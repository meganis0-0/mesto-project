let currentOpenPopup = null;

/**
 * Function for open popup
 * @param {popup} popup - popup
 */
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  currentOpenPopup = popup;
  document.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClose);
}

/**
 * Function for close popup
 * @param {popup} popup - popup
 */
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  currentOpenPopup = null;
  document.removeEventListener('keydown', handleEscClose);
  popup.removeEventListener('mousedown', handleOverlayClose);
}

/**
 * Function for close popup by ESC
 * @param {Event} evt 
 */
function handleEscClose(evt) {
  if (evt.key === 'Escape' && currentOpenPopup) {
    closeModal(currentOpenPopup);
  }
}

/**
 * Function for close popup by overlay click
 * @param {Event} evt 
 */
function handleOverlayClose(evt) {
  if (
    evt.target === evt.currentTarget &&
    currentOpenPopup &&
    !evt.target.closest('.popup__content')
  ) {
    closeModal(currentOpenPopup);
  }
}

export { openModal, closeModal }