const db = require('../models/index');
const Coursier = db.Coursier;
const Order = db.Orders;

exports.orderList = async function (req, res) {
    await Order.findAll()
        .then(data => {
            console.log("All orders:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.orderCreate = async (req, res) => {
    let order = Order.build({ 
        name_customer: req.body.name_customer, 
        name_restaurant: req.body.name_restaurant, 
        adress_customer: req.body.adress_customer,
        adress_restaurant: req.body.adress_restaurant,
        price: req.body.price,
        distance: req.body.distance,
        coursier_id: req.body.coursier_id})
    await order.save()
        .then(data => {
            console.log(order.toJSON());
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.orderUpdate = async function (req, res) {
    if (req.params.order_id > 0) {
        await Order.update(
            {
                name_customer: req.body.name_customer, 
                name_restaurant: req.body.name_restaurant, 
                adress_customer: req.body.adress_customer,
                adress_restaurant: req.body.adress_restaurant,
                price: req.body.price,
                distance: req.body.distance,
                coursier_id: req.body.coursier_id},
            {   where: { order_id: req.params.order_id } }
            )
            .then(data => {
                if (data[0] == 0) { res.status(400).json({ message: 'Not found' }) }
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Order not found' })
}

exports.orderDelete = async function (req, res) {
    if (req.params.order_id) {
        await Order.destroy({ where: { order_id: req.params.order_id } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Not found' });
                else res.json({ message: 'done' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Order not found' })
}

exports.orderFindOne = async function (req, res) {
    if (req.params.order_id) {
        await Order.findOne({ where: { order_id: req.params.order_id }})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Order not found' })
}


