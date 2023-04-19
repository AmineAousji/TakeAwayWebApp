let express = require('express');
let router = express.Router();
const jwt = require("jsonwebtoken")

//Categories
const categoryController = require('./controllers/categoryController');
router.get('/categories/list', categoryController.categoryList);
router.post('/categories/', categoryController.categoryCreate);
router.put('/categories/:category_id', categoryController.categoryUpdate);
router.delete('/categories/:category_id', categoryController.categoryDelete);
router.get('/categories/find/:id_category', categoryController.categoryFindOne);

//Coursiers
const coursierController = require('./controllers/coursierController');
router.get('/coursiers/list', coursierController.coursierList);
router.post('/coursiers/', coursierController.coursierCreate);
router.put('/coursiers/:coursier_id', coursierController.coursierUpdate);
router.delete('/coursiers/:coursier_id', coursierController.coursierDelete);
router.get('/coursiers/find/:coursier_id', coursierController.coursierFindOne);
//router.post('/coursiers/rechercher', coursierController.coursierFind);

//Orders
const orderController = require('./controllers/orderController');
router.get('/orders/list', orderController.orderList);
router.post('/orders/', orderController.orderCreate);
router.put('/orders/:order_id', orderController.orderUpdate);
router.delete('/orders/:order_id', orderController.orderDelete);
router.get('/orders/find/:order_id', orderController.orderFindOne);
//router.post('/orders/rechercher', orderController.orderFind);

//Users
isAuthorized = function(req,res,next){
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'my_secret_key', (err, payload) => {
            if (err) {
                res.status(401).json({ error: "Not Authorized" });
                return;
            }
            req.user = payload;     
            return next(); 
        });
        
    }  
    else{
        res.status(403).json({error: "Not Authorized"})                
    }
}

const userController = require('./controllers/userController');
const User = require('./models/userModel')
router.get('/users/list', userController.userList );
router.post('/users/',isAuthorized, userController.userCreate);
router.put('/users/:id_user', userController.userUpdate);
router.delete('/users/:id_user', userController.userDelete);
router.get('/users/find/:id_user', userController.userFindOne);

router.post('/login', async function (req, res, next) {
    const jwtKey = "my_secret_key"
    const jwtExpirySeconds = 300
    let payload = { id: User.id_user };
    let token = jwt.sign(payload, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
    })

    res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
});



module.exports = router;