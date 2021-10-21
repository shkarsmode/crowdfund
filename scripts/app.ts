let $ = sel => 
	document.querySelectorAll(sel).length == 1 ? 
	document.querySelector(sel) : document.querySelectorAll(sel);

const marked = $('.bookmarked');

marked.add