RoC.Tpl = {
 init: () => {
  Socket.on("tpl-gender-result", (data) => {
   var html = RoC.Tpl.build(data);
   $('.avatars').html(html);
  });
  
  Socket.on("realm-get-results", (data) => {
   console.log(data);
   for(var i = 0; i < data.length; i++){
    var el = $('<a id="realm-' + data[i].x + '_' + data[i].y + '" class="'+RoC.Game.tileTypesArray[data[i]]+' realm-tile" onclick="tileclick(this, event); return false;" style="margin-top: 0px;">&nbsp;</a>');
    $('#realm-map').append(el);
   }
   
   gameStart(function(){
    setVisible('#gameDiv', true);
    setVisible('#loading', false);
   });
  });
  
  Socket.on('tpl-build-options-result', (data) => {
   var html = RoC.Tpl.build(data);
   RoC.Tpl.buildModal('buildOptsModal', html);
  });
 },
 build: (data) => {
  var template = Handlebars.compile(data.html);
  return template(data.data);
 },
 buildModal: (id, html) => {
  var $el = $('<div id="'+id+'" class="modal">'+html+'</div>');
  
  var modalhtml = '<div id="'+id+'" class="modal-body">'+
      '<p>'+html+'</p>'+
     '</div>';
  
  $('body').append(modalhtml);
  $('#'+id).modal();
 },
	buildField: () => {
	 for(var i = 0; i < RoC.models.Field.buildings.length; i++){
	  var b = RoC.models.Field.buildings[i], $el;
	  $el = $('a#field-plot'+b.position);
	  var c = RoC.Game.buildingTypeArray[b.type]+'-'+RoC.models.City.age;
	  $el.addClass(c);
	  $el.addClass('field-building');
	 }
	},
 buildRealm: () => {
  Socket.emit("realm-get", RoC.models.Player.realm);
 }
};

Handlebars.registerHelper('iff', (a, operator, b, opts) => {
 var bool = false;
 switch(operator) {
  case '==':
   bool = a == b;
   break;
  case '>':
   bool = a > b;
   break;
  case '<':
   bool = a < b;
   break;
  default:
   throw "Unknown operator " + operator;
 }
 
 if (bool) {
  return opts.fn(this);
 } else {
		return opts.inverse(this);
	}
});