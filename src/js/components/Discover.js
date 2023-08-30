import Song from './Song.js';
import GreenAudioPlayer from '../../vendor/green-audio-player.js';
import { select } from '../settings.js';

/* eslint-disable indent */
class Discover {
	constructor(data, container) {
		this.data = data;
		this.container = container;
		this.clearContainer();

		this.getRandomSong();
	}

	clearContainer() {
		this.container.innerHTML = '';
	}

	getRandomSong() {
		const randomIndex = Math.floor(Math.random() * this.data.length);

		new Song(this.data[randomIndex], this.container);
		this.initPLayer(select.containerOf.discover);
	}

	initPLayer(container) {
		GreenAudioPlayer.init({
			selector: `${container} .music-player`,
			stopOthersOnPlay: true,
		});
	}
}

export default Discover;
