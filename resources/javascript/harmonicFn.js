harmony.factory('harmonicFn', function() {
	return [{
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
	}]
});

harmony.factory('harmonicMapping', ['harmonicFn',
	function(harmonicFn) {
		return {
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
		}
	}
]);