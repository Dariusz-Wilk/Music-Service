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
		this.searchInput = searchForm.querySelector(select.searchForm.input);
		this.searchSelect = searchForm.querySelector(select.searchForm.select);
		this.searchBtn = searchForm.querySelector(select.searchForm.button);
		this.resultContainer = searchForm.querySelector(
			select.searchForm.resultContainer
		);
		this.searchResultText = searchForm.querySelector(
			select.searchForm.resultText
		);
	}
	initSearch() {
		const searchQuery = this.searchInput.value.trim().toLowerCase();
		const filteredSongs = this.data.songs.filter(song =>
			song.title.toLowerCase().includes(searchQuery)
		);
		const filteredAuthors = this.data.authors.filter(author =>
			author.name.toLowerCase().includes(searchQuery)
		);
		const songsByAuthor = this.data.songs.filter(song =>
			filteredAuthors.some(author => song.author === author.id)
		);
		this.filteredArr = [...new Set([...filteredSongs, ...songsByAuthor])];

		this.doubleFiltered = this.filteredArr.filter(song =>
			song.categories.includes(this.searchSelect.value)
		);
	}

	initAction() {
		this.searchBtn.addEventListener('click', e => {
			e.preventDefault();
			if (this.searchInput.value.trim() == '') {
				this.resultContainer.innerHTML = '';
				this.searchResultText.textContent = `please enter at least one character`;
			} else {
				this.initSearch();
				this.filteredArr =
					this.searchSelect.value === ''
						? this.filteredArr
						: this.doubleFiltered;
				this.searchResultText.textContent = `We have found ${
					this.filteredArr.length
				} ${this.filteredArr.length == 1 ? 'song...' : 'songs...'}`;

				this.resultContainer.innerHTML = '';
				for (let item of this.filteredArr) {
					new Song(item, this.resultContainer);
				}
				this.initPlayer(select.containerOf.search);
			}
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
