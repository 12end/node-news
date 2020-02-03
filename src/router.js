const handler = require('./handler');
const express = require('express');

let router = express.Router();

//router.use('',extend);
router.use('/resources',express.static('resources'));
router.get('/[index]?',handler.index);
router.get('/submit',handler.submit);
router.get('/item/:id',handler.item);
router.post('/add',handler.add);
router.use('',handler.error);

module.exports=router;