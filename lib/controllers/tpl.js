var fs = require('fs');
TplService = require('../services/tpl')(db);

module.exports = {init};

function init(socket){
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
		
		socket.on('tpl-view-change', (view) => {
		 console.log(view);
		 if(TplService.view !== view){
		  TplService.view = view;
		  
		  fs.readFile("views/partials/"+TplService.view+".html", "UTF8", (err, data) => {
		   if (err) { throw err };
		   
		   switch(TplService.view){
		    default:
		    case 'city':
		     TplService.city(Player.id, Player.realm, (data) => {
		      console.log(data);
		      socket.emit('tpl-view-update', data);
		     });
		    break;
		    case 'fields':
		     TplService.fields((data) => {
		      
		     });
		    break;
		    case 'realm':
		     if(TplService.mapLoaded){
		      TplService.realm((data) => {
		       
		      });
		     }else{
		      TplService.create((result) => {
		       
		      });
		     }
		    break;
		   }
		  });
		 }
		});
}