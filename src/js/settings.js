/* eslint-disable indent */
export const select = {
	containerOf: {
		pages: '.pages',
		songs: '.songs-container',
		search: '.search__results-wrapper',
	},
	nav: {
		navLinks: '.nav-link',
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
	},
};

export const templates = {
	homePageSong: Handlebars.compile(
		document.querySelector(select.templateOf.menuSong).innerHTML
	),
};
