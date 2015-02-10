function $(selector) {
	return document.querySelectorAll(selector);
}

function addClass(element, newClass) {
	element.className = element.className + " " + newClass;
}

function removeClass(element, deleteClass) {
	var reg = new RegExp(" " + deleteClass,"g");
	element.className = element.className.replace(reg, '');
}

function playSong(button, song) {
	addClass(button, "pause-button");
	song.play();
}

function pauseSong(button, song) {
	removeClass(button, "pause-button");
	song.pause();
}

function pauseOtherSongs(currentButton) {
	var checkButtons = $(".pause-button");

	for (i = 0; i < checkButtons.length; i++) {
		var button = checkButtons[i];
		var song = checkButtons[i].previousElementSibling;

		if (currentButton === button) continue;

		if (contains(button.className, "pause")) {
			removeClass(button.parentNode.parentNode, "playing");
			pauseSong(button, song);
		}
	}
}

function fixNav() {
	var timer;
	document.addEventListener("scroll", function() {
		clearTimeout(timer);
		timer = setTimeout(checkScroll, 10)
	});

	var checkScroll = function () {
		var scrollPosition = document.documentElement.scrollTop;
		var mainNav = $("#main-nav")[0];
		var navClass = mainNav.className;

		if (scrollPosition > 95 && !contains(navClass, "fixed")) {
			addClass(mainNav, "fixed");
		}
		else if (scrollPosition < 95) {
			removeClass(mainNav, "fixed");
		}
	};

}

function contains(str, substr) {
	return str.indexOf(substr) > -1;
}

function setButtons() {
	var playButtons = $(".play-button");

	for (i = 0; i < playButtons.length; i++) {

		if (playButtons[i].previousElementSibling) {

			playButtons[i].addEventListener("click", function () {
				var song = this.previousElementSibling;
				var button = this;

				pauseOtherSongs(button);

				// console.log("I was clicked");

				if (contains(button.className, "pause")) {
					removeClass(button.parentNode.parentNode, "playing");
					pauseSong(button, song);
				}
				else {
					addClass(button.parentNode.parentNode, "playing");
					playSong(button, song);
				}
			});
		}
	}
}

function setInternalAnchors() {
	var anchors = $("#main-nav ul ul a");

	for (i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener("click", function () {
			setTimeout( function() {
				console.log("Before: " + document.body.scrollTop);
				document.documentElement.scrollTop -= 50;
				console.log("After: " + document.body.scrollTop);
			}, 1);
		});
	}
}

function main() {

	setButtons();
	setInternalAnchors();
	fixNav();
}