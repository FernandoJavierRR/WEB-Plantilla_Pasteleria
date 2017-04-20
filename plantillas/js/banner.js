$(document).on('ready',function(){

	var carrusel = $('#carrusel');
	var items = carrusel.find('figure');
	var clon = items.clone();
	var current_banner = 0;
	var next_banner = 1;
	var prev_banner = -1;
	var btn_d = $('#boton_right');
	var btn_i = $('#boton_left');
	var controles = $('#controles');
	var controles_items;
	var intervalo;
	var output = "";

	btn_d.on('click',function(){
		moveD();
		clearInterval(intervalo);
		autoplay();
	});
	btn_i.on('click',function(){
		moveI();
		clearInterval(intervalo);
		autoplay();
	})
	carrusel.css('width',items.length + '00%');
	if(items.length == 2)
	{
		clon.apperndTo(carrusel);
		items = carrusel.find('figure');
	}
	if(items.length > 2)
	{
		$('#carrusel figure:last').insertBefore('#carrusel figure:first');
		carrusel.css({
			'width':items.length + '00%',
			'marginLeft':'-100%'
		});
	}

	function moveD(lapso = 900)
	{
		if(items.length > 2)
		{
			if(next_banner >= items.length){next_banner = 0;}
			current_banner = next_banner;
			prev_banner = current_banner - 1;
			next_banner = current_banner + 1;
			carrusel.animate({'marginLeft':'-200%'},lapso,function(){
				$('#carrusel figure:first').insertAfter('#carrusel figure:last');
				carrusel.css({'marginLeft':'-100%'});
				controles_items.removeClass('active').eq(current_banner).addClass('active');
			});
		}
	}
	function moveI(lapso = 900)
	{
		if(items.length > 2)
		{
			if(prev_banner < 0){prev_banner = items.length-1;}
			current_banner = prev_banner;
			prev_banner = current_banner-1;
			next_banner = current_banner+1;
			carrusel.animate({'marginLeft':'0%'},lapso,function(){
				$('#carrusel figure:last').insertBefore('#carrusel figure:first');
				carrusel.css({'marginLeft':'-100%'})
				controles_items.removeClass('active').eq(current_banner).addClass('active');
			});
		}
	}
	function numeracion()
	{
		for(var i = 0; i < items.length; i++ )
		{
			if(i == current_banner)	{output+='<li class="active">'+(i+1)+'</li>';}
			else{output+='<li>'+(i+1)+'</li>';}
		}
		controles.html(output).on('click','li',function(){
			if(current_banner != $(this).index()){
				changeBanner($(this).index());
			}
		});
		controles_items = $('#controles li')
	}
	function changeBanner(indice)
	{
		clearInterval(intervalo);
		var diferencia = indice - current_banner;
		if(diferencia!=0){
			if(diferencia < 0)
			{
				diferencia = diferencia* -1;
				if(diferencia==1){moveI();}
				else{moveLongI(diferencia,indice);}
			}
			else
			{
				if(diferencia==1){moveD();}
				else{moveLongD(diferencia,indice)}	
			}
		}		
		autoplay();
	}
	function moveLongD(diferencia,indice)
	{
		current_banner = indice;
		prev_banner = current_banner-1;
		next_banner = current_banner+1;
		carrusel.css({'marginLeft':'0%'})
		$('#carrusel figure:first').insertAfter('#carrusel figure:last');
		carrusel.animate({'marginLeft':'-'+diferencia+'00%'},900,function(){
			for(var i = 0; i < (diferencia-1); i++)
			{
				$('#carrusel figure:first').insertAfter('#carrusel figure:last');
			}
			carrusel.css({'marginLeft':'-100%'});
		});
		controles_items.removeClass('active').eq(current_banner).addClass('active');
	}
	function moveLongI(diferencia,indice)
	{
		current_banner = indice;
		prev_banner = current_banner-1;
		next_banner = current_banner+1;
		for(var i = 0; i < (diferencia-1); i++)
		{
			$('#carrusel figure:last').insertBefore('#carrusel figure:first');
		}
		carrusel.css({'marginLeft':'-'+diferencia+'00%'})		
		carrusel.animate({'marginLeft':'0%'},900,function(){
			$('#carrusel figure:last').insertBefore('#carrusel figure:first');
			carrusel.css({'marginLeft':'-100%'});
		});
		controles_items.removeClass('active').eq(current_banner).addClass('active');
	}
	function autoplay(tiempo = 6000)
	{
		intervalo = setInterval(moveD,tiempo);
	}	
	numeracion();
	autoplay();
});