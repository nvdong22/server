const express = require('express');
const router = express.Router();

const apiController = require('../app/controllers/Api');

// newController.index;
router.get('/search/q=:key', apiController.search);
router.get('/apicourses', apiController.apiCoures);
router.get('/apicourses/:slug', apiController.showApi);

module.exports = router;
