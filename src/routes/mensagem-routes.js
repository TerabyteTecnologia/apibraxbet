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


//CPremium
router.get('/showcpremium/:id/tipo/:tipo',authService.authorize,controller.showCPremium);
router.put('/updatecpremium/:id',authService.authorize,controller.updateCPremium);

//Roleta 
router.get('/showroleta/:id/tipo/:tipo',authService.authorize,controller.showRoleta);
router.put('/updateroleta/:id',authService.authorize,controller.updateRoleta);

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


//FortuneTiger 
router.get('/showfortunetiger/:id/tipo/:tipo',authService.authorize,controller.showFurtuneTiger);
router.put('/updatefortunetiger/:id',authService.authorize,controller.updateFurtuneTiger);



//############### PADRAO ######################
//Fantan PADRAO
router.get('/showfantanpadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showFantan);
router.put('/updatefantanpadrao/:id',authService.authorize,controllerParao.updatefantan);

//Aviator PADRAO
router.get('/showaviatorpadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showMensagemaviator);
router.put('/updateaviatorpadrao/:id',authService.authorize,controllerParao.updateMensagemaviator);



//Miner PADRAO
router.get('/showminerpadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showMenssagemMiner);
router.put('/updateminerpadrao/:id',authService.authorize,controllerParao.updateMessageMiner);

//FutballStudio PADRAO
router.get('/showfutballstudiopadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showFutbalStuido);
router.put('/updatefutballstudiopadrao/:id',authService.authorize,controllerParao.updateFutbalStuido);

//Penalty
router.get('/showpenaltypadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showPenalty);
router.put('/updatepenaltypadrao/:id',authService.authorize,controllerParao.updatePenalty);

//CPremium Padrao
router.get('/showcpremiumpadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showCPremium);
router.put('/updatecpremiumpadrao/:id',authService.authorize,controllerParao.updateCPremium);

//FortuneTiger Padrao
router.get('/showfortunetigerpadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showFurtuneTiger);
router.put('/updatefortunetigerpadrao/:id',authService.authorize,controllerParao.updateFurtuneTiger);


//Roleta Padrao
router.get('/showroletapadrao/:id/tipo/:tipo',authService.authorize,controllerParao.showRoleta);
router.put('/updateroletapadrao/:id',authService.authorize,controllerParao.updateRoleta);
module.exports =router;