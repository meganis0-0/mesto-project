import './index.css';

import {
  popupList,
  profilePopup,
  cardPopup,
  imagePopup,
  cardContainer,
  profileName,
  profileDescription,
  profileAvatar,
  profileFormName,
  profileFormDescription,
  profileEditButton,
  profileEditCloseButton,
  profileAddButton,
  profileAddButtonClose,
  cardForm,
  imagePopupCloseButton,
  validationSettings,
} from '../utils/constants.js'

import { baseurl, authToken } from '../utils/apiconfig.js';

import { enableValidation } from '../components/validation.js';
import { createCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

let currentUserId = null;

fetch(`${baseurl}/users/me`, {
  headers: {
    authorization: authToken
  }
  })
  .then (res => res.json())
  .then ((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    currentUserId = res._id;
  })


// Events for edit profile
profileEditButton.addEventListener('click', () => {
  openModal(profilePopup);
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;
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
  
  fetch(`${baseurl}/cards`, {
    method: 'POST',
    headers: {
      authorization: authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const card = createCard(res, currentUserId, handleImageClick);
      cardContainer.prepend(card);
  })

  closeModal(cardPopup);
}

cardForm.addEventListener('submit', handleCardFormSubmit);

/**
 * Function for submiting an edited profile
 * @param {Event} evt - Event
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profileFormName;
  const jobInput = profileFormDescription;

  fetch(`${baseurl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })   
  });

  //Update profile info in the UI
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


// Create cards
fetch(`${baseurl}/cards`, {
  method: 'GET',
  headers: {
    authorization: authToken,
    'Content-Type': 'application/json'
  }
})
.then((res) => res.json())
.then((cards) => {
  cards.forEach((card) => {
    const cardElement = createCard(card, currentUserId, handleImageClick);
    cardContainer.append(cardElement);
  });
});

// Enable validation
enableValidation(validationSettings);