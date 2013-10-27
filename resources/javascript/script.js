	var pointer = 0,
		angle = 0,
		movingAngle = 0,
		startPoint,
		isDND = false;

	$(document).ready(function() {
		var text = $('#circle ul#text');

		function rotate(direction, e) {
			e.stopPropagation();
			e.preventDefault();

			if (direction === 'up') {
				angle -= 30;
				pointer++;
			} else if (direction === 'down') {
				angle += 30;
				pointer--;
			} else if ($.isNumeric(direction)) {
				angle = Math.round(direction / 30) * 30;
				pointer = 12 - angle / 30;
			}
			pointer = pointer % 12;
			if (pointer > 0 && pointer < 7 || pointer < -7) {
				$('body').addClass('sharps');
			} else {
				$('body').removeClass('sharps');
			}
			text.rotate(angle);
			angular.element('[ng-controller=line]').scope().updateLine(pointer);
		}

		function moveHandler(e) {
			movingAngle = $.getAngle($('#circle').getCenterPoint(), {
				x: e.originalEvent.clientX,
				y: e.originalEvent.clientY
			}) - $.getAngle($('#circle').getCenterPoint(), startPoint) + angle;
			text.rotate(movingAngle);
		}

		$('#circle').mousedown(function(e) {
			startPoint = {
				x: e.originalEvent.clientX,
				y: e.originalEvent.clientY
			};
			isDND = true;

			e.stopPropagation();
			e.preventDefault();

			$('body')
				.addClass('grab')
				.bind('mousemove', moveHandler);
		});

		$('body')
			.bind('mousewheel', function(event) {
				if (!isDND) {
					rotate(event.originalEvent.wheelDelta / 240 > 0 ? 'up' : 'down', event);
				}
			})
			.bind('DOMMouseScroll ', function(event) {
				if (!isDND) {
					rotate(event.originalEvent.detail < 2 ? 'up' : 'down', event);
				}
			});

		$(document)
			.keydown(function(e) {

				//38
				//40

				if (!isDND) {
					if (e.which === 37 || e.which === 39) {
						rotate(e.which == 37 ? 'up' : 'down', e);
					} else if (e.which === 38 || e.which === 40) {
						angular.element('[ng-controller=selector]').scope()[e.which == 37 ? 'selectPrev' : 'selectNext']();
					}
				}
			})
			.mouseup(function(e) {
				rotate(movingAngle, e);
				$('body')
					.removeClass('grab')
					.unbind('mousemove', moveHandler);
				isDND = false;
			});

		$('.switch')
			.click(function() {
				$('body').toggleClass('theme-glossy').toggleClass('theme-simple');
			});
	});