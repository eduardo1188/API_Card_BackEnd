const Card = require('../models/cardsModel');
const cards = require('../routes/cardsRouter');



const getCards = async (req, res) => {
  console.log(req.session.userId)
  const cards = await Card.find({user: res.locals.user}).lean();
  //res.render('cards/cardsView', { cards });
}

const createCard = async (req, res) => {
  const card = new Card({
    title: req.body.title,
    description: req.body.description,
    user: res.locals.user
  });
  await card.save();
  req.flash('success','cards was successfully create')
  res.redirect('/cards');//Preguntar a Shymmy si es necesario este redirect
}


const deleteCard = async (req, res) => {
  const { id } = req.params;
  await Card.findByIdAndDelete(id);
  req.flash('success','cards was successfully deleted')
  res.redirect('/cards');
}

const getCard = async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id);
  //res.render('cards/editForm', card);
}


const editCard = async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params;
  await Card.findByIdAndUpdate(id, { title, description });
  res.redirect('/cards');
}


module.exports = {
 getCards, createCard, deleteCard, getCard, editCard,
}