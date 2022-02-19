const flash = require('connect-flash/lib/flash');
const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Articles = require("../../models/articles/Article");
const Category = require("../../models/categories/Category");

router.get('/articles', (req, res) => {
    Articles.findAll().then(articles => {
        res.render('admin/articles/index', {articles : articles, message: req.flash('message'), error_message: req.flash('error_message')})
    })
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { categories: categories, message: req.flash('message'), error_message: req.flash('error_message')})
    })
});

router.post('/admin/articles/save', (req, res) => {
    var title = req.body.title;
    var category = req.body.category;
    var body_article = req.body.body_article;

    if(title === '')
    {
        req.flash('error_message', 'O título do artigo é obrigatório!');
        res.redirect('/admin/articles/new');
    }
    else if(category === '')
    {
        req.flash('error_message', 'A categoria do artigo é obrigatório!');
        res.redirect('/admin/articles/new');
    }
    else if(body_article === '')
    {
        req.flash('error_message', 'O artigo é obrigatório!');
        res.redirect('/admin/articles/new');
    }
    else {
        Articles.create({
            title: title,
            slug: slugify(title),
            body: body_article,
            categoryId: category
        }).then(() => {
            req.flash('message', 'Artigo criado com sucesso!');
            res.redirect('/articles');
        })
    }
});

router.get('/admin/articles/edit/:id', (req, res) => {

    var id = req.params.id;

    if(isNaN(id))
    {
        req.flash('error_message', 'Não foi possível encontrar o artigo!');
        res.redirect('/articles');
    }

    Articles.findByPk(id).then(article => {
        if(category !== undefined)
        {
            res.render('admin/articles/edit', {article: article, message: req.flash('message'), error_message: req.flash('error_message')});
        } else {
            res.redirect('/articles');
        }
    }).catch(erro => {
        req.flash('error_message', 'Erro ao cadastrar artigo!');
        res.redirect('/articles');
    })
});

router.post('/admin/articles/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Articles.update({title: title, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        req.flash('message','Artigo atualizado com sucesso!');
        res.redirect('/articles');
    })
});

router.post('/admin/articles/delete', (req, res) => {
    var id = req.body.id;
    if(id !== undefined)
    {
        if(!isNaN(id))
        {
            Articles.destroy({
                where: {id: id}
            }).then(() => {
                req.flash('message', 'Artigo removido com sucesso!');
                res.redirect('/articles');
            })
        }else{
            req.flash('error_message', 'Não foi possível remover o artigo!');
            res.redirect('/articles');
        }

    }else {
        req.flash('error_message', 'Não encontramos o id deste artigo!');
        res.redirect('/articles');
    }
});
module.exports = router;