'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-services');
const controller = require('../controller/estrategia-controller');
const controllerPenalty = require('../controller/estrategiapenalty-controller');
const controllerAviator = require('../controller/aviator-controller');
const controllerMiner = require('../controller/miner-controller');

//Rotas Double
router.get('/index/:id',authService.authorize,controller.index);
router.post('/store/:id',authService.authorize,controller.storedouble);
router.get('/show/:id/:idbot',authService.authorize,controller.showdouble);
router.put('/update/:id/:idbot',authService.authorize,controller.updatedouble);
router.delete('/delete/:id/:idbot',authService.authorize,controller.excluirdouble);

//Rotas Fantan
router.get('/indexfantan/:id',authService.authorize,controller.indexfantan);
router.post('/storefantan/:id',authService.authorize,controller.storefantan);
router.get('/showfantan/:id/:idbot',authService.authorize,controller.showfantan);
router.put('/updatefantan/:id/:idbot',authService.authorize,controller.updatefantan);
router.delete('/deletefantan/:id/:idbot',authService.authorize,controller.excluirfantan);
router.put('/updatestatusfantan/:id/:idbot',authService.authorize,controller.updatestatusfantan);

//Rotas Futballstudio
router.get('/indexfutballstudio/:id',authService.authorize,controller.indexfutballstudio);
router.post('/storefutballstudio/:id',authService.authorize,controller.storefutballstudio);
router.get('/showfutballstudio/:id/:idbot',authService.authorize,controller.showfutballstudio);
router.put('/updatefutballstudio/:id/:idbot',authService.authorize,controller.updatefutballstudio);
router.delete('/deletefutballstudio/:id/:idbot',authService.authorize,controller.excluirfutballstudio);
router.put('/updatestatusfutballstudio/:id/:idbot',authService.authorize,controller.updatestatusfutballstudio);


//Rotas Crash
router.get('/indexcrash/:id',authService.authorize,controller.indexcrahs);
router.post('/storecrash/:id',authService.authorize,controller.storecrash);
router.get('/showcrash/:id/:idbot',authService.authorize,controller.showcrash);
router.put('/updatecrash/:id/:idbot',authService.authorize,controller.updatecrash);
router.delete('/deletecrash/:id/:idbot',authService.authorize,controller.excluircrash);


router.get('/indexroleta/:id',authService.authorize,controller.indexRoleta);
router.get('/showroleta/:id/:idbot',authService.authorize,controller.showroleta);
router.put('/updateroleta/:id/:idbot',authService.authorize,controller.updateroleta);
router.put('/mudastatusroleta/:id',authService.authorize,controller.mudastatusroleta);

//Rotas crashpremium
router.get('/indexcrashpremium/:id',authService.authorize,controller.indexcrahspremium);
router.post('/storecrashpremium/:id',authService.authorize,controller.storecrashpremium);
router.get('/showcrashpremium/:id',authService.authorize,controller.showcrashpremium);
router.put('/updatecrashpremium/:id',authService.authorize,controller.updatecrashpremium);
router.delete('/deletecrashpremium/:id/:idbot',authService.authorize,controller.excluircrashpremium);


//Rotas double premium
router.get('/indexdoublepremium/:id',authService.authorize,controller.indexdoublepremium);
router.post('/storedoublepremium/:id',authService.authorize,controller.storedoublepremium);
router.get('/showdoublepremium/:id',authService.authorize,controller.showdoublepremium);
router.put('/updatedoublepremium/:id',authService.authorize,controller.updatedoublepremium);
router.delete('/deletedoublepremium/:id/:idbot',authService.authorize,controller.excluirdoublepremium);

//Rotas Penalty
router.put('/updatepenalty/:id',authService.authorize,controllerPenalty.updatepenalty);
router.get('/showpenalty/:id',authService.authorize,controllerPenalty.showPenalty);


//Rotas Aviator
router.get('/indexaviator/:id',authService.authorize,controllerAviator.indexaviatore);
router.post('/storeaviator/:id',authService.authorize,controllerAviator.storeaviator);
router.get('/showaviator/:id/:idbot',authService.authorize,controllerAviator.showaviator);
router.put('/updateaviator/:id/:idbot',authService.authorize,controllerAviator.updateaviator);
router.delete('/deleteaviator/:id/:idbot',authService.authorize,controllerAviator.excluirAviator);
router.put('/updatestatusaviator/:id/:idbot',authService.authorize,controllerAviator.updatestatusAviator);

//Miner
router.put('/updateminer/:id',authService.authorize,controllerMiner.updadeMiner);
router.get('/showminer/:id',authService.authorize,controllerMiner.showEstrategia);

router.put('/updatewinloss',authService.authorizeRodrigo,controller.updatewinloss);


module.exports =router;