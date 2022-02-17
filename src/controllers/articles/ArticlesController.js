const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
    res.render('articles/index')    
});

router.get('/articles/new', (req, res) => {
    res.render('articles/new')   
});

module.exports = router;