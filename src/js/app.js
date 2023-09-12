/* eslint-disable indent */
import { select, classNames, settings } from './settings.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';
import Song from './components/Song.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';

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
				if (link.hash == '#discover') {
					// this.initDiscover();
				}
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
	initData: async function () {
		try {
			this.data = {};
			const urlSongs = `${settings.db.url}/${settings.db.songs}`;
			const urlAuthors = `${settings.db.url}/${settings.db.authors}`;

			const [songsResponse, authorsResponse] = await Promise.all([
				fetch(urlSongs),
				fetch(urlAuthors),
			]);
			const [songs, authors] = await Promise.all([
				songsResponse.json(),
				authorsResponse.json(),
			]);
			this.data.songs = songs;
			this.data.authors = authors;

			this.initMenu();
			// this.initDiscover();
			this.initCategories();
			this.initSearching();
			this.initMostPLayedSong();
		} catch (err) {
			console.err(err);
		}
	},
	initMenu: function () {
		const songsContainer = document.querySelector(select.containerOf.songs);
		for (let song of this.data.songs) {
			new Song(song, songsContainer);
		}
		this.initPlayer(select.containerOf.songs);
	},
	initPlayer(container) {
		GreenAudioPlayer.init({
			selector: `${container} .music-player`,
			stopOthersOnPlay: true,
		});
	},

	initModal: function () {
		const modal = document.querySelector('.modal');
		const overlay = document.querySelector('.overlay');
		const joinBtn = document.querySelector('.subscribe__join-btn');
		const closeBtn = document.querySelector('.btn--close-modal');

		const openModal = function (e) {
			e.preventDefault();
			modal.classList.remove('hidden');
			overlay.classList.remove('hidden');
		};

		const closeModal = function (e) {
			e.preventDefault();
			modal.classList.add('hidden');
			overlay.classList.add('hidden');
		};

		joinBtn.addEventListener('click', e => {
			openModal(e);
		});

		closeBtn.addEventListener('click', e => {
			closeModal(e);
		});

		overlay.addEventListener('click', closeModal);
	},

	initSearching: function () {
		const searchSelectContainer = document.querySelector('.search__select');
		let generatedHTML = '<option value=""></option>';

		this.categories.forEach(category => {
			generatedHTML += `<option value="${category}">${category}</option>`;
		});

		searchSelectContainer.innerHTML = generatedHTML;
		const searchForm = document.querySelector('#search');
		new Search(this.data, searchForm);
	},

	initDiscover: function () {
		const discoverContainer = document.querySelector(
			select.containerOf.discover
		);
		new Discover(this.data.songs, discoverContainer);
	},
	initCategories: function () {
		const categoriesContainer = document.querySelector(
			select.containerOf.categories
		);
		this.categories = [];

		for (let song of this.data.songs) {
			for (let cat of song.categories) {
				if (!this.categories.includes(cat)) {
					this.categories.push(cat);
				}
			}
		}

		let categoriesHTML = ``;

		this.categories.forEach(
			cat => (categoriesHTML += `<li class="categories__item">${cat}</li>`)
		);
		categoriesContainer.innerHTML = categoriesHTML;
	},
	initFilter: function () {
		const categoriesList = document.querySelector(
			select.containerOf.categories
		);

		categoriesList.addEventListener('click', e => {
			const filteredSongs = [];
			const songsContainer = document.querySelector(select.containerOf.songs);
			const clickedLink = e.target.closest('.categories__item');
			let allActiveLinks;

			if (!clickedLink) return;
			if (clickedLink.classList.contains('active')) {
				clickedLink.classList.remove('active');
			} else {
				allActiveLinks = document.querySelectorAll('.categories__item.active');
				allActiveLinks.forEach(link => link.classList.remove('active'));
				clickedLink.classList.add('active');
			}

			this.data.songs.forEach(song => {
				if (song.categories.includes(clickedLink.textContent)) {
					filteredSongs.push(song);
				}
			});

			songsContainer.innerHTML = '';

			for (let song of filteredSongs) {
				new Song(song, songsContainer);
			}
			this.initPlayer(select.containerOf.songs);

			if (!allActiveLinks) {
				songsContainer.innerHTML = '';
				for (let song of this.data.songs) {
					new Song(song, songsContainer);
				}
				this.initPlayer(select.containerOf.songs);
			}
		});
	},

	initMostPLayedSong: function () {
		const songsWrapper = document.querySelector(select.containerOf.songs);
		const songsElement = songsWrapper.querySelectorAll('.home__song-wrapper');
		const discoverContainer = document.querySelector(
			select.containerOf.discover
		);
		this.listenedCategories = [];

		songsElement.forEach(song => {
			const audio = song.querySelector('audio');

			audio.addEventListener('play', e => {
				e.preventDefault();
				const audioCategories = song
					.querySelector('.categories-name')
					.textContent.toLowerCase()
					.split(', ');

				audioCategories.forEach(cat => {
					if (!this.listenedCategories[cat]) {
						this.listenedCategories[cat] = 1;
					} else {
						this.listenedCategories[cat]++;
					}
				});
				const values = Object.entries(this.listenedCategories).map(
					item => item[1]
				);
				const mostListenedCategory = Object.entries(
					this.listenedCategories
				).find(item => item[1] === Math.max(...values));
				const mostListenedCategoryCamelCase =
					mostListenedCategory[0].slice(0, 1).toUpperCase() +
					mostListenedCategory[0].slice(1);

				const favCategorySongs = this.data.songs.filter(song => {
					return song.categories.includes(mostListenedCategoryCamelCase);
				});

				new Discover(
					favCategorySongs,
					discoverContainer,
					mostListenedCategoryCamelCase
				);
			});
		});
	},
	init: function () {
		this.initPages();
		this.initData();
		this.initModal();
		this.initFilter();
	},
};

app.init();
console.log(app);
