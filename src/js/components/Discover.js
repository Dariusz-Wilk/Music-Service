import Song from './Song.js';
import GreenAudioPlayer from '../../vendor/green-audio-player.js';
import { select } from '../settings.js';

/* eslint-disable indent */
class Discover {
	constructor(data, container, category) {
		this.data = data;
		this.container = container;
		this.getElements();
		this.clearContainer();

		this.showDiscoverInfo(category);
		this.getRandomSong();
	}

	getElements() {
		this.songWrapper = this.container.querySelector(
			select.containerOf.discoverSong
		);
		this.discoverInfo = this.container.querySelector(
			select.discover.discoverInfo
		);
	}

	clearContainer() {
		this.songWrapper.innerHTML = '';
	}

	showDiscoverInfo(category) {
		this.discoverInfo.innerHTML = `<p class="discover__text">
				Your favourite music category is <span class="highlight"> ${category} </span> so check this music out!
			</p>`;
	}

	getRandomSong() {
		const randomIndex = Math.floor(Math.random() * this.data.length);

		new Song(this.data[randomIndex], this.songWrapper);
		this.initPLayer(select.containerOf.discoverSong);
	}

	initPLayer(container) {
		GreenAudioPlayer.init({
			selector: `${container} .music-player`,
			stopOthersOnPlay: true,
		});
	}
}

export default Discover;
