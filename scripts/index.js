const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = document.querySelector('.popup_type_edit').querySelector('.popup__close');

const profileAddButton = document.querySelector('.profile__add-button');
const profileAddButtonClose = document.querySelector('.popup_type_new-card').querySelector('.popup__close');

profileEditButton.addEventListener('click', () => {
    openModal(profilePopup);
    profilePopup.querySelector('.popup__input_type_name').value = profileName.textContent;
    profilePopup.querySelector('.popup__input_type_description').value = profileDescription.textContent;

    const profileEditForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
    //const profileEditSubmitButton = document.querySelector('.popup_type_edit').querySelector('.popup__button');

    const nameInput = profileEditForm.querySelector('.popup__input_type_name');
    const jobInput = profileEditForm.querySelector('.popup__input_type_description');

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

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
})

profileAddButtonClose.addEventListener('click', () => {
    closeModal(cardPopup);
})

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function createCard(card) {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        cardElement.querySelector('.card__title').textContent = card.name;
        cardElement.querySelector('.card__image').src = card.link;
        return cardElement;
}

initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardContainer.append(cardElement);
})