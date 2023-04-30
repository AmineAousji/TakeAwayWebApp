const db = require('../models/index');
const Coursier = db.Coursier;
const Category = db.Category;

exports.coursierList = async function (req, res) {
    await Coursier.findAll()
        .then(data => {
            console.log("All coursiers:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.coursierByCategory = async function (req, res) {
    const category_name = req.params.category_name;

    await Category.findByPk(category_name)
        .then(category => {
            if (!category) {
                throw new Error("Category not found");
            }
            return category.getCoursiers();
        })
        .then(coursiers => {
            console.log("Coursiers for category:", JSON.stringify(coursiers, null, 2));
            res.json(coursiers);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


exports.coursierCreate = async (req, res) => {
    let coursier = Coursier.build({ 
        name: req.body.name, 
        adress: req.body.adress, 
        recruitment_date: req.body.recruitment_date,
        Num_tel: req.body.Num_tel,
        category_name: req.body.category_name})
    await coursier.save()
        .then(data => {
            console.log(coursier.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.coursierUpdate = async function (req, res) {
    if (req.params.coursier_id > 0) {
        await Coursier.update(
            {
                name: req.body.name,
                adress: req.body.adress, 
                recruitment_date: req.body.recruitment_date, 
                Num_tel: req.body.Num_tel, 
                category_id: req.body.category_id},
            {   where: { coursier_id: req.params.coursier_id } }
        )
            .then(data => {
                if (data[0] == 0) { res.status(400).json({ message: 'Not found' }) }
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Coursier not found' })
}

exports.coursierDelete = async function (req, res) {
    if (req.params.coursier_id) {
        await Coursier.destroy({ where: { coursier_id: req.params.coursier_id } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Not found' });
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Coursier not found' })
}

exports.coursierFindOne = async function (req, res) {
    if (req.params.coursier_id) {
        await Coursier.findOne({ where: { coursier_id: req.params.coursier_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Coursier not found' })
}


