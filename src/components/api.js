import { baseurl, authToken } from '../utils/apiconfig.js';

export function getUserInfo() {
    return fetch(`${baseurl}/users/me`, {
        headers: {
          authorization: authToken
        }
        })
        .then (res => res.json())
        .catch(err => console.log(err));
}

export function patchUserAvatar(newAvatarUrl) {
    return fetch(`${baseurl}/users/me/avatar `, {
            method: 'PATCH',
            headers: {
            authorization: authToken,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: newAvatarUrl })
        })
        .then(res => {
            if (!res.ok) throw new Error('Update avatar error');
            return res.json();
        })
        .catch(err => console.error(err));
}

export function getInitialCards() {
    return fetch(`${baseurl}/cards`, {
        method: 'GET',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .catch((err) => console.error(err));
}

export function createNewCard(newCardName, newCardLink){
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
    .catch((err) => console.error(err));
}

export function editProfile(newName, newAbout) {
    return fetch(`${baseurl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })
    .catch((err) => console.error(err));
}