const router = express.Router();

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
	  res.render('game-main', {
		  pageTitle: 'Play',
		  id: User.id,
		  pid: Player.id,
		  name: Player.name,
		  avatar: "/images/game/avatars/"+Player.gender+"/"+Player.avatar+".png",
		  email: User.email,
		  power: Player.power,
		  realm: Player.realm,
		  food: Player.food,
		  wood: Player.wood,
		  stone: Player.stone,
		  ore: Player.ore,
		  gold: Player.gold,
		  platinum: Player.platinum,
	  });
	 }
});

module.exports = router;