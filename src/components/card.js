/**
 * Function for creating new card using template
 * @param {Card} card  
 * @param {*} handleImageClick 
 * @returns 
 */
function createCard(card, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__image').src = card.link;
  
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', handleLikeClick);
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', handleDeleteClick);
  
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
function handleDeleteClick(evt) {
    evt.target.closest('.card').remove();
}

export { createCard };