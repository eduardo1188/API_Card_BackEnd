const { Router } = require('express');
const cards = Router();
const isAuth = require('../helpers/isAuthenticated');


const {getCards, createCard, deleteCard, getCard, editCard } = require('../controllers/cardsControllers');


cards.get('/cards', isAuth, getCards);

//Posiblemente no es necesario esta ruta
cards.get('/cards/:id', isAuth, getCard);//Preguntar a Shymmy como sería el controlador del edit

cards.post('/cards', isAuth, createCard);

cards.delete('/cards/:id', isAuth, deleteCard);

cards.put('/cards/:id', isAuth, editCard)


module.exports = cards;
