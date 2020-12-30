for(var i = 0; i < IMGS.length; i++){
 var preImg = $('<link rel="prefetch" href="'+IMGS[i]+'" as="image">');
 $('head').append(preImg);
}

$(function(){
 var loc = window.location.href;
 if(/login/.test(loc)){
  $('.nav-login').siblings().removeClass('active');
  $('.nav-login').addClass('active');
 }
 if(/register/.test(loc)){
  $('.nav-register').siblings().removeClass('active');
  $('.nav-register').addClass('active');
 }
});

var Socket = io.connect();

function setCookie(name,value,days) {
 var expires = "";
 if (days) {
  var date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
 }
 document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
 var nameEQ = name + "=";
 var ca = document.cookie.split(';');
 for(var i=0;i < ca.length;i++) {
  var c = ca[i];
  while (c.charAt(0)==' ') c = c.substring(1,c.length);
  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
 }
 return null;
}

function eraseCookie(name) {
 document.cookie = name+'=; Max-Age=-99999999;';  
}

function poll(callback){
 var intervalId = window.setInterval(function(){
 Socket.emit("player-get", RoC.models.Player.id);
 }, 6000);
}

function gameStart(callback) {
 var intervalId = window.setInterval(function(){
  if(document.getElementsByTagName('body')[0] !== undefined){
   window.clearInterval(intervalId);
   callback.call(this);
  }
 }, 1000);
}

function setVisible(s, visible){
 document.querySelector(s).style.display = visible ? 'block' : 'none';
}

function buildslot(el,e){
 e.preventDefault();
 if(el.hasClass('building')){
  // plot has building, open its dialog
 }else{
  // empty build slot. open build options
  Socket.emit('tpl-build-options');
 }
}

