const $ = sel => document.querySelectorAll(sel).length == 1 ?
	document.querySelector(sel) : document.querySelectorAll(sel);

const marked = $('.bookmarked');
const current = $('#current').innerHTML.substr(1);
const total = $('#total').innerHTML.substr(1);
const rangeLine = $('.line-range');
const disable = $('.disable button');
const bookmarked = $('.bookmarked b');
const popUp = $('.popUp-wrap');
const popInner = $('.popUp');
const popClose = $('.popUp img');
const backProject = $('.buttons-wrap > button');
const backProjChoose = $('.wrap-proj');
const disabled = $('.disabled');

marked.addEventListener('click', function () {
	marked.classList.toggle('activeMarked');
	bookmarked.innerHTML = marked.classList[1] ? 'Bookmarked' : 'Add bookmark'
	addBookmark(this)
})

rangeLine.style.width = (parseFloat(current) * 100) / parseFloat(total) + '%';
popUp.style.height = document.body.offsetHeight + 'px';
// popUp.style.opacity = '1';

if (disable) disable.innerHTML = 'Out of stock';

function addBookmark(el, url, title) {
	if (!url) var url = document.location;
	if (!title) var title = document.title;
	try {
		window.external.AddFavorite(url, title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, url, "");
		} catch (e) {
			if (typeof (opera) == "object" || window.sidebar) {
				el.rel = "sidebar";
				el.title = title;
				el.url = url;
				el.href = url;
				return true;
			} else console.log("Press Ctrl + D to bookmark the page");
		}
	}
	return false;
}

backProject.addEventListener('click', () => {
	popUp.style.display = 'flex';
	setTimeout(() => showHidePopUp('1'), 0)
	popInner.focus();
})

popClose.addEventListener('click', e => {
	e.stopPropagation();
	popUp.style.opacity = '0';
	setTimeout(() => showHidePopUp('none'), 300)
}, false)

popUp.addEventListener('click', e => {
	e.stopPropagation();
	popUp.style.opacity = '0';
	setTimeout(() => showHidePopUp('none'), 300)
}, false)

popInner.addEventListener('click', e => {
	e.stopPropagation();
}, false)

function showHidePopUp(par) {
	if (par === 'none')
		popUp.style.display = par;
	else popUp.style.opacity = par;
}

backProjChoose.forEach(e => {

	e.addEventListener('click', () => {
		if (e.classList[0] != 'disabled')
			backProjChoose.forEach(e =>
				e.classList.remove('active'));
		if (!e.classList[1])
			e.classList.add('active');
		else e.classList.remove('active');

	})
})



