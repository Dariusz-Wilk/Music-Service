/* eslint-disable indent */
export const select = {
	containerOf: {
		pages: '.pages',
		songs: '.songs-container',
		search: '.search__results-wrapper',
		discover: '.discover__songs-wrapper',
	},
	nav: {
		navLinks: '.nav-link',
	},
	searchForm: {
		input: '.search__input',
		button: '.search__btn',
		resultContainer: '.search__results-wrapper',
		resultText: '.search__result-text',
	},
	templateOf: {
		menuSong: '#template-song-box',
	},
};

export const classNames = {
	nav: {
		active: 'active',
	},
	pages: {
		active: 'active',
	},
};

export const settings = {
	db: {
		url: 'http://localhost:3131',
		songs: 'songs',
		authors: 'authors',
	},
};

export const templates = {
	homePageSong: Handlebars.compile(
		document.querySelector(select.templateOf.menuSong).innerHTML
	),
};
