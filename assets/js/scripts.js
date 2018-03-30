function addActive(idToActivate) {
	document.getElementById(idToActivate).classList.add('active');
}
function removeActive(idToDeactivate) {
	document.getElementById(idToDeactivate).classList.remove('active');
}


if (document.getElementById('runtime-main')) {
	var flkty = new Flickity('.quickstart-carousel-nav', {
		pageDots: false,
		prevNextButtons: false,
		contain: true,
		asNavFor: '.quickstart-carousel'
	});

	var flkty2 = new Flickity('.quickstart-carousel', {
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true,
		imagesLoaded: true
	});

	var flkty3 = new Flickity('.features-carousel-nav', {
		pageDots: false,
		prevNextButtons: false,
		contain: true,
		asNavFor: '.features-carousel'
	});

	var flkty4 = new Flickity('.features-carousel', {
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true,
		imagesLoaded: true
	});
}

if (document.getElementById('enterprise-main')) {
	var flkty5 = new Flickity('.benefits-carousel', {
		watchCSS: true,
		pageDots: true,
		prevNextButtons: false,
		wrapAround: true,
		imagesLoaded: true
	});

	var flkty6 = new Flickity('.customers-carousel', {
		pageDots: false,
		prevNextButtons: true,
		wrapAround: true,
		imagesLoaded: true
	});

	var utils = window.fizzyUIUtils;

	// elements
	var cellsButtonGroup = document.querySelector('.carroussel-buttons');
	var cellsButtons = utils.makeArray(cellsButtonGroup.children);

	// update buttons on select
	flkty6.on('select', function() {
		var previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
		var selectedButton = cellsButtonGroup.children[flkty6.selectedIndex];
		previousSelectedButton.classList.remove('is-selected');
		selectedButton.classList.add('is-selected');
	});

	// cell select
	cellsButtonGroup.addEventListener('click', function(event) {
		if (!matchesSelector(event.target, '.button') && !matchesSelector(event.target, '.brand')) {
			return;
		}

		if (matchesSelector(event.target, '.brand')) {
			var index = event.target.getAttribute("data-button") - 1;
		} else {
			var index = cellsButtons.indexOf(event.target);
		}
		
		flkty6.select(index);
	});

	var flkty7 = new Flickity('.install-carousel', {
		pageDots: true,
		prevNextButtons: true,
		wrapAround: true,
		imagesLoaded: true
	});
}

if (document.getElementById('monitoring-main')) {
	var flkty8 = new Flickity('.monitor-nav-carousel', {
		pageDots: true,
		prevNextButtons: false,
		contain: true,
		asNavFor: '.monitor-carousel'
	});

	var flkty9 = new Flickity('.monitor-carousel', {
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true,
		imagesLoaded: true
	});

	var flkty10 = new Flickity('.debug-nav-carousel', {
		pageDots: true,
		prevNextButtons: false,
		contain: true,
		asNavFor: '.debug-carousel'
	});

	var flkty11 = new Flickity('.debug-carousel', {
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true,
		imagesLoaded: true
	});

	var flkty12 = new Flickity('.extra-feature-nav-carousel', {
		pageDots: true,
		prevNextButtons: false,
		contain: true,
		asNavFor: '.extra-feature-carousel'
	});

	var flkty13 = new Flickity('.extra-feature-carousel', {
		pageDots: false,
		prevNextButtons: false,
		wrapAround: true,
		imagesLoaded: true
	});
}