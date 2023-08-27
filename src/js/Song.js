/* eslint-disable indent */
import { templates, select } from './settings.js';
import utils from './utils.js';

class Song {
	constructor(id, data) {
		this.id - id;
		this.data = data;
		this.renderInMenu();
	}

	renderInMenu() {
		const generatedHTML = templates.homePageSong(this.data);

		this.element = utils.createDOMFromHTML(generatedHTML);

		const menuContainer = document.querySelector(select.containerOf.songs);
		menuContainer.appendChild(this.element);
	}
}

export default Song;
