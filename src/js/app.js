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
					this.initDiscover();
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
			this.initDiscover();
			this.initSearching();
			this.initCategories();
			// this.initFilter();
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
		const categories = [];

		for (let song of this.data.songs) {
			for (let cat of song.categories) {
				if (!categories.includes(cat)) {
					categories.push(cat);
				}
			}
		}

		let categoriesHTML = ``;

		categories.forEach(
			cat => (categoriesHTML += `<li class="categories__item">${cat}</li>`)
		);
		categoriesContainer.innerHTML = categoriesHTML;
	},
	initFilter: function () {
		const categoriesList = document.querySelector(
			select.containerOf.categories
		);

		categoriesList.addEventListener('click', e => {
			const clickedLink = e.target.closest('.categories__item');
			if (!clickedLink) return;
			if (clickedLink.classList.contains('active')) {
				clickedLink.classList.remove('active');
			} else {
				const allActiveLinks = document.querySelectorAll(
					'.categories__item.active'
				);
				allActiveLinks.forEach(link => link.classList.remove('active'));
				clickedLink.classList.add('active');
			}
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
