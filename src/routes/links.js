const router = require('express').Router();
const {
  formView,
  createLink,
  showLinks,
  editLink,
  editedLink,
  deleteLink,
} = require('../controllers/links.controllers');
const { isLoggedIn } = require('../lib/helpers');

router.get('/add', isLoggedIn, formView);
router.post('/add', isLoggedIn, createLink);
router.get('/', isLoggedIn, showLinks);
router.get('/edit/:id', isLoggedIn, editLink);
router.post('/edit/:id', isLoggedIn, editedLink);
router.get('/:id', isLoggedIn, deleteLink);

module.exports = router;
