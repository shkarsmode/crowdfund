const $ = sel => document.querySelectorAll(sel).length == 1 ?
	document.querySelector(sel) : document.querySelectorAll(sel);

// Bookmark
const [marked, bookmarked] = [$('.bookmarked'), $('.bookmarked b')];
const current = $('#current').innerHTML.substr(1);
const total = $('#total').innerHTML.substr(1);
const [rangeLine, disable] = [$('.line-range'), $('.disable button')];
// PopUp main
const [popUp, popInner, popClose] = [$('.popUp-wrap'), $('.popUp'), $('.popUp img')];
// Back project
const [backProject, backProjChoose] = [$('.buttons-wrap > button'), $('.wrap-proj')];
const disabled = $('.disabled');
const reward = $('.select button');
const ul = $('ul');
const section = $('.sections-wrap > section');
// Burger menu
const [burger, popUpBurger] = [$('.menu img'), $('.popUp-burger-wrap')];
const [burgerContent, burgesItem] = [$('.burger-content'), $('.burger-content div:not(.hor-line)')];
// PopUp thank
const [popUpThank, popUpThankInner] = [$('.popUp-thank-wrap'), $('.popUp-thank')];
const [pledgeReward, buttonThank] = [$('.enterPrice button'), $('.popUp-thank button')];

let stand = $('.explain .stand');
let price = $('.explain .price');

// Main styles for popUp and range line
rangeLine.style.width = (parseFloat(current) * 100) / parseFloat(total) + '%';
popUp.style.height = document.body.offsetHeight + 'px';
popUpBurger.style.height = document.body.offsetHeight + 'px';
popUpThank.style.height = document.body.offsetHeight + 'px';
if (disable) disable.innerHTML = 'Out of stock';

burger.addEventListener('click', () => {
	popUpBurger.style.display = 'flex';
	popUpBurger.style.opacity = '1';
});

// Stop propagation
burgerContent.addEventListener('click', e => e.stopPropagation());
popInner.addEventListener('click', e => e.stopPropagation());
popUpThankInner.addEventListener('click', e => e.stopPropagation());

popUpBurger.addEventListener('click', e => {
	popUpBurger.style.display = 'none';
	popUpBurger.style.opacity = '0';
	e.preventDefalut();
});

marked.addEventListener('click', function () {
	marked.classList.toggle('activeMarked');
	bookmarked.innerHTML = marked.classList[1] ? 'Bookmarked' : 'Add bookmark';
	addBookmark(this);
});

burgesItem.forEach(el => {
	el.addEventListener('click', () => {
		popUpBurger.style.display = 'none';
		popUpBurger.style.opacity = '0';
		switch (el.innerHTML) {
			case 'About': scroll(section[2].offsetTop + 275); break;
			case 'Discover': scroll(section[1].offsetTop + 275); break;
			case 'Get Started': alert('Get Started'); break;
		}
	});
});

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

function scroll(top) {
	window.scrollTo({
		top: top,
		behavior: 'smooth'
	});
}

backProject.addEventListener('click', () => {
	popUp.style.display = 'flex';
	setTimeout(() => showHidePopUp('1'), 0)
	if (window.innerWidth < 750)
		scroll('20');
});

popClose.addEventListener('click', e => {
	e.stopPropagation();
	popUp.style.opacity = '0';
	setTimeout(() => showHidePopUp('none'), 300)
});

popUp.addEventListener('click', e => {
	e.stopPropagation();
	popUp.style.opacity = '0';
	setTimeout(() => showHidePopUp('none'), 300)
});

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
	});
});

reward.forEach(el => {
	el.addEventListener('click', e => {
		if (!e.target.parentNode.parentNode.classList[0]) {
			scroll('0');
			popUp.style.display = 'flex';
			setTimeout(() => showHidePopUp('1'), 0);
			backProjChoose.forEach((el, ind) => {
				el.classList.remove('active')
				if (ind == e.target.dataset.id)
					el.classList.add('active')
				if (window.innerWidth < 750)
					scroll('20');
			});
		}
	});
});


ul.addEventListener('click', ul => {
	switch (ul.target.innerHTML) {
		case 'About': scroll(section[2].offsetTop + 275); break;
		case 'Discover': scroll(section[1].offsetTop + 275); break;
		case 'Get Started': console.log('Get Started'); break;
	}
})


popUpThank.addEventListener('click', () => {
	setTimeout(() => popUpThank.style.display = 'none', 300);
	popUpThank.style.opacity = '0';
});

pledgeReward.forEach(el => {
	el.addEventListener('click', () => {
		let button = $('.active button');
		button.classList.add('load');
		setTimeout(() => {
			let currentName = $('.active .titleProj').innerText;
			currentName = currentName.substr(0, currentName.indexOf('Pledge') || currentName.length);
			currentName = currentName.indexOf('Pledge') != -1 ? 'bail for support' : currentName;
			const currentPrice = $('.active .enterPrice input').value;
			stand.innerHTML = currentName;
			price.innerHTML = currentPrice;
			popUpThank.style.display = 'flex';
			setTimeout(() => popUpThank.style.opacity = '1', 300);
			popUp.style.opacity = '0';
			setTimeout(() => showHidePopUp('none'), 300);
			button.classList.remove('load');
		}, 3000);
	});
});

buttonThank.addEventListener('click', () => {
	popUpThank.style.opacity = '0';
	setTimeout(() => popUpThank.style.display = 'none', 300);
});

window.addEventListener(`resize`,
	e => e.target.innerWidth > 1440 ||
		e.target.innerWidth < 375 ?
		alert('Warning! This screen resolution is not supported!') : null);