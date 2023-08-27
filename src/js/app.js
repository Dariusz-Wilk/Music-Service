/* eslint-disable indent */
import { select, classNames, settings } from './settings.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';
import Song from './Song.js';

const app = {
	initPages: function () {
		this.pages = document.querySelector(select.containerOf.pages).children;
		this.navLinks = document.querySelectorAll(select.nav.navLinks);

		const idFromHash = window.location.hash.replace('#/', '');
		let pageMatchingHash = this.pages[0].id;

		for (let page of this.pages) {
			if (page.id == idFromHash) {
				pageMatchingHash = page.id;
				break;
			}
		}

		this.activatePage(pageMatchingHash);

		for (let link of this.navLinks) {
			link.addEventListener('click', e => {
				e.preventDefault();
				const linkId = link.hash.replace('#', '');
				this.activatePage(linkId);

				window.location.hash = '#/' + linkId;
			});
		}
	},

	activatePage: function (pageId) {
		for (let page of this.pages) {
			page.classList.toggle(classNames.pages.active, page.id === pageId);
		}
	},
	initData: function () {
		this.data = {};
		const url = `${settings.db.url}/${settings.db.songs}`;
		console.log(url);

		fetch(url)
			.then(function (rawResponse) {
				return rawResponse.json();
			})
			.then(parsedResponse => {
				this.data.songs = parsedResponse;

				this.initMenu();
			});
	},
	initMenu: function () {
		for (let song of this.data.songs) {
			console.log(song);
			new Song(song.id, song);
		}
		this.initPlayer();
	},
	initPlayer() {
		GreenAudioPlayer.init({
			selector: '.music-player',
			stopOthersOnPlay: true,
		});
	},
	init: function () {
		this.initPages();
		this.initData();
	},
};

app.init();
console.log(app);
