$(document).on('ready',function(){

	var distancia 	= $(window).scrollTop();
	var posicion 	= distancia * 0.15;
	var altura 		= 300;
	var desp 		= $('div.desplazamiento');
	var btn_up		= $('#btn_up');

	$(window).scroll(function(){
		

		if($(window).scrollTop()>altura)
		{
			desp.addClass('show');
		}
		else
		{
			desp.removeClass('show');
		}
		$('body').css({
			'backgroundPosition':'0 ' + posicion + 'px'
		});
	});

	btn_up.on('click',function(e){
		e.preventDefault();
		$('body, html').animate({scrollTop:'0px'},400);
	});

});