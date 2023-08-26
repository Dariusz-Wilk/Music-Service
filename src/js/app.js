/* eslint-disable indent */
import { select, classNames } from './settings.js';
import GreenAudioPlayer from '../vendor/green-audio-player.js';

new GreenAudioPlayer('.gap-example');
new GreenAudioPlayer('.gap-example2');
new GreenAudioPlayer('.gap-example3');
new GreenAudioPlayer('.gap-example4');
new GreenAudioPlayer('.gap-example5');

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
	init: function () {
		this.initPages();
	},
};

app.init();
console.log(app);
