const db = require('../models/index');
const Category = db.Category;
const Coursier = db.Coursier;


exports.coursierLink = async function (req, res) {
    await Category.findAll({ include: Coursier,  where: { category_id: req.params.category_id } })
        .then(data => {
            console.log("All categories:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.categoryList = async function (req, res) {
    await Category.findAll()
        .then(data => {
            console.log("All categorys:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.categoryCreate = async (req, res) => {
    let category = Category.build({ name: req.body.name, description: req.body.description })
    await category.save()
        .then(data => {
            console.log(category.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.categoryUpdate = async function (req, res) {
    if (req.params.category_id > 0) {
        await Category.update(
            {
                name: req.body.name, description: req.body.description},
            {   where: { category_id: req.params.category_id } }
        )
            .then(data => {
                if (data[0] == 0) { res.status(400).json({ message: 'Not found' }) }
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

exports.categoryDelete = async function (req, res) {
    if (req.params.category_id) {
        await Category.destroy({ where: { category_id: req.params.category_id } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Not found' });
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}

exports.categoryFindOne = async function (req, res) {
    if (req.params.category_id) {
        await Category.findOne({ where: { category_id: req.params.category_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Category not found' })
}