import { baseurl, authToken } from '../utils/apiconfig';

/**
 * Function for creating new card using template
 * @param {Card} card  
 * @param {*} handleImageClick 
 * @returns 
 */
function createCard(card, currentUserId, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__image').src = card.link;
  
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLikeClick);
  
    const likeCounter = cardElement.querySelector('.cards__counter-likes');
    likeCounter.textContent = card.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (card.owner._id === currentUserId) {        
        deleteButton.addEventListener('click',  handleDeleteClick.bind(null, card._id));
    } else {
        deleteButton.remove();
    }
  
    const imageButton = cardElement.querySelector('.card__image');
    imageButton.addEventListener('click', () => handleImageClick(card));

    return cardElement;
}
  
/**
 * Function for add Like button functional
 * @param {Event} evt 
 */
function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
  
/**
 * Function for add Delete button functional
 * @param {Event} evt 
 */
function handleDeleteClick(cardId, evt) {
    const cardElement = evt.target.closest('.card');

    fetch(`${baseurl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: authToken,
            'Content-Type': 'application/json',
        },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Ошибка при удалении карточки');
        }
        return res.json();
    })
    .then(() => {
        cardElement.remove();
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

export { createCard };