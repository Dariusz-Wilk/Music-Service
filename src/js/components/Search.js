/* eslint-disable indent */
import Song from './Song.js';
import { select } from '../settings.js';
import GreenAudioPlayer from '../../vendor/green-audio-player.js';

class Search {
	constructor(data, searchForm) {
		this.data = data;
		this.searchForm = searchForm;

		this.getElements(searchForm);
		this.initAction();
	}

	getElements(searchForm) {
		this.searchInput = searchForm.querySelector('.search__input');
		this.searchBtn = searchForm.querySelector('.search__btn');
		this.resultContainer = searchForm.querySelector('.search__results-wrapper');
		this.searchResultText = searchForm.querySelector('.search__result-text');
	}
	initSearch() {
		const searchQuery = this.searchInput.value
			.toLowerCase()
			.replaceAll(' ', '_');
		console.log(searchQuery);
		this.filteredArr = this.data.filter(obj =>
			obj.filename.toLowerCase().includes(searchQuery)
		);
		console.log(this.filteredArr);
	}

	initAction() {
		this.searchBtn.addEventListener('click', e => {
			e.preventDefault();
			this.initSearch();
			this.searchResultText.textContent = `We have found ${
				this.filteredArr.length
			} ${this.filteredArr.length == 1 ? 'song...' : 'songs...'}`;

			this.resultContainer.innerHTML = '';
			for (let item of this.filteredArr) {
				new Song(item, this.resultContainer);
			}
			this.initPlayer(select.containerOf.search);
		});
	}

	initPlayer(container) {
		GreenAudioPlayer.init({
			selector: `${container} .music-player`,
			stopOthersOnPlay: true,
		});
	}
}

export default Search;
