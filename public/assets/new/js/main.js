/**
*	Global navigation model for neo4j.org
*/
var nav = {

	// chapters : [],

	// /**
	// *	Initialize all possible navigation elements on this page
	// */
	// init : function() {

	// 	var chapterNav = $('#chapterNav');

	// 	var links = chapterNav.find('a');
	// 	$.each(links, function(i, link) {
	// 		var c = $(link);
	// 		c.on('click', function() {
	// 			nav.activate(c.attr('class'));
	// 		});
	// 	});

	// 	var chapters = $('.page');
	// 	$.each(chapters, function(i, chapter) {
	// 		var c = $(chapter);
	// 		var chapterName = c.attr('id');
	// 		nav.chapters.push(chapterName);
	// 	});

	// },

	resize : function() {

		var chapterNav = $('#secNav');

		var headerWrapper = $('#headerWrapper');
		var header = $('#header');

		$('.page').css({
			//top: chapterNav.height() - headerWrapper.height() + 14
			//top: header.height()
			//height: $(window).height() - chapterNav.height() + headerWrapper.height() - $('#footer').height() - 7
		});

		var h1 = $(window).height() - $('#footer').height() - 1;
		var h2 = $('.page').height() + headerWrapper.height() + chapterNav.height();
		console.log($('.page').height(), h1, h2);

		$('#footer').css({
			position: 'absolute',
		 	top: Math.max(h1, h2)
		});
	},

	/**
	*	Activate the chapter with the given name
	*/
	// activate : function(chapterName) {
	// 	$('#chapterNav').find('a').removeClass('active');
	// 	$('#chapterNav').find('a.' + chapterName).addClass('active');
	// 	$('.page').hide();
	// 	$('#' + chapterName).show();

 //        nav.resize();

	// },

	/**
	* Activate an item in the main menu
	*/
	activateMain : function(category) {
        var rightAlign = {learn: "13.1em" , develop: "9.8em", participate: "5.7em" };
		var mainNav = $('#mainNav');
		$('a', mainNav).removeClass('active');
        $('.' + category + ' a', mainNav).addClass('active');
		$('#activePointer').css({
              right: rightAlign[category]
         }).show();
	},

	/**
	*	Initialize all thumbnails
	*/
	initThumbnails : function() {
		$.each($('.thumbnail'), function(i, tn) {
			var thumbnail = $(tn);
			var src = thumbnail.attr('data-src');

			if (src) {
				thumbnail.on('click', function() {

					$.blockUI({
						message: '<iframe src="' + src + '"" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
						css : {
							position: 'fixed',
							width: '80%',
							height: '60%',
							left: '10%',
							top: '20%',
							border: 'none',
							backgroundColor: 'transparent'
						},
						fadeIn: 25
					});

					// Close modal dialog with ESC key
					$(document).keyup(function(e) {
						e.preventDefault();
				        if (e.keyCode == 27) {
				            $.unblockUI({
				            	fadeOut: 25
				            });
				        }
				    }); 

					// Click outside dialog to close
					$(document).on('mouseup', function(e) {
						e.preventDefault();
			            $.unblockUI({
			            	fadeOut: 25
			            });
				    }); 

				})
			}
		});
	}
}

