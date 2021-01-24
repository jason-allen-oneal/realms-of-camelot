RoC.events = {
 init: () => {
  // Global events
  $(document).on($.modal.AFTER_CLOSE, function(event, modal){
   $(modal.$elm[0]).remove();
  });
  
  // User-based events
  $(document).on('change', '#inputGender', function(e){
   e.preventDefault();
   var gender = $(this).val();
   Socket.emit('tpl-gender-change', gender);
  });
	  
	 $(document).on('click', '#register', function(e){
	  e.preventDefault();
	   
	  var name = $('input[name=username]').val(),
	   email = $('input[name=email]').val(),
	   gender = $('select[name=gender]').val(),
	   avatar = $("input[name='avatar']:checked").val(),
	   password = $('input[name=password]').val();
	   
	  if(name == '' || email == '' || password == ''){
	   // modal showing error
	  }else{
	   var data = {
	    name: name,
	    email: email,
	    gender: gender,
	    avatar: avatar,
	    password: password
	   };
	    
	   Socket.emit('user-register', data);
	  }
	 });
	  
	 $(document).on('click', '#login', function(e){
	  e.preventDefault();
	   
	  var email = $('input[name=email]').val(),
	   password = $('input[name=password]').val();
	   
	  if(email == '' || password == ''){
	   // modal showing error
	   console.log('login error');
	  }else{
	   Socket.emit('user-login', {email: email, password: password});
	  }
	 });
	 // End User-based events
	 
	 // Game events
	 $(document).on('click', '.viewSelect', function(e){
	  e.preventDefault();
	  var idStr = $(this).attr('id');
	  var idParts = idStr.split('-');
	  var id = idParts[1];
	  $("#"+id+"-view").siblings().hide();
	  $("#"+id+"-view").show();
	 });
	 
	 // End Game events
	}
};