	var pointer = 0,
		angle = 0,
		movingAngle = 0,
		startPoint,
		isDND = false,
		scales = [{
			id: 'major',
			name: 'Major (Ionian)',
			selected: true
		}, {
			id: 'minor',
			name: 'Minor (Aeolian)'
		}, {
			id: 'dorian',
			name: 'Dorian'
		}, {
			id: 'phrygian',
			name: 'Phrygian'
		}, {
			id: 'lydian',
			name: 'Lydian'
		}, {
			id: 'myxolidian',
			name: 'Myxolidian'
		}, {
			id: 'locrian',
			name: 'Locrian'
		}],
		noteNames = [{
			bes: 'C',
			sharp: 'C'
		}, {
			bes: 'D♭',
			sharp: 'C♯'
		}, {
			bes: 'D',
			sharp: 'D'
		}, {
			bes: 'E♭',
			sharp: 'D♯'
		}, {
			bes: 'E',
			sharp: 'E'
		}, {
			bes: 'F',
			sharp: 'F'
		}, {
			bes: 'G♭',
			sharp: 'F♯'
		}, {
			bes: 'G',
			sharp: 'G'
		}, {
			bes: 'A♭',
			sharp: 'G♯'
		}, {
			bes: 'A',
			sharp: 'A'
		}, {
			bes: 'B♭',
			sharp: 'A♯'
		}, {
			bes: 'B',
			sharp: 'B'
		}],
		circleNotes = [
			noteNames[0], //C
			noteNames[7], //G
			noteNames[2], //D
			noteNames[9], //A
			noteNames[4], //E
			noteNames[11], //B
			noteNames[6], //F#
			noteNames[1], //C#
			noteNames[8], //G#
			noteNames[3], //D#
			noteNames[10], //A#
			noteNames[5], //F
		],
		harmonicFn = [{
			name: 'Tonic'
			//chord: 'M7'
		}, {
			name: 'Supertonic'
			//chord: 'm7'
		}, {
			name: 'Mediant'
			//chord: 'm7'
		}, {
			name: 'Subdominant'
			//chord: 'M7'
		}, {
			name: 'Dominant'
			//chord: '7'
		}, {
			name: 'Submediant'
			//chord: 'm7'
		}, {
			name: 'Leading Tone'
			//chord: 'm7<sup>5-</sup>'
		}],
		harmonicMapping = {
			major: [
				harmonicFn[0],
				harmonicFn[3],
				'',
				'',
				'',
				'',
				'',
				harmonicFn[6],
				harmonicFn[2],
				harmonicFn[5],
				harmonicFn[1],
				harmonicFn[4]
			],
			minor: [
				harmonicFn[0],
				harmonicFn[3],
				harmonicFn[6],
				harmonicFn[2],
				harmonicFn[5],
				'',
				'',
				'',
				'',
				'',
				harmonicFn[1],
				harmonicFn[4]
			],
			dorian: [
				harmonicFn[0],
				harmonicFn[3],
				harmonicFn[6],
				harmonicFn[2],
				'',
				'',
				'',
				'',
				'',
				harmonicFn[5],
				harmonicFn[1],
				harmonicFn[4]
			],
			phrygian: [
				harmonicFn[0],
				harmonicFn[3],
				harmonicFn[6],
				harmonicFn[2],
				harmonicFn[5],
				harmonicFn[1],
				'',
				'',
				'',
				'',
				'',
				harmonicFn[4],
			],
			lydian: [
				harmonicFn[0],
				'',
				'',
				'',
				'',
				'',
				harmonicFn[3],
				harmonicFn[6],
				harmonicFn[2],
				harmonicFn[5],
				harmonicFn[1],
				harmonicFn[4]
			],
			myxolidian: [
				harmonicFn[0],
				harmonicFn[3],
				harmonicFn[6],
				'',
				'',
				'',
				'',
				'',
				harmonicFn[2],
				harmonicFn[5],
				harmonicFn[1],
				harmonicFn[4]
			],
			locrian: [
				harmonicFn[0],
				harmonicFn[3],
				harmonicFn[6],
				harmonicFn[2],
				harmonicFn[5],
				harmonicFn[1],
				harmonicFn[4],
				'',
				'',
				'',
				'',
				'',
			]
		}, lmaping = {},
		selectedScale = 'major';

	for (var scaleName in harmonicMapping) {
		scale = harmonicMapping[scaleName];
		lmaping[scaleName] = [];
		for (var i = 0; i < 12; i++) {
			harmonyItem = harmonicFn[i];
			var index = scale.indexOf(harmonyItem);
			if (index > -1) {
				index = 12 - index;
			}
			lmaping[scaleName].push(index);
		}
	}

	function updateLine(pointer) {
		var i, item, lineItems = $('#line ul#line-labels li div');

		lineItems.css('left', -80);
		for (i = 0; i < lmaping[selectedScale].length; i++) {
			if (lmaping[selectedScale][i] >= 0) {
				item = (lmaping[selectedScale][i] + (pointer >= 0 ? pointer : 12 + pointer)) % 12;
				$(lineItems[item]).css('left', (80 * i) + 20);
			}
		}
	}

	harmony = angular.module('harmony', []);
	harmony.controller('fillHarmony', function($scope) {
		$scope.$on('select', function(e, scale) {
			$scope.$broadcast('selected', scale);
		})
	});
	harmony.controller('circle', function($scope) {
		$scope.texts = angular.copy(circleNotes).reverse();
		$scope.labels = harmonicMapping.major;
		$scope.$on('selected', function(e, scale) {
			$scope.labels = harmonicMapping[scale];
			selectedScale = scale;
		})

	});
	harmony.controller('line', function($scope) {
		$scope.labels = circleNotes;
		$scope.hlabels = harmonicFn;

		$scope.update = function(isLast) {
			if (isLast) {
				updateLine(0);
			}
		};
	});
	harmony.controller('selector', function($scope) {
		$scope.scales = scales;
		$scope.scales[0].selected = true;
		$scope.selected = scales[0].id;
		$scope.onSelect = function(item) {
			$scope.$emit('select', this.selected);
		};
		$scope.selectNext = function() {

		}
		$scope.selectPrev = function() {}
	});

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
			updateLine(pointer);
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