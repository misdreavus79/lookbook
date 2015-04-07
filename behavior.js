var slideShowAnimation = {
	slideCounter: false,

	slides: document.querySelectorAll('#slideshow img'),

	initialWidth: 0,

	direction: '-',

	animate: function(width){

		if(this.slideCounter === 5){
			this.direction = '';
			this.initialWidth = 0;
			this.slideCounter = 4;
		}else if(this.slideCounter === -1 || this.slideCounter === false){
			this.slideCounter = 0;
			this.initialWidth = width;
			this.direction = '-';
		}

		console.log(this.initialWidth, this.direction, this.slideCounter);
		this.slides[this.slideCounter].style.marginLeft = this.direction + this.initialWidth + 'px';
		
		if(this.direction === '-'){
			this.slideCounter++;
		}else{
			this.slideCounter--;
		}
	}
};
$(document).ready(function(){
	var processing = false;
	$('a').click(function(e){
		e.preventDefault();
		processing = true;

	  	//for the purposes of this test, 
	  	//I'm not comparing the hash because 
	  	//I know all of my a tags are anchors to the respective sections
		var offset = $($(this).attr('href')).offset(); 
		$('html, body').animate({
			scrollTop: offset.top //animate the scrolling
		}, 700, function(){
			processing = false;
		});

		//add the underlining to the current section
		$('a').removeClass('selected'); 
		$(this).addClass('selected');
	});
	$(document).on('scroll', function(){
		if(!processing){
			var yey = $(this).scrollTop();
			var elements = [
							[$('#section1').attr('id'), $('#section1').offset().top],
							[$('#section2').attr('id'), $('#section2').offset().top],
							[$('#section3').attr('id'), $('#section3').offset().top],
							[$('#section4').attr('id'), $('#section4').offset().top]
			];
			if(yey < elements[0][1] || (yey >= elements[0][1] && yey < elements[1][1])){	
				$('a').removeClass('selected'); 
				$('a[href="#' + elements[0][0] + '"]').addClass('selected');
			}else if(yey >= elements[1][1] && yey < elements[2][1]){
				$('a').removeClass('selected'); 
				$('a[href="#' + elements[1][0] + '"]').addClass('selected');
			}else if(yey >= elements[2][1] && yey < elements[3][1]){
				$('a').removeClass('selected'); 
				$('a[href="#' + elements[2][0] + '"]').addClass('selected');
			}else if(yey >= elements[3][1]){
				$('a').removeClass('selected'); 
				$('a[href="#' + elements[3][0] + '"]').addClass('selected');
			}
		}
	});
	var slideshowWidth = $('#slideshow img').first().width();
	var containerWidth = slideshowWidth * 6;
	$('#slideshow').width(slideshowWidth);
	$('.slideshowContainer').width(containerWidth);
	if(slideshowWidth !== $('#slideshow img').first().width()){
		$('#slideshow img').each(function(){
			$(this).width(slideshowWidth);
		});
	}

	// window.setInterval(function(){
	// 	slideShowAnimation.animate(slideshowWidth);
	// }, 3000);
});