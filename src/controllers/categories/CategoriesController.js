const flash = require('connect-flash/lib/flash');
const express = require('express');
const router = express.Router();
const slugify = require('slugify');

const Category = require('../../models/categories/Category');

router.get('/categories', (req, res) => {

    Category.findAll().then(categories => {
        res.render('categories/index', {categories : categories, message: req.flash('message'), error_message: req.flash('error_message')})   
    })
});

router.get('/admin/categories/new', (req, res, next) => {
    res.render('admin/categories/new',{message: req.flash('message'), error_message: req.flash('error_message')});
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;

    if(title === '')
    {        
        req.flash('error_message', 'O título da categoria é obrigatório');
        res.redirect('/admin/categories/new');        

    }else {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            req.flash('message', 'Categoria criada com sucesso');
            res.redirect('/categories');
        })            
    }
});

router.get('/admin/categories/edit/:id', (req, res) => {

    var id = req.params.id;

    if(isNaN(id))
    {
        req.flash('error_message', 'Não foi possível encontrar a categoria');
        res.redirect('/categories');
    }

   Category.findByPk(id).then(category => {
        if(category !== undefined)
        {            
            res.render('admin/categories/edit', {category: category, message: req.flash('message'), error_message: req.flash('error_message')});
        } else {            
            res.redirect('/categories');
        }
   }).catch(erro => {
            req.flash('error_message', 'Erro ao cadastrar categoria!');
            res.redirect('/categories');
   })
});

router.post('/categories/delete', (req, res) => {
    var id = req.body.id;
    if(id !== undefined)
    {
        if(!isNaN(id))
        {
            Category.destroy({
                where: {id: id}
            }).then(() => {
                req.flash('message', 'Categoria removida com sucesso!');
                res.redirect('/categories');
            })
        }else{
            req.flash('error_message', 'Não foi possível remover a categoria');
            res.redirect('/admin/categories');
        }
        
    }else {
        res.redirect('/admin/categories');
    }
});

module.exports = router;