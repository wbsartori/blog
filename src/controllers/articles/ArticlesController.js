const flash = require('connect-flash/lib/flash');
const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Articles = require("../../models/articles/Article");

router.get('/articles', (req, res) => {
    Articles.findAll().then(articles => {
        res.render('admin/articles/index', {articles : articles, message: req.flash('message'), error_message: req.flash('error_message')})
    })
});

router.get('/admin/articles/new', (req, res) => {
    res.render('admin/articles/new', { message: req.flash('message'), error_message: req.flash('error_message')})
});

module.exports = router;