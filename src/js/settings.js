/* eslint-disable indent */
export const select = {
	containerOf: {
		pages: '.pages',
		songs: '.songs-container',
		search: '.search__results-wrapper',
		discover: '.discover__container',
		discoverSong: '.discover__songs-wrapper',
		categories: '.categories__list',
	},
	nav: {
		navLinks: '.nav-link',
	},
	searchForm: {
		input: '.search__input',
		button: '.search__btn',
		select: '.search__select',
		resultContainer: '.search__results-wrapper',
		resultText: '.search__result-text',
	},
	discover: {
		discoverInfo: '.discover__text',
	},
	templateOf: {
		menuSong: '#template-song-box',
		categories: '#template-categories',
	},
};

export const classNames = {
	nav: {
		active: 'active',
	},
	pages: {
		active: 'active',
	},
	categories: {
		active: 'active',
	},
};

export const settings = {
	db: {
		url:
			'//' +
			window.location.hostname +
			(window.location.hostname == 'localhost' ? ':3131' : ''),
		songs: 'songs',
		authors: 'authors',
	},
};

export const templates = {
	homePageSong: Handlebars.compile(
		document.querySelector(select.templateOf.menuSong).innerHTML
	),
};
