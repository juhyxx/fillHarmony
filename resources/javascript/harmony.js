harmony = angular.module('harmony', []);

harmony.controller('fillHarmony', function($scope) {
	$scope.$on('select', function(e, scale) {
		$scope.$broadcast('selected', scale);
	});
	$scope.keyup = function(keyEvent) {
		console.log('keyup', keyEvent);
	};
});

harmony.controller('circle', function($scope, circleNotes, harmonicMapping) {
	$scope.texts = angular.copy(circleNotes).reverse();
	$scope.labels = harmonicMapping.major;
	$scope.$on('selected', function(e, scale) {
		$scope.labels = harmonicMapping[scale];
	})
});

harmony.controller('line', function($scope, circleNotes, harmonicMapping, harmonicFn) {
	$scope.labels = circleNotes;
	$scope.hlabels = harmonicFn;
	$scope.lmaping = [];
	$scope.selectedScale = 'major';

	for (var scaleName in harmonicMapping) {
		scale = harmonicMapping[scaleName];
		$scope.lmaping[scaleName] = [];
		for (var i = 0; i < 12; i++) {
			harmonyItem = harmonicFn[i];
			var index = scale.indexOf(harmonyItem);
			if (index > -1) {
				index = 12 - index;
			}
			$scope.lmaping[scaleName].push(index);
		}
	}

	$scope.update = function(isLast) {
		if (isLast) {
			$scope.updateLine(0);
		}
	};
	$scope.$on('selected', function(e, scale) {
		$scope.selectedScale = scale;
	})
	$scope.updateLine = function(pointer) {
		var i, item, lineItems = $('#line ul#line-labels li div');

		lineItems.css('left', -80);
		for (i = 0; i < $scope.lmaping[$scope.selectedScale].length; i++) {
			if ($scope.lmaping[$scope.selectedScale][i] >= 0) {
				item = ($scope.lmaping[$scope.selectedScale][i] + (pointer >= 0 ? pointer : 12 + pointer)) % 12;
				$(lineItems[item]).css('left', (80 * i) + 20);
			}
		}
	}
});

harmony.controller('selector', function($scope, scales) {
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