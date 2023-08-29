/* eslint-disable indent */
import { templates } from './settings.js';
import utils from './utils.js';

class Song {
	constructor(data, container, test) {
		this.data = data;
		this.container = container;
		this.data.test = test;
		this.renderInMenu(container);
	}

	renderInMenu(songsContainer) {
		const generatedHTML = templates.homePageSong(this.data);

		this.element = utils.createDOMFromHTML(generatedHTML);

		songsContainer.appendChild(this.element);
	}
}

export default Song;
