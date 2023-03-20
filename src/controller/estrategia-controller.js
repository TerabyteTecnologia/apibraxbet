'use strict';

const Grupo = require('../models/dtb_bots');
 const EstrategiaDouble = require('../models/dtb_estrategia_double');
 const EstrategiasfutballStudio = require('../models/dtb_estrategia_futballstudio');
 const EstrategiaFantan = require('../models/dtb_estrategia_fantan');
 const EstrategiaCrash = require('../models/dtb_estrategia_crash');
 const EstrategiaCrashPremium = require('../models/dtb_estrategiapremium_crash');
 const EstrategiaDoublePremium = require('../models/dtb_estrategiapremium_double');
 const EstrategiaRoleta = require('../models/dtb_estrategia_bet365');
 const ValidationContract = require("../validator/fluent-validators");
 const authService = require('../services/auth-services');
 const { Op } = require("sequelize");
const { updatewinlossEstrategias } = require('../services/helper-creater');

module.exports = {
 
//Double  ############################################################################
async index(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const  doubles = await EstrategiaDouble.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            dubles:doubles
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},


async storedouble(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const double = await EstrategiaDouble.create({
            bot_id:id,
            nome,
            sequencia,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            duble:double

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async showdouble(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       var duble = new EstrategiaDouble();
       if(usuarioLogado.permissoes.length > 0){
        duble = await EstrategiaDouble.findOne({where:{ id:id }});
       }else{
        duble = await EstrategiaDouble.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }
   

      
       return res.status(201).send({
           duble:duble
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updatedouble(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var doubleOld = new EstrategiaDouble();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await EstrategiaDouble.findOne({where:{ id:id }});
        }else{
            doubleOld = await EstrategiaDouble.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const duble = await doubleOld.update({
        nome,
        sequencia,
        apostar_em,
        martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:duble

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async excluirdouble(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaDouble.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaDouble.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},

//FutballStudio  ############################################################################
async indexfutballstudio(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const  doubles = await EstrategiasfutballStudio.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            futballstudios:doubles
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},


async storefutballstudio(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const double = await EstrategiasfutballStudio.create({
            bot_id:id,
            nome,
            sequencia,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            duble:double

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async showfutballstudio(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       var duble = new EstrategiasfutballStudio();
       if(usuarioLogado.permissoes.length > 0){
        duble = await EstrategiasfutballStudio.findOne({where:{ id:id }});
       }else{
        duble = await EstrategiasfutballStudio.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }
   

      
       return res.status(201).send({
        futballstudio:duble
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updatefutballstudio(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var doubleOld = new EstrategiasfutballStudio();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await EstrategiasfutballStudio.findOne({where:{ id:id }});
        }else{
            doubleOld = await EstrategiasfutballStudio.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const duble = await doubleOld.update({
        nome,
        sequencia,
        apostar_em,
        martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:duble

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async excluirfutballstudio(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiasfutballStudio.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiasfutballStudio.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},
async updatestatusfutballstudio(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    
    
        var doubleOld = new EstrategiasfutballStudio();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await EstrategiasfutballStudio.findOne({where:{ id:id }});
        }else{
            doubleOld = await EstrategiasfutballStudio.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

    const statusAtualizado = doubleOld.status =='I' ? 'A' :'I';
    const futball = await doubleOld.update({
        status:statusAtualizado.toString(),
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:futball

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},



//Fantam  ############################################################################
async indexfantan(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const  doubles = await EstrategiaFantan.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            dubles:doubles
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},
async storefantan(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const double = await EstrategiaFantan.create({
            bot_id:id,
            nome,
            sequencia,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            fantan:double

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async showfantan(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }
       var duble = new EstrategiaFantan();
       if(usuarioLogado.permissoes.length > 0){
        duble = await EstrategiaFantan.findOne({where:{ id:id }});
       }else{
        duble = await EstrategiaFantan.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }
   

      
       return res.status(201).send({
           fantan:duble
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updatefantan(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    const {nome,sequencia,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var doubleOld = new EstrategiaFantan();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await EstrategiaFantan.findOne({where:{ id:id }});
        }else{
            doubleOld = await EstrategiaFantan.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const fantan = await doubleOld.update({
        nome,
        sequencia,
        apostar_em,
        martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:fantan

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


async excluirfantan(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaFantan.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaFantan.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},

async updatestatusfantan(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
    
    
        var doubleOld = new EstrategiaFantan();
        if(usuarioLogado.permissoes.length > 0){
            doubleOld = await EstrategiaFantan.findOne({where:{ id:id }});
        }else{
            doubleOld = await EstrategiaFantan.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
 

    if(!doubleOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

    const statusAtualizado = doubleOld.status =='I' ? 'A' :'I';
    const fantan = await doubleOld.update({
        status:statusAtualizado.toString(),
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        data:fantan

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},


//Crash  ############################################################################
async storecrash(req,res){
    
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        const {nome,sequencia,  valor_a,valor_b,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(valor_a, 'valor_a', 'A valor a é obrigatorio');
        contract.isRequired(valor_b, 'valor_b', 'A valor b é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isRequired(martingale, 'martingale', 'O martingale é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const crash = await EstrategiaCrash.create({
            bot_id:id,
            nome,
            sequencia,
            valor_a,
            valor_b,
            apostar_em,
            martingale,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            crash:crash

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},

async indexcrahs(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        
        

        const  crashs = await EstrategiaCrash.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            crashs:crashs
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

async showcrash(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }

       

       var crash = new EstrategiaCrash();
       if(usuarioLogado.permissoes.length > 0){
        crash = await EstrategiaCrash.findOne({where:{ id:id }});
       }else{
        crash = await EstrategiaCrash.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
           });
       }


       return res.status(201).send({
         crash:crash
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updatecrash(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
        const {nome,sequencia,  valor_a,valor_b,apostar_em,martingale} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sequencia, 'sequencia', 'A seguencia é obrigatorio');
        contract.isRequired(valor_a, 'valor_a', 'A valor a é obrigatorio');
        contract.isRequired(valor_b, 'valor_b', 'A valor b é obrigatorio');
        contract.isRequired(apostar_em, 'apostar_em', 'O apostar_em é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var crashOld = new EstrategiaCrash();
        if(usuarioLogado.permissoes.length > 0){
            crashOld = await EstrategiaCrash.findOne({where:{ id:id }});
        }else{
            crashOld = await EstrategiaCrash.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
       

    if(!crashOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const crash = await crashOld.update({
            nome,
            sequencia,
            valor_a,
            valor_b,
            apostar_em,
            martingale,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        crash:crash

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},

async excluircrash(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaCrash.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaCrash.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},

//Premium Crash   ############################################################################
async indexcrahspremium(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        
        

        const  crashs = await EstrategiaCrashPremium.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            crashpremiums:crashs
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},
async showcrashpremium(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }

       var grupo = new Grupo();
       if(usuarioLogado.permissoes.length > 0){
         grupo = await Grupo.findOne({where:{ id:id }});
       }else{
         grupo = await Grupo.findOne({
            where: {
                [Op.and]: [
                  { usuario_id: usuarioLogado.id },
                  { id:id }
                ]
              }
    
           });
       }
       if(!grupo){
        return res.status(201).json({
            msg:'Grupo não existe',
           
        })
      }

       var crash =await EstrategiaCrashPremium.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
       });
      


       return res.status(201).send({
        crashpremium:crash,
        grupopremium:grupo
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},
async storecrashpremium(req,res){
    
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        
      
        const {nome, sair,aguardar,notificar,lista} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sair, 'sair', 'O sair é obrigatorio');
        contract.isRequired(aguardar, 'aguardar', 'O aguardar é obrigatorio');
        contract.isRequired(notificar, 'notificar', 'O notificar  é obrigatorio');
        contract.isRequired(sair_em, 'sair_em', 'O sair_em é obrigatorio');
        contract.isRequired(lista, 'lista', 'O lista é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const crash = await EstrategiaCrashPremium.create({
            bot_id:id,
            nome,
            sair,
            aguardar,
            notificar,
            lista,
            sair_em
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            crashpremium:crash

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},
async updatecrashpremium(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id } = req.params;
        const {nome,sair,aguardar,notificar,lista,sair_em} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(sair, 'sair', 'O sair é obrigatorio');
        contract.isRequired(aguardar, 'aguardar', 'O aguardar é obrigatorio');
        contract.isRequired(notificar, 'notificar', 'O notificar  é obrigatorio');
        contract.isRequired(sair_em, 'sair_em', 'O sair_em é obrigatorio');
        contract.isRequired(lista, 'lista', 'O lista é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var crashOld = new EstrategiaCrashPremium();
        if(usuarioLogado.permissoes.length > 0){
            crashOld = await EstrategiaCrashPremium.findOne({where:{ bot_id:id }});
        }else{
            crashOld = await EstrategiaCrashPremium.findOne({where:{ bot_id:id }});
        }
       

    if(!crashOld){
        const crash = await EstrategiaCrashPremium.create({
            bot_id:id,
            nome,  
            sair,
            aguardar,
            notificar,
            lista,
            sair_em
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            crashpremium:crash

        })
    }

   
    const crash = await crashOld.update({
        nome, 
        sair,
        aguardar,
        notificar,
        lista,
        sair_em
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        crash:crash

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},
async excluircrashpremium(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaCrashPremium.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaCrash.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},


//Premium Double   ############################################################################
async indexdoublepremium(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        
        

        const  crashs = await EstrategiaDoublePremium.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            crashpremiums:crashs
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},
async showdoublepremium(req,res){
    try{
       const { id } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }

       var grupo = new Grupo();
       if(usuarioLogado.permissoes.length > 0){
         grupo = await Grupo.findOne({where:{ id:id }});
       }else{
        grupo = await Grupo.findOne({where:{ id:id }});
       }
       if(!grupo){
        return res.status(201).json({
            msg:'Grupo não existe',
           
        })
      }

       var crash =await EstrategiaDoublePremium.findOne({
        where: {bot_id:id},
        order: [ [ 'id', 'DESC' ]],
       });
      


       return res.status(201).send({
        doublepremium:crash,
        grupopremium:grupo
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},
async storedoublepremium(req,res){
    
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const { id } = req.params; //bod_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Grupo não existe',
               
            })
        }
        
      
        const {nome,aguardar,intervalo,lista} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(intervalo, 'intervalo', 'O intervalo é obrigatorio');
        contract.isRequired(aguardar, 'aguardar', 'O aguardar é obrigatorio');
        contract.isRequired(lista, 'lista', 'O lista é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
          
        const crash = await EstrategiaDoublePremium.create({
            bot_id:id,
            nome,
            aguardar,
            intervalo,
            lista,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            doublepremium:crash

        })
     

    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},
async updatedoublepremium(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id } = req.params;
        const {nome,aguardar,intervalo,lista} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(intervalo, 'intervalo', 'O intervalo é obrigatorio');
        contract.isRequired(aguardar, 'aguardar', 'O aguardar é obrigatorio');
        contract.isRequired(lista, 'lista', 'O lista é obrigatorio');

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var crashOld = new EstrategiaDoublePremium();
        if(usuarioLogado.permissoes.length > 0){
            crashOld = await EstrategiaDoublePremium.findOne({where:{ bot_id:id }});
        }else{
            crashOld = await EstrategiaDoublePremium.findOne({where:{ bot_id:id }});
        }
       
   
    if(!crashOld){
        const crash = await EstrategiaDoublePremium.create({
            bot_id:id,
            nome,
            aguardar,
            intervalo,
            lista,
        }); 

        return res.status(201).json({
            resolucao:true,
            msg:"Estrategia cadastrado com sucesso",
            doublepremium:crash

        })
    }

   
    const crash = await crashOld.update({
        nome,
        aguardar,
        intervalo,
        lista,
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        doublepremium:crashOld

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},
async excluirdoublepremium(req,res){
         
    try{
        const { id,idbot } = req.params;
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }

        const estrategiaold = await EstrategiaDoublePremium.findOne({
            where: {
                [Op.and]: [
                  { bot_id: idbot},
                  { id:id }
                ]
              }
    
           });

     
          if(!estrategiaold){
            return res.status(201).json({
                msg:'Estrategia não existe',
               
            })
        }



    const estrategia = await EstrategiaDoublePremium.destroy({where:{id:estrategiaold.id}}); 

    return res.status(201).json({
        resolucao:true,
        msg:"Estrategia Excluida com sucesso",
        data:estrategia

    })
}
catch(err){
    return res.status(200).send({
        resolucao:false,
        error:err.message
    })
}

},

//Roeleta  ############################################################################
async indexRoleta(req,res){
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        const {id} = req.params;//bot_id
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        
        

        const  roletas = await EstrategiaRoleta.findAll({where:{bot_id:id}})

        return  res.status(200).send({
            roletas
        });




    }
    catch(err){
        res.status(200).send({
            error:err.message
        })
    }
},

async showroleta(req,res){
    try{
       const { id,idbot } = req.params;
       const token = req.body.token || req.query.token || req.headers['x-access-token'];
       const usuarioLogado = await authService.decodeToken(token);
       
       if(!usuarioLogado){
           return res.status(201).json({
               msg:'Usuario não existe',
              
           })
       }

       

       var roleta = new EstrategiaRoleta();
       if(usuarioLogado.permissoes.length > 0){
        roleta = await EstrategiaRoleta.findOne({where:{ id:id }});
       }else{
        roleta = await EstrategiaRoleta.findOne({
               where: {
                   [Op.and]: [
                    { bot_id: idbot},
                     { id:id }
                   ]
                 }
        });
       }


       return res.status(201).send({
        roleta:roleta
       })
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }

},

async updateroleta(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const usuarioLogado = await authService.decodeToken(token);
        
        if(!usuarioLogado){
            return res.status(201).json({
                msg:'Usuario não existe',
               
            })
        }
        const { id,idbot } = req.params;
         
      
        
        
        const {
            nome_roleta,
            sequencia_cor,  
            sequencia_maior_menor,
            sequencia_par_impar,
            sequencia_duzias,
            sequencia_colunas,
            martingale
        } = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome_roleta, 'nome_roleta', 'O Nome é obrigatorio');
        contract.isRequired(sequencia_cor, 'sequencia_cor', 'A seguencia de cor é obrigatorio');
        contract.isRequired(sequencia_maior_menor, 'sequencia_maior_menor', 'A sequencia maior menor a é obrigatorio');
        contract.isRequired(sequencia_par_impar, 'sequencia_par_impar', 'A sequencia par impar b é obrigatorio');
        contract.isRequired(sequencia_duzias, 'sequencia_duzias', 'A sequencia duzias é obrigatorio');
        contract.isRequired(sequencia_colunas, 'sequencia_colunas', 'A sequencia colunas  é obrigatorio');
        contract.isInteger(parseInt(martingale), 'martingale', 'O martingale é obrigatorio');
        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };
    
        var roletaOld = new EstrategiaRoleta();
        if(usuarioLogado.permissoes.length > 0){
            roletaOld = await EstrategiaRoleta.findOne({where:{ id:id }});
        }else{
            roletaOld = await EstrategiaRoleta.findOne({
                where: {
                    [Op.and]: [
                     { bot_id: idbot},
                      { id:id }
                    ]
                  }
            });
        }
       

    if(!roletaOld){
        return res.status(201).json({
            msg:'Estrategia não existe',
           
        })
    }

   
    const roleta = await roletaOld.update({
        nome_roleta,
        sequencia_cor,  
        sequencia_maior_menor,
        sequencia_par_impar,
        sequencia_duzias,
        sequencia_colunas,
        martingale
        
    }); 

    return res.status(201).json({
        msg:"Estrategia Atualizado com sucesso",
        roleta:roleta

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}

},

async mudastatusroleta(req,res){
    try{
        const {id} = req.params;
        const roleta = await EstrategiaRoleta.findByPk(id);
        if(!roleta){
            return res.status(200).send({
                msg:'Roleta não existe'
            });
        }
        if(roleta.status == 1){
            const roletaAtualizado = roleta.update({
                status:0
            })
            return res.status(201).send({
                msg:"Roleta Inativa",
                
            })
        }
        else{
            const roletaAtualizado = roleta.update({
                status:1
            })
            return res.status(201).send({
                msg:"Roleta Ativo",
                
            })
        }
       

       
    }
    catch(err){
        return res.status(200).send({
            error:err.message
        })
    }
},



async updatewinloss(req,res){
         
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
      
        const {nome,win,loss,id} = req.body;
        let contract = new ValidationContract();
        contract.isRequired(nome, 'nome', 'O Nome é obrigatorio');
        contract.isRequired(win, 'win', 'O win é obrigatorio');
        contract.isRequired(loss, 'loss', 'O loss é obrigatorio');
        contract.isRequired(id, 'id', 'O id é obrigatorio');
    

        // Se os dados forem inválidos
        if (!contract.isValid()) {
            return res.status(200).send({
            error:contract.errors()
            })
        };

        await updatewinlossEstrategias(nome,win,loss,id)
      
    return res.status(201).json({
        msg:"Jogo Atualizado com sucesso",

    })
}
catch(err){
    return res.status(200).send({
        error:err.message
    })
}
},


}

