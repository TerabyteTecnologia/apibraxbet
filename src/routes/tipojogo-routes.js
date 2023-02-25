'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/tipojogo-controller');


router.get('/',authService.authorize,controller.index);
router.post('/',authService.authorize,controller.store);
router.get('/show/:id',authService.isAdmin,controller.show);
router.put('/update/:id',authService.authorize,controller.update);
router.delete('/delete/:id',authService.isAdmin,controller.excluirjogos);

router.put('/zerarwinloss/:id',authService.authorize,controller.zerawinloss);
router.put('/mudastatus/:id',authService.authorize,controller.mudastatus);

module.exports =router;