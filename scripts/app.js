const $ = sel => document.querySelectorAll(sel).length == 1 ?
	document.querySelector(sel) : document.querySelectorAll(sel);

const marked = $('.bookmarked');

marked.addEventListener('click', function () {
	marked.classList.toggle('activeMarked');
})

