import '../pages/index.css'
import { initialCards } from './cards.js';
import { enableValidation } from '../components/validation.js';

// Create object which contains validation classes
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

//Initialize all popups
const popupList = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
let currentOpenPopup = null;

//Initialize template for cards
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

//Initialize profile
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Initialize profile edit popup buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = document.querySelector('.popup_type_edit .popup__close');

//Initialize add card popup buttons
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddButtonClose = document.querySelector('.popup_type_new-card .popup__close');
const cardForm = document.querySelector('.popup_type_new-card .popup__form');

//Initialize image popup buttons
const imagePopupCloseButton = document.querySelector('.popup_type_image .popup__close');


//Events for edit profile
profileEditButton.addEventListener('click', () => {
    openModal(profilePopup);
    profilePopup.querySelector('.popup__input_type_name').value = profileName.textContent;
    profilePopup.querySelector('.popup__input_type_description').value = profileDescription.textContent;

    const profileEditForm = document.querySelector('.popup_type_edit .popup__form');

    const nameInput = profileEditForm.querySelector('.popup__input_type_name');
    const jobInput = profileEditForm.querySelector('.popup__input_type_description');

    /**
     * Function for submiting an edited profile
     * @param {Event} evt - Event
     */
    function handleProfileFormSubmit(evt) {
        evt.preventDefault();

        let name = nameInput.value;
        let job = jobInput.value;

        profileName.textContent = name;
        profileDescription.textContent = job;
        closeModal(profilePopup);
    }

    profileEditForm.addEventListener('submit', handleProfileFormSubmit);
})

profileEditCloseButton.addEventListener('click', () => {
    closeModal(currentOpenPopup);
})


//Events for adding new card
profileAddButton.addEventListener('click', () => {
    cardForm.reset();
    openModal(cardPopup);
})

/**
 * Function for submiting a new card
 * @param {Event} evt - Event
 */
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardName = cardForm.querySelector('.popup__input_type_card-name').value;
    const newCardLink = cardForm.querySelector('.popup__input_type_url').value;
    
    const newCard = {name: newCardName, link: newCardLink};
    const card = createCard(newCard);

    cardContainer.prepend(card);
    closeModal(cardPopup);
}

cardPopup.addEventListener('submit', handleCardFormSubmit);

profileAddButtonClose.addEventListener('click', () => {
    closeModal(currentOpenPopup);
})


imagePopupCloseButton.addEventListener('click', () => {
    closeModal(currentOpenPopup);
})

/**
 * Function for open popup
 * @param {popup} popup - popup
 */
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    currentOpenPopup = popup;

    popup.addEventListener('mousedown', handleOverlayClose);
}

/**
 * Function for close popup
 * @param {popup} popup - popup
 */
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    currentOpenPopup = null;

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

/**
 * Function for creating new card using template
 * @param {Element} card - Element of array which will be created as a card
 * @returns 
 */
function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__image').src = card.link;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
  })

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
      cardElement.remove();
  })

  const imageButton = cardElement.querySelector('.card__image');
  imageButton.addEventListener('click', () => {
      currentOpenPopup = imagePopup;
      imagePopup.classList.add('popup_is-opened');
      imagePopup.querySelector('.popup__image').src = card.link;
      imagePopup.querySelector('.popup__image').alt = card.name;
      imagePopup.querySelector('.popup__caption').textContent = card.name;
  })

  return cardElement;
}


const formsList = document.querySelectorAll('.popup__form');
console.log(formsList);


//Add event listener to document for closing popup by pressing Esc
document.addEventListener('keydown', handleEscClose);

//When page open --> create card for each element of array from cards.js
initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardContainer.append(cardElement);
})

//Add open animation for each popup
profilePopup.classList.add('popup_is-animated')
cardPopup.classList.add('popup_is-animated')
imagePopup.classList.add('popup_is-animated')

enableValidation(validationSettings);