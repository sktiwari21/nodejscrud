const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc gets all items
// @access Public
router.get('/', (req, res) => {
    // Select * from ShoppingList ORDER BY DESC
    Item.find()
    .sort({date: -1}) //sort items in desc order
    .then(items => res.json(items))
});

// @route POSt api/items
// @desc create an item (Create a post)
// @access Public
router.post('/', (req, res) => {
    // Insert into ShoppingList (name) VALUES (res.body.name)
    const newItem = new Item({
        name: req.body.name
        // date auto generated
    });
    newItem.save()
    .then(item => res.json(item));
});

// @route GET api/items/:id
// @desc delete an items
// @access Public
router.delete('/:id', (req, res) => {

    Item.deleteOne({_id: req.params.id}).then(()=> res.json({success: true}))
    .catch(err => res.status(404).json({msg: 'Deletion Failed', 'err: ': err, success: false}));
    
    // Item.findById('req.params.id') //get id from URI since id will be in 'localhost:3000/api/items/4j4tnjng'
    // .then(item => {
    //     item.remove().then(()=> res.json({success: true}))
    //         .catch(err => res.status(404).json({msg: 'Deletion Failed', success: false}));
        
    // })
});

module.exports = router;