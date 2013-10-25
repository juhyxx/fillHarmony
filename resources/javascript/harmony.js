harmony = angular.module('harmony', []);

harmony.controller('fillHarmony', function($scope) {
	$scope.$on('select', function(e, scale) {
		$scope.$broadcast('selected', scale);
	})
});

harmony.controller('circle', function($scope, circleNotes) {
	$scope.texts = angular.copy(circleNotes).reverse();
	$scope.labels = harmonicMapping.major;
	$scope.$on('selected', function(e, scale) {
		$scope.labels = harmonicMapping[scale];
		selectedScale = scale;
	})

});

harmony.controller('line', function($scope, circleNotes) {
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