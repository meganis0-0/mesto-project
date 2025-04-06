//Initialize all popups
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//Initialize template for cards
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

//Initialize profile
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Initialize profile edit popup buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = document.querySelector('.popup_type_edit .popup__close');
//const profileEditCloseButton = document.querySelector('.popup_type_edit').querySelector('.popup__close');

//Initialize add card popup buttons
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddButtonClose = document.querySelector('.popup_type_new-card .popup__close');
const cardForm = document.querySelector('.popup_type_new-card .popup__form');


//Events for edit profile
profileEditButton.addEventListener('click', () => {
    openModal(profilePopup);
    profilePopup.querySelector('.popup__input_type_name').value = profileName.textContent;
    profilePopup.querySelector('.popup__input_type_description').value = profileDescription.textContent;

    const profileEditForm = document.querySelector('.popup_type_edit .popup__form');
    //const profileEditSubmitButton = document.querySelector('.popup_type_edit').querySelector('.popup__button');

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
    closeModal(profilePopup);
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
    closeModal(cardPopup);
})

/**
 * Function for open popup
 * @param {popup} popup - popup
 */
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

/**
 * Function for close popup
 * @param {popup} popup - popup
 */
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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

        return cardElement;
}




//When page open --> create card for each element of array from cards.js
initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardContainer.append(cardElement);
})

