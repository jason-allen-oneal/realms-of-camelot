var fs = require('fs');
TplService = require('../services/tpl')(db);
var Game = require('../game');

module.exports = {init};

function init(socket){
 socket.on('tpl-build-options', () => {
  fs.readFile('views/partials/buildOptions.html', 'UTF8', (err, data) => {
   if(err){ throw err; }
   
   var canBuildTower = true, canBuildBlacksmith = true, canBuildMarket = true, canBuildUniversity = true, canBuildMonastery = true;
   
   for(var i = 0; i < Buildings.length; i++){
    if(Buildings[i].type == 9){
     canBuildTower = false;
    }
    if(Buildings[i].type == 10){
     canBuildBlacksmith = false;
    }
    if(Buildings[i].type == 11){
     canBuildMarket = false;
    }
    if(Buildings[i].type == 12){
     canBuildMonastery = false;
    }
    if(Buildings[i].type == 13){
     canBuildUniversity = false;
    }
   }
   
   var buildOpts = [],
    canBuild = true;
    
   for(var j = 1; j < Game.buildingTypesArray.length; j++){
    var costs = Game.buildingCosts[Game.buildingTypesArray[j]];
    
    if(j == 9 && !canBuildTower){
     canBuild = false;
    }
    if(j == 10 && !canBuildBlacksmith){
     canBuild = false;
    }
    if(j == 11 && !canBuildMarket){
     canBuild = false;
    }
    if(j == 12 && !canBuildMonastery){
     canBuild = false;
    }
    if(j == 13 && !canBuildUniversity){
     canBuild = false;
    }
    
    if(Player.food < costs.food){
     canBuild = false;
    }
    if(Player.wood < costs.wood){
     canBuild = false;
    }
    if(Player.stone < costs.stone){
     canBuild = false;
    }
    if(Player.ore < costs.ore){
     canBuild = false;
    }
    if(Player.gold < costs.gold){
     canBuild = false;
    }
    
    var d = {
     name: Game.buildingTypesArray[j],
     type: j,
     costs: costs,
     canBuild: canBuild,
     age: City.age,
    };
    buildOpts.push(d);
   }
   
   let json = {
    data: {
     buildOpts: buildOpts,
    },
    html: data
   };
   socket.emit('tpl-build-options-result', json);
  });
 });
 
 socket.on('tpl-gender-change', (gender) => {
  fs.readFile("views/partials/avatars.html", "UTF8", (err, data) => {
   if (err) { throw err };
   
   var g;
   if(gender == 0){
    g = 'male';
   }else{
    g = 'female';
   }
   
   let json = {
    data: {
     gender: g
    },
    html: data
   };
   socket.emit('tpl-gender-result', json);
  });
 });
}