	jQuery.fn.rotate = function(degrees) {
		$(this).css({
			'-webkit-transform': 'rotate(' + degrees + 'deg)',
			'-moz-transform': 'rotate(' + degrees + 'deg)',
			'-ms-transform': 'rotate(' + degrees + 'deg)',
			'transform': 'rotate(' + degrees + 'deg)'
		});
	};

	jQuery.fn.getCenterPoint = function() {
		var offset = $(this).offset();

		return {
			x: offset.left + $(this).width() / 2,
			y: offset.top + $(this).height() / 2
		};
	};

	jQuery.getAngle = function(center, point) {
		var x = center.x - point.x,
			y = center.y - point.y,
			angle = Math.round(Math.atan2(y, x) * 180 / Math.PI + 180);

		angle = (angle + 90) % 360;
		return angle;
	};