// Initialize all popups
export const popupList = document.querySelectorAll('.popup');
export const profilePopup = document.querySelector('.popup_type_edit');
export const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');

// Initialize template for cards
export const cardContainer = document.querySelector('.places__list');

// Initialize profile
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');

// Initialize profile edit popup buttons
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditCloseButton = document.querySelector('.popup_type_edit .popup__close');

// Initialize add card popup buttons
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAddButtonClose = document.querySelector('.popup_type_new-card .popup__close');
export const cardForm = document.querySelector('.popup_type_new-card .popup__form');

// Initialize image popup buttons
export const imagePopupCloseButton = document.querySelector('.popup_type_image .popup__close');

// Create object which contains validation classes
export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};