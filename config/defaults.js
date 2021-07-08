// #TODO: Shift layout and story IDs out of objects and fetch them with API call to story.

const layouts = {
	default: '5fa55bec46130c0847b43b35',
	static: '5fa55bf946130c0847b43b36',
	thaumatrope: '5fa55c2746130c0847b43b39'
}

const stories = {
	vasterror: {
		story: 'Vast Error',
		storyLoc: 'vast-error',
		storyID: '5fa55bb246130c0847b43b32',
		imgLoc: 'vasterror',
		layoutID: layouts.default,
		suffix: 'gif',
		precision: 5
	},
	syzygy: {
		story: 'Syzygy',
		storyLoc: 'thaumatrope/syzygy',
		storyID: '5fa55bc346130c0847b43b33',
		imgLoc: 'thaumatrope/syzygy',
		layoutID: layouts.thaumatrope,
		suffix: 'png',
		precision: 4
	}
}

module.exports = {
	layouts,
	stories
}