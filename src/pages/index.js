import './index.css';

import {
  popupList,
  profilePopup,
  profileAvatarPopup,
  cardPopup,
  imagePopup,
  cardContainer,
  profileName,
  profileDescription,
  profileAvatar,
  profileFormName,
  profileFormDescription,
  profileAvatarPopupButton,
  profileAvatarPopupClose,
  profileAvatarForm,
  profileEditButton,
  profileEditCloseButton,
  profileAddButton,
  profileAddButtonClose,
  cardForm,
  imagePopupCloseButton,
  validationSettings,
} from '../utils/constants.js'

import { getUserInfo, patchUserAvatar, getInitialCards, createNewCard, editProfile } from '../components/api.js'

import { enableValidation } from '../components/validation.js';
import { createCard } from '../components/card.js';
import { openModal, closeModal } from '../components/modal.js';

let currentUserId = null;

getUserInfo()
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

profileAvatarPopupButton.addEventListener('click', () => {
  openModal(profileAvatarPopup);
})

profileAvatarPopupClose.addEventListener('click', () => closeModal(profileAvatarPopup));

profileAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarUrl = profileAvatarForm.querySelector('.popup__input_type_url').value;

  patchUserAvatar(newAvatarUrl)
  .then(data => {
    document.querySelector('.profile__image').style.backgroundImage = `url('${data.avatar}')`;
    closeModal(profileAvatarPopup);
    profileAvatarForm.reset();
  });

});

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
  
  createNewCard(newCardName, newCardLink)
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

  const nameInput = profileFormName.value;
  const jobInput = profileFormDescription.value;

  editProfile(nameInput, jobInput);

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
getInitialCards()
.then((cards) => {
  cards.forEach((card) => {
    const cardElement = createCard(card, currentUserId, handleImageClick);
    cardContainer.append(cardElement);
  });
});

// Enable validation
enableValidation(validationSettings);