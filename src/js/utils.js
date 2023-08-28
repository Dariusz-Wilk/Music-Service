/* eslint-disable indent */
const utils = {}; // eslint-disable-line no-unused-vars

utils.createDOMFromHTML = function (htmlString) {
	let div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
};

Handlebars.registerHelper('name', function (context) {
	context = context.slice(0, -4);
	let parts = context.split('_');
	parts = parts.slice(-2);
	let artist = parts.join(' ');
	return artist;
});

Handlebars.registerHelper('separeted', function (data) {
	let str = data.join(', ').toLowerCase();
	str = str[0].toUpperCase() + str.substring(1);
	return str;
});

export default utils;
