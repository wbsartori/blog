const flash = require('connect-flash/lib/flash');
const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Articles = require("../../models/articles/Article");
const Category = require("../../models/categories/Category");
const ArticleForm = require('../../models/articles/ArticleForm');
const CategoryForm = require('../../models/categories/CategoryForm');

router.get('/articles', (req, res) => {

    Articles.findAll(
        {
            include: [{
                model: Category
            }]
        }
    ).then(articles => {
        res.render('admin/articles/index', {form: ArticleForm, articles : articles, message: req.flash('message'), error_message: req.flash('error_message')})
    })
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { form: ArticleForm, categories: categories, message: req.flash('message'), error_message: req.flash('error_message')})
    })
});

router.post('/admin/articles/save', (req, res) => {
    var title = req.body.title;
    var category = req.body.category;
    var body_article = req.body.body_article;

    if(title === '')
    {
        req.flash('error_message', ArticleForm.mensagem.erro.erro_titulo);
        res.redirect('/admin/articles/new');
    }
    else if(category === '')
    {
        req.flash('error_message', ArticleForm.mensagem.erro.erro_categoria);
        res.redirect('/admin/articles/new');
    }
    else if(body_article === '')
    {
        req.flash('error_message', ArticleForm.mensagem.erro.erro_artigo);
        res.redirect('/admin/articles/new');
    }
    else {
        Articles.create({
            title: title,
            slug: slugify(title),
            body: body_article,
            categoryId: category
        }).then(() => {
            req.flash('message', ArticleForm.mensagem.sucesso.salvar);
            res.redirect('/articles');
        })
    }
});

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id;

    if(isNaN(id))
    {
        req.flash('error_message', ArticleForm.mensagem.erro.erro_null);
        res.redirect('/articles');
    }

    Articles.findByPk(id).then(article => {
        if(article !== undefined)
        {
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', { form: ArticleForm, categories: categories,article: article, message: req.flash('message'), error_message: req.flash('error_message')});
            })
        } else {
            res.redirect('/articles');
        }
    }).catch(erro => {
        req.flash('error_message', ArticleForm.mensagem.erro.erro_salvar);
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
        req.flash('message',ArticleForm.mensagem.sucesso.editar);
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
                req.flash('message', ArticleForm.mensagem.sucesso.deletar);
                res.redirect('/articles');
            })
        }else{
            req.flash('error_message', ArticleForm.mensagem.erro.erro_deletar);
            res.redirect('/articles');
        }

    }else {
        req.flash('error_message', ArticleForm.mensagem.erro.erro_deletar_id);
        res.redirect('/articles');
    }
});

module.exports = router;