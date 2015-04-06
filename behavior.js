$(document).ready(function(){
	$('a').click(function(e){
		e.preventDefault();
		var offset = $($(this).attr('href')).offset();
		$('html, body').animate({
			scrollTop: offset.top
		}, 500);
		$('a').removeClass('selected');
		$(this).addClass('selected');
	});
});