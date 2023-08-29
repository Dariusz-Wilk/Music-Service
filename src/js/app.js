/* eslint-disable indent */
import { select, classNames, settings } from './settings.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';
import Song from './Song.js';
import Search from './Search.js';

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

		for (let link of this.navLinks) {
			const linkId = link.hash.replace('#', '');
			link.classList.toggle(classNames.nav.active, linkId == pageId);
		}
	},
	initData: function () {
		this.data = {};
		const url = `${settings.db.url}/${settings.db.songs}`;

		fetch(url)
			.then(function (rawResponse) {
				return rawResponse.json();
			})
			.then(parsedResponse => {
				this.data.songs = parsedResponse;

				this.initMenu();
				this.initSearching();
			});
	},
	initMenu: function () {
		const songsContainer = document.querySelector(select.containerOf.songs);
		for (let song of this.data.songs) {
			new Song(song, songsContainer, 'music');
		}
		this.initPlayer();
	},
	initPlayer() {
		GreenAudioPlayer.init({
			selector: '.music-player',
			stopOthersOnPlay: true,
		});
	},

	initSearching: function () {
		const searchForm = document.querySelector('#search');
		new Search(this.data.songs, searchForm);
	},
	init: function () {
		this.initPages();
		this.initData();
	},
};

app.init();
console.log(app);
