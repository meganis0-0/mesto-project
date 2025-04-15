import './index.css';
import {
  popupList,
  profilePopup,
  cardPopup,
  imagePopup,
  cardContainer,
  profileName,
  profileDescription,
  profileEditButton,
  profileEditCloseButton,
  profileAddButton,
  profileAddButtonClose,
  cardForm,
  imagePopupCloseButton,
  validationSettings,
} from '../utils/constants.js'

import { baseurl, authToken } from '../utils/apiconfig.js';

import { initialCards } from '../scripts/cards.js';
import { enableValidation } from '../components/validation.js';
import { createCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

// Events for edit profile
profileEditButton.addEventListener('click', () => {
  openModal(profilePopup);
  profilePopup.querySelector('.popup__input_type_name').value = profileName.textContent;
  profilePopup.querySelector('.popup__input_type_description').value = profileDescription.textContent;
});

profileEditCloseButton.addEventListener('click', () => closeModal(profilePopup));

// Events for adding new card
profileAddButton.addEventListener('click', () => {
  cardForm.reset();
  openModal(cardPopup);
});

profileAddButtonClose.addEventListener('click', () => closeModal(cardPopup));

/**
 * Function for submiting a new card
 * @param {Event} evt - Event
 */
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardName = cardForm.querySelector('.popup__input_type_card-name').value;
  const newCardLink = cardForm.querySelector('.popup__input_type_url').value;
  
  const newCard = { name: newCardName, link: newCardLink };
  const card = createCard(newCard, handleImageClick);

  cardContainer.prepend(card);
  closeModal(cardPopup);
}

cardForm.addEventListener('submit', handleCardFormSubmit);

/**
 * Function for submiting an edited profile
 * @param {Event} evt - Event
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profilePopup.querySelector('.popup__input_type_name');
  const jobInput = profilePopup.querySelector('.popup__input_type_description');

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

document.querySelector('.popup_type_edit .popup__form').addEventListener('submit', handleProfileFormSubmit);

/**
 * Function for opening an image modal
 * @param {Card} card 
 */
function handleImageClick(card) {
  openModal(imagePopup);
  imagePopup.querySelector('.popup__image').src = card.link;
  imagePopup.querySelector('.popup__image').alt = card.name;
  imagePopup.querySelector('.popup__caption').textContent = card.name;
}

imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));

// Add open animation for each popup
popupList.forEach(popup => popup.classList.add('popup_is-animated'));

// Initialize cards
initialCards.forEach((card) => {
  const cardElement = createCard(card, handleImageClick);
  cardContainer.append(cardElement);
});

// Enable validation
enableValidation(validationSettings);