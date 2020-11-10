const express = require('express');
const {
  body
} = require('express-validator/check');

const cakeController = require('../controllers/cakes');

const router = express.Router();

router.get('/cakes', cakeController.getCakes);

router.post(
  '/cakes',
  [
    body('name')
    .trim()
    .isLength({
      min: 5
    })
  ],
  cakeController.createCake
);

router.get('/cakes/:name', cakeController.getCake);

router.put(
  '/cakes/:name',
  [
    body('name')
    .trim()
    .isLength({
      min: 5
    })
  ],
  cakeController.updateCake
);

router.delete('/cakes/:name', cakeController.deleteCake);

module.exports = router;