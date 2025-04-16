import { baseurl, authToken } from '../utils/apiconfig';

/**
 * Function for creating new card using template
 * @param {Card} card
 * @param {String} currentUserId  
 * @param {*} handleImageClick 
 * @returns 
 */
function createCard(card, currentUserId, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const CardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = card.name;
    CardImage.alt = card.name;
    CardImage.src = card.link;
  
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.cards__counter-likes');

    
    const isLiked = card.likes.some(like => like._id === currentUserId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeCounter.textContent = card.likes.length;

    likeButton.addEventListener('click', () => 
        handleLikeClick(card._id, likeButton, likeCounter)
    );

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
 * Function for like a card
 * @param {String} cardId 
 * @param {Element} likeButton 
 * @param {Element} likeCounter 
 */
async function handleLikeClick(cardId, likeButton, likeCounter) {
    const isActive = likeButton.classList.contains('card__like-button_is-active');
    const method = isActive ? 'DELETE' : 'PUT';
    
    try {
        const response = await fetch(`${baseurl}/cards/likes/${cardId}`, {
            method: method,
            headers: {
                authorization: authToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const updatedCard = await response.json();
        
        // Refresh UI
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
        
    } catch (error) {
        console.error('Like error:', error);
    }
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
            throw new Error('Delete error');
        }
        return res.json();
    })
    .then(() => {
        cardElement.remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export { createCard };