const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

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