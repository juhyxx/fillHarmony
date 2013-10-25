harmony.factory('noteNames', function() {
	return [{
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
	}];
});

harmony.factory('circleNotes', ['noteNames',
	function(noteNames) {
		return [
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
		];
	}
]);