'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/mensagens-controller');
const controllerAviator = require('../controller/aviator-controller');
const controllerMiner = require('../controller/miner-controller');
const controllerParao = require('../controller/padrao-controller');


router.get('/',authService.authorize,controller.index);
router.post('/',authService.authorize,controller.store);
router.get('/showdouble/:id',authService.authorize,controller.showdouble);
router.get('/showcrash/:id',authService.authorize,controller.showcrash);
router.put('/updatedouble/:id',authService.authorize,controller.updatedouble);
router.put('/updatecrash/:id',authService.authorize,controller.updatecrash);
router.put('/mudastatus/:id',authService.authorize,controller.mudastatus);

//Premium routes 
router.put('/updatepremium/:id',authService.authorize,controller.updatepremium);
router.get('/showpremium/:id',authService.authorize,controller.showPremium);


//Roleta Routes
router.put('/updateroleta/:id',authService.authorize,controller.updateroleta);
router.get('/showroleta/:id',authService.authorize,controller.showroleta);

//Fantan
router.get('/showfantan/:id/tipo/:tipo',authService.authorize,controller.showFantan);
router.put('/updatefantan/:id',authService.authorize,controller.updatefantan);

//FutballStudio
router.get('/showfutballstudio/:id/tipo/:tipo',authService.authorize,controller.showFutbalStuido);
router.put('/updatefutballstudio/:id',authService.authorize,controller.updateFutbalStuido);

//Penalty
router.get('/showpenalty/:id/tipo/:tipo',authService.authorize,controller.showPenalty);
router.put('/updatepenalty/:id',authService.authorize,controller.updatePenalty);



//Aviator
router.get('/showaviator/:id/tipo/:tipo',authService.authorize,controllerAviator.showMensagemaviator);
router.put('/updateaviator/:id',authService.authorize,controllerAviator.updateMensagemaviator);


//Miner
router.get('/showminer/:id/tipo/:tipo',authService.authorize,controllerMiner.showMenssagemMiner);
router.put('/updateminer/:id',authService.authorize,controllerMiner.updateMessageMiner);




//############### PADRAO ######################
//Fantan
router.get('/showfantanpadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showFantan);
router.put('/updatefantanpadrao/:id',authService.authorize,controllerParao.updatefantan);


module.exports =router;