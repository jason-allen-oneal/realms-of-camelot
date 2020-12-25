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
   console.log(Buildings);
   var data = {
    pageTitle: 'Play',
    User: User,
    Player: Player,
    City: City,
    Buildings: Buildings
   };
   
   data.Player.avatarUrl = "/images/game/avatars/"+Player.gender+"/"+Player.avatar+".png";
   
	  res.render('game-main', data);
	 }
});

module.exports = router;