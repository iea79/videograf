$(function()
{
	if (isXsWidth()) return false;
	$('.scrolled').each(
		function()
		{
			$(this).jScrollPane(
				{
					showArrows: $(this).is('.arrow')
				}
			);
			var api = $(this).data('jsp');
			var throttleTimeout;
			$(window).bind(
				'resize',
				function()
				{
					if (!throttleTimeout) {
						throttleTimeout = setTimeout(
							function()
							{
								api.reinitialise();
								throttleTimeout = null;
							},
							50
						);
					}
				}
			);
		}
	)
	var boxPosition = $('.jspPane').scrollTop();
	$('.jobs__content').scroll(function(e) {
		// console.log('scroll');
		// console.log(e.target);
		// console.log(e.target.classList);
		if (e.target.classList[1] == 'scrolled') {
			var scroll = $(e.target);
			var inner = scroll.find('.jspPane');
			var sHeight = scroll.innerHeight();
			var inHeight = inner.innerHeight();
			var scrolled = inner.offset().top;
			// inner.css('border', '4px solid red')
			// console.log(boxPosition);
			// console.log(scrolled);
			// console.log(sHeight - inHeight);
			// console.log(inner.offset().top);

			// console.log(app.fScroll);

			if(app.fScroll === false) {
				// console.log('down');
				if (scrolled == 0 || scrolled == (sHeight - inHeight)) {
					$('body').removeClass('disabled-onepage-scroll');
				} else {
					$('body').addClass('disabled-onepage-scroll');
				}
			}

			// if(app.fScroll === false) {
			// 	// console.log('down');
			// 	if (scrolled == (sHeight - inHeight)) {
			// 		app.page.moveTo(4);
			// 		enabledScroll();
			// 	} else if(scrolled == 0) {
			// 		app.page.moveTo(2);
			// 		enabledScroll();
			// 	} else {
			// 		disabledScroll();
			// 	}
			// }


			// if (scrolled < 0) {
				app.fScroll = false;
			// }
			boxPosition = scrolled;
		}
	})

});
