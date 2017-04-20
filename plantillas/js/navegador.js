$(document).on('ready',function(){
	var boton_menu	= $('#card-menu');
	var estado		= 1;
	var menu 		= $('#menu-desplegable');
	boton_menu.on('click',function(e){
		e.preventDefault();
		if(estado==1)
		{
			boton_menu.addClass('active');
			menu.slideDown();
			menu.addClass('active');
			estado=0;
		}
		else
		{
			boton_menu.removeClass('active');
			menu.slideUp();
			menu.removeClass('active');
			estado=1;
		}
	});
});