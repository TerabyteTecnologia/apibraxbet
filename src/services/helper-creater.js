const EstrategiaMiner = require('../models/dtb_estrategia_miner');
const MsgMiner = require('../models/dtb_mensagem_padrao_miner');
const EstrategiaAviator = require('../models/dtb_estrategia_aviator');
const MsgAviator = require('../models/dtb_mensagem_padrao_aviator');
const EstrategiaFutbalStudio = require('../models/dtb_estrategia_futballstudio');
const MsgFutballStudio = require('../models/dtb_mensagem_padrao_futballstudio');
const EstrategiaPenalty = require('../models/dtb_estrategia_penalty');
const MsgPenalty = require('../models/dtb_mensagem_padrao_penalty');
const EstrategiaFantan = require('../models/dtb_estrategia_fantan');
const MsgFantan = require('../models/dtb_mensagem_padrao_fantan');
module.exports ={
    async createMiner(tipoJogoId){
        await EstrategiaMiner.create({
            bot_id:tipoJogoId,
            espera:2,
            tentativas:3,
            minas_a:3,
            minas_b:5,
            entrada_a:4,
            entrada_b:6,
        }); 

            
        await MsgMiner.create({
            bot_id:tipoJogoId,
            abertura:'             ⚠️ ATENÇÃO ⚠️ \n\nIniciaremos o envio dos sinais em breve. \n\nFique atento e proveita.', 
            fechamento:'             Sinais encerrados \nSe você deseja continuar recebendo os sinais 24Hrs, convidamos a fazer parte do nosso grupo VIP. \nNão perca esta oportunidade!',  
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',

            confirmacao:'🟢🟢 Entrada Confirmada 🟢🟢||🔵🔵 Entrada Finalizada 🔵🔵|| \n\n💣 Selecione com [NUMERO_MINAS] minas \n\n🎯Entrada: \n[ENTRADA] \n⏱ Valido até as [HORARIO] \n🎲 Tentativas: [TENTATIVAS] \n🎰 BraxBet: [LINK_JOGO]',

            parcial:'🚀Resultado parcial  \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            tipomensagem:1,
        }); 

        await MsgMiner.create({
            bot_id:tipoJogoId,
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',

            confirmacao:'🟢🟢 Entrada Confirmada 🟢🟢||🔵🔵 Entrada Finalizada 🔵🔵|| \n\n💣 Selecione com [NUMERO_MINAS] minas \n\n🎯Entrada: \n[ENTRADA] \n⏱ Valido até as [HORARIO] \n🎲 Tentativas: [TENTATIVAS] \n🎰 BraxBet: [LINK_JOGO]',

            parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            tipomensagem:2,
        }); 
    },

    async createAviator(tipoJogoId){
        await EstrategiaAviator.create({
            bot_id:tipoJogoId,
            nome:'Padrão 1',
            sequencia:'AZUL,AZUL',
            apostar_em:'1.5',
            martingale:'2',
           }); 

           await EstrategiaAviator.create({
            bot_id:tipoJogoId,
            nome:'Padrão 2',
            sequencia:'AZUL,AZUL,AZUL,AZUL,AZUL',
            apostar_em:'2',
            martingale:'2',
           }); 

           await EstrategiaAviator.create({
            bot_id:tipoJogoId,
            nome:'Padrão 3',
            sequencia:'ROSA,ROSA',
            apostar_em:'1.5',
            martingale:'2',
           }); 

           
           await EstrategiaAviator.create({
            bot_id:tipoJogoId,
            nome:'Padrão 3',
            sequencia:'ROXO,ROXO',
            apostar_em:'1.5',
            martingale:'2',
           }); 

           //Mensagem futballstudio #################################
           await MsgAviator.create({
            bot_id: tipoJogoId,
            abertura:'             ⚠️ ATENÇÃO ⚠️ \n\nIniciaremos o envio dos sinais em breve. \n\nFique atento e proveita fechamento', 
            fechamento:'             Sinais encerrado \n\nSe você deseja continuar recebendo os sinais 24Hrs, convidamos a fazer parte do nosso grupo VIP. \n\nNão perca esta oportunidade!',  
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            
            cofirmacao:'🔔 Entrada Confirmada 🔔||🔕 Entrada Finalizada 🔕|| \n🎰 Braxbet: [LINK_JOGO] \n💰 Entrar após [ULTIMA_VELA]  \n🚀 Auto retirar [ENTRADA]',

            win:'✅✅✅GREEN - BATEU META? VAZA \n[RESULTADOS]',
            
            loss:'⛔ RED - SEGUE GERENCIAMENTO \n[RESULTADOS]',

            martingale:'🔁 [NUMERO]º Martingale!',

            branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑 Empate 🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
            parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            tipomensagem:1,
           });

           await MsgAviator.create({
            bot_id: tipoJogoId,
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            
            cofirmacao:'🔔 Entrada Confirmada 🔔||🔕 Entrada Finalizada 🔕|| \n🎰 Braxbet: [LINK_JOGO] \n💰 Entrar após [ULTIMA_VELA]  \n🚀 Auto retirar [ENTRADA]',

            
            win:'✅✅✅GREEN - BATEU META? VAZA \n[RESULTADOS]',
            
            loss:'⛔ RED - SEGUE GERENCIAMENTO \n[RESULTADOS]',

            martingale:'🔁 [NUMERO]º Martingale!',

            branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑 Empate 🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
            parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            tipomensagem:2,
           });  
    },

    async createFootBallStudio(tipoJogoId){
            await EstrategiaFutbalStudio.create({
                bot_id:tipoJogoId,
                nome:'Padrão 1',
                sequencia:'V,V',
                apostar_em:'C',
                martingale:'2',
            }); 

            await EstrategiaFutbalStudio.create({
                bot_id:tipoJogoId,
                nome:'Padrão 2',
                sequencia:'C,C',
                apostar_em:'V',
                martingale:'2',
              }); 

            await EstrategiaFutbalStudio.create({
                bot_id:tipoJogoId,
                nome:'Padrão 3',
                sequencia:'E,C',
                apostar_em:'V',
                martingale:'2',
              }); 
            await EstrategiaFutbalStudio.create({
                bot_id:tipoJogoId,
                nome:'Padrão 4',
                sequencia:'E,C',
                apostar_em:'C',
                martingale:'2',
              }); 

              //Mensagem futballstudio #################################
            await MsgFutballStudio.create({
                bot_id: tipoJogoId,
                abertura:'             ⚠️ ATENÇÃO ⚠️ \n\nIniciaremos o envio dos sinais em breve. \n\nFique atento e proveita fechamento', 
                fechamento:'             Sinais encerrado \n\nSe você deseja continuar recebendo os sinais 24Hrs, convidamos a fazer parte do nosso grupo VIP. \n\nNão perca esta oportunidade!',  
                atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            
                cofirmacao:'🔔🔔 Entrada Confirmada 🔔||🔕 Entrada Finalizada 🔕|| \n🎰 Braxbet: [LINK_JOGO] \n📍 Entrar Após [ULTIMA_COR] \n🟠 Cobrir o Empate \n💰 Apostar: [ENTRADA]',

                win:'✅✅✅GREEN - BATEU META? VAZA \n[RESULTADOS]',
                
                loss:'⛔ RED - SEGUE GERENCIAMENTO \n[RESULTADOS]',

                martingale:'🔁 [NUMERO]º Martingale!',

                branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑 Empate 🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
                parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                tipomensagem:1,
            });
            await MsgFutballStudio.create({
                bot_id: tipoJogoId,
                atencao:'⚠️ ATENÇÃO possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            
                cofirmacao:'🔔🔔 Entrada Confirmada 🔔||🔕 Entrada Finalizada 🔕|| \n🎰 Braxbet: [LINK_JOGO] \n📍 Entrar Após [ULTIMA_COR] \n🟠 Cobrir o Empate \n💰 Apostar: [ENTRADA]',

                win:'✅✅✅GREEN - BATEU META? VAZA \n[RESULTADOS]',
                
                loss:'⛔ RED - SEGUE GERENCIAMENTO \n[RESULTADOS]',

                martingale:'🔁 [NUMERO]º Martingale!',

                branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑 Empate 🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
                parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
                tipomensagem:2,
            });  
    },

    async createPenalty(tipoJogoId){
        
        await EstrategiaPenalty.create({
            bot_id:tipoJogoId,
            esperar:2,
            tentativa:2,
        }); 
         //free
         await MsgPenalty.create({
            bot_id:tipoJogoId,
            abertura:'             ⚠️ ATENÇÃO ⚠️ \n\nIniciaremos o envio dos sinais em breve. \n\nFique atento e proveita fechamento', 
            fechamento:'             Sinais encerrado \n\nSe você deseja continuar recebendo os sinais 24Hrs, convidamos a fazer parte do nosso grupo VIP. \n\nNão perca esta oportunidade!',  
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            cofirmacao:'🟢🟢 Entrada Confirmada 🟢🟢||🔵🔵 Entrada Finalizada 🔵🔵|| \n\n🎯Entrada: [BANDEIRAS] \n🔥Buscando: [VELA][ENTRADA] \n🎰 BraxBet [LINK_JOGO] \n\n🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            tipomensagem:1,
          });

          //vip
        await MsgPenalty.create({
            bot_id:tipoJogoId,
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            cofirmacao:'🟢🟢 Entrada Confirmada 🟢🟢||🔵🔵 Entrada Finalizada 🔵🔵|| \n\n🎯 Selecione a Bandeira: [BANDEIRAS] \n[ENTRADA] \n🎰 BraxBet [LINK_JOGO] \n\n🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟 \n\n🎲 Tentativas: [TENTATIVAS] \n\n⏱ Valido até as [HORARIO]',
            tipomensagem:2,
        }); 
    },

    async createFantan(tipoJogoId){
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 1',
            sequencia:'1,1',
            apostar_em:'3-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 2',
            sequencia:'1,2',
            apostar_em:'1-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 3',
            sequencia:'1,3',
            apostar_em:'1-3',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 4',
            sequencia:'1,4',
            apostar_em:'1-2',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 5',
            sequencia:'2,1',
            apostar_em:'3-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 6',
            sequencia:'2,2',
            apostar_em:'2-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 7',
            sequencia:'2,3',
            apostar_em:'3-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 8',
            sequencia:'2,4',
            apostar_em:'1-3',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 9',
            sequencia:'3,1',
            apostar_em:'1-2',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 10',
            sequencia:'3,2',
            apostar_em:'3-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 11',
            sequencia:'3,3',
            apostar_em:'1-2',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 12',
            sequencia:'3,4',
            apostar_em:'1-2',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 13',
            sequencia:'4,1',
            apostar_em:'3-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 14',
            sequencia:'4,2',
            apostar_em:'1-2',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 15',
            sequencia:'4,3',
            apostar_em:'3-4',
            martingale:'2',
        }); 
        await EstrategiaFantan.create({
            bot_id:tipoJogoId,
            nome:'Padrão 16',
            sequencia:'4,4',
            apostar_em:'1-2',
            martingale:'2',
        }); 

        await MsgFantan.create({
            bot_id:tipoJogoId,
            abertura:'             ⚠️ ATENÇÃO ⚠️ \n\nIniciaremos o envio dos sinais em breve. \n\nFique atento e proveita.', 
            fechamento:'             Sinais encerrados \n\nSe você deseja continuar recebendo os sinais 24Hrs, convidamos a fazer parte do nosso grupo VIP. \n\nNão perca esta oportunidade!',  
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            
            cofirmacao:'🔔 Entrada Confirmada 🔔||🔕 Entrada Finalizada 🔕|| \n📍 Entrar Após [ULTIMO_NUMERO] \n🎰 BraxBet: [LINK_JOGO] \n💰 Apostar: [ENTRADA]',

            
            win:'✅✅✅GREEN - BATEU META? VAZA  \n[RESULTADOS]',
            
            loss:'⛔ RED - SEGUE GERENCIAMENTO \n[RESULTADOS]',

            martingale:'🔁 [NUMERO]º Martingale!',

            branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑Green no Branco🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
            parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS])  \nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            tipomensagem:1,
        }); 
        await MsgFantan.create({
            bot_id: tipoJogoId,
            atencao:'⚠️ ATENÇÃO, possível entrada \n⌚️ Aguarde a confirmação \n🎰 BraxBet: [LINK_JOGO] \n\n      🌟🌟🌟 [LINK_CADASTRE_AQUI] 🌟🌟🌟',
            
            cofirmacao:'🔔 Entrada Confirmada 🔔||🔕 Entrada Finalizada 🔕|| \n📍 Entrar Após [ULTIMO_NUMERO] \n🎰 BraxBet: [LINK_JOGO] \n💰 Apostar: [ENTRADA]',

            
            win:'✅✅✅GREEN - BATEU META? VAZA  \n[RESULTADOS]',
            
            loss:'⛔ RED - SEGUE GERENCIAMENTO \n[RESULTADOS]',

            martingale:'🔁 [NUMERO]º Martingale!',

            branco:'🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n🤑🤑🤑🤑🤑Green no Branco🤑🤑🤑🤑🤑\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
            parcial:'🚀Resultado parcial \n\n✅([ACERTOS]) VS ❌([ERROS])  \nAssertividade: [PORCENTAGEM_ACERTO]',
            final:'🚀Resultado Final \n\n✅([ACERTOS]) VS ❌([ERROS]) \nAssertividade: [PORCENTAGEM_ACERTO]',
            tipomensagem:2,
        }); 

    },

    async updatewinlossEstrategias(tipoJogoName,win,loss,id){
        
         ///Monta as estrategias e mensagem ;;;;; melhorar isso atravazes de utils
         console.log('tipoJogoName',tipoJogoName)
          if(tipoJogoName.includes('Crash')){
            var aviator = await EstrategiaAviator.findOne({where:{ id:id }});
            console.log('aviator',aviator)
            await aviator.update({
                win:win,
                loss:loss
             }); 
          }else if(tipoJogoName.includes('Mines')){
            var miner = await EstrategiaMiner.findOne({where:{ id:id }});
            await miner.update({
                win:win,
                loss:loss
             }); 
          }else if(tipoJogoName.includes('Fantan')){
            var fantan = await EstrategiaFantan.findOne({where:{ id:id }});
            await fantan.update({
                win:win,
                loss:loss
             })
          }else if(tipoJogoName.includes('FootBallStudio')){
            var footBallEstudio = await EstrategiaFutbalStudio.findOne({where:{ id:id }});
            await footBallEstudio.update({
                win:win,
                loss:loss
             })

          }else if(tipoJogoName.includes('Penalty')){
            var penalty = await EstrategiaPenalty.findOne({where:{ id:id }});
            await penalty.update({
                win:win,
                loss:loss
             })
         
          }else if(tipoJogoName.includes("CPremium")){             
           //implementar
          }else if(tipoJogoName == "Roleta"){
        
                    let rouletes_name=[
                            "Super Spin Roulette",
                            "bet365 Roulette",
                            "bet365 Dutch Roulette",
                            "Who Wants To Be a Millionaire Roulette",
                            "Mega Fire Blaze Roulette Live",
                            "Quantum Roulette Live",
                            "Roulette",
                            "Age Of The Gods Bonus Roulette",
                            "Football Roulette",
                            "Hindi Roulette",
                            "Speed Roulette",
                            "Greek  Roulette",
                            "Turkish Roulette",
                            "Roleta Brasileira",
                            "Quantum Auto Roulette",
                            "Speed Auto Roulette",
                            "Prestige Roulette",
                            "American Roulette",
                            "Spread Bet Roulette",
                            "Deutsches Roulette",
                            "Auto Roulette",
                            "Greek Quantum Roulette",
                            "UK Roulette",
                            "Quantum Roulette Italiana",
                            "Triumph Roulette",
                            "Roulette Italiana",
                        ]
  
            rouletes_name.forEach( async (res) =>{
  
                await EstrategiaRoleta.create({
                    bot_id:tipoJogo.id,
                    nome_roleta:res,
                    sequencia_cor:11,
                    sequencia_maior_menor:11,
                    sequencia_par_impar:11,
                    sequencia_duzias:8,
                    sequencia_colunas:8,
                    martingale:2,
                    status:1,
                }); 
  
            })
  
          
            
            
          }else{
            //Estrategia Crash
            await EstrategiaCrash.create({
                bot_id:grupo.id,
                nome:'Jogada 1.5',
                sequencia:3,
                valor_a:1,
                valor_b:1.5,
                apostar_em:1.5,
                martingale:2,
            });
            
            await EstrategiaCrash.create({
                bot_id:grupo.id,
                nome:'Jogada 2.0',
                sequencia:8,
                valor_a:1,
                valor_b:1.5,
                apostar_em:2,
                martingale:2,
            }); 
        
          }
  
    }

}