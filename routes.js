const router = express.Router();
var RealmService = require('./lib/services/realm')(db);

router.get("/", (req, res) => {
	res.render('site-home', {
		layout: 'site',
		pageTitle: 'Home',
	});
});

router.get('/login/', (req, res) => {
	res.render('user-login', {
		layout: 'site',
		pageTitle: 'Login',
	});
});

router.get('/register/', (req, res) => {
	res.render('user-register', {
		layout: 'site',
		pageTitle: 'Register',
	});
});

router.get('/game/', (req, res) => {
  if(typeof User == 'undefined'){
    res.redirect('/login/');
  }else{
   var bStr = '';
   var fStr = '';
   var rStr = '';
   
   for(var a = 1; a < 32; a++){
    for(var b = 0; b < Field.length; b++){
     if(Field[b].position == a){
      fStr += '<a id="field-plot'+a+'" class="age-1 '+Game.buildingTypesArray[Field[b].type]+'" onclick="building('+Field[b].type+'); return false;" style="margin-top: 0px;">&nbsp;</a>';
     }
    }
    fStr += '<a id="plot'+a+'" class="city-plot" onclick="fieldslot($(this), event); return false;" style="margin-top: 0px;">&nbsp;</a>';
   }
   
   for(var i = 1; i < 30; i++){
    for(var k = 0; k < Buildings.length; k++){
     if(Buildings[k].type == 0 && i == 16){
      bStr += '<a id="plot16" class="age-1 towncenter" onclick="building('+Buildings[k].type+'); return false;" style="margin-top: 0px;">&nbsp;</a>';
     } else if(Buildings[k].position == i){
      bStr += '<a id="plot'+i+'" class="age-1 '+Game.buildingTypesArray[Buildings[k].type]+'" onclick="building('+Buildings[k].type+'); return false;" style="margin-top: 0px;">&nbsp;</a>';
     }
    }
    bStr += '<a id="plot'+i+'" class="city-plot" onclick="buildslot($(this), event); return false;" style="margin-top: 0px;">&nbsp;</a>';
   }
   
   RealmService.get(Player.realm, (realm) => {
    for(var l = 0; l < realm.length; l++){
     rStr += '<a id="realm-plot'+l+'" class="realm-plot '+Game.tileTypesArray[realm[l].type]+'" onclick="realmslot('+realm[l].x+', ,'+realm[l].y+', '+Player.realm+'); return false;" style="margin-top: 0px;">&nbsp;</a>';
    }
    
    var data = {
     pageTitle: 'Play',
     User: User,
     Player: Player,
     age: City.age,
     City: City,
     Buildings: Buildings,
     buildingString: bStr,
     Field: Field,
     fieldString: fStr,
     Realm: realm,
     realmString: rStr
    };
   
    data.Player.avatarUrl = "/images/game/avatars/"+Player.gender+"/"+Player.avatar+".png";
    
    res.render('game-main', data);
   });
	 }
});

module.exports = router;