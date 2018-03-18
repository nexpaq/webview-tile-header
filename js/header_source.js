/* Event system */
if(typeof NexpaqEvent == "undefined") {
	// Event with name and callbacks
	window.NexpaqEvent = function(name) {
		this.name = name;
		this.callbacks = [];
	};

	// We can register callbacks for our event
	NexpaqEvent.prototype.registerCallback = function(callback){
		this.callbacks.push(callback);
	};

	// We can remove callbacks for our event
	NexpaqEvent.prototype.removeCallback = function(callback){
		var index = this.callbacks.indexOf(callback);
		if(index >= 0) {
			this.callbacks.splice(index, 1);
		}
	};
}

var NexpaqHeader = {
	version: '1.0.9',
	Events: {
		BackButtonClicked: new NexpaqEvent('BackButtonClicked')
	},
	_node: null,
	_buttons: null,
	_backButton: null,
	_title: '',
	_titleArray: [],

	addEventListener: function(eventName, callback) {
		this.Events[eventName].registerCallback(callback);
	},

	removeEventListener: function(eventName, callback) {
		this.Events[eventName].removeCallback(callback);
	},

	dispatchEvent: function(eventName, eventArgs) {
		this.Events[eventName].callbacks.forEach(function(callback){
			callback(eventArgs);
		});
	},

	_detectCurrentPlatform : function() {
		var platform = (function getMobileOperatingSystem() {
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;
			// Windows Phone must come first because its UA also contains "Android"
			if (/windows phone/i.test(userAgent)) {
				return "winphone";
			}

			if (/android/i.test(userAgent)) {
				return "android";
			}

			// iOS detection from: http://stackoverflow.com/a/9039885/177710
			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				return "ios";
			}

			return "unknown";
		})();

		document.body.classList.add('platform-' + platform);
		console.log("platform is: " + platform);
	},

	_backButtonClickHandler: function(e) {
		console.log("back button clicked");
	},

	exists: function() {
		return this._node != null;
	},

	create: function(title, root) {
		title = title || '';
		root = root || document.body;
		if(this.exists()) throw "NexpaqHeader already exists!";

		this._title = title;

		// HTML
		var node = document.createElement('div');
		node.id = 'nexpaq-header';
		node.innerHTML = atob(nxp_header_html);
		node.children[0].textContent = this._title;
		var header = this;
		node.children[1].addEventListener('click', function(e) {
			header._backButtonClickHandler();
			header.dispatchEvent('BackButtonClicked', e);
		});
		
		this._node = node;
		root.insertBefore(this._node, null);
		this._buttons = document.getElementById('nxp-buttons-container');
		this._backButton = document.getElementById('nxp-button-back');

		// CSS
		var header_style = document.createElement('style');
		header_style.appendChild(document.createTextNode(''));
		header_style.textContent = atob(nxp_header_css);
		document.head.appendChild(header_style);
	},

	/**
	 * Show header
	 * @param {string} title [title to be shown in header]
	 * @return {void}
	 */
	show: function() {
		if(!this.exists()) {
			this.create();
		}
		
		this.node.classList.remove('nxp-hidden');
	},

	setTitle: function(title) {
		title = title || '';
		this._title = title;

		this._node.children[0].textContent = this._title;
	},

	/**
	 * Hide header
	 * @return {void}
	 */
	hide: function() {
		if(this.exists()) this.node.classList.add('nxp-hidden');
	},

	remove: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";

		this._node.parentNode.removeChild(this._node);
	},

	/**
	 * Show shadow of header
	 * @return {void}
	 */
	showShadow: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		this._node.classList.remove('nxp-no-shadow');
	},
	/**
	 * Hide shadow of header
	 * @return {void}
	 */
	hideShadow: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		this._node.classList.add('nxp-no-shadow');
	},
	/**
	 * Add new button to header
	 * @param {string} settings [can be a simple url to icon image]
	 * @param {object} settings [or an object with optional fields title and image]
	 * @param {function} handler [js function to handle button tap event]
	 * @return {void}
	 */
	addButton: function(settings, handler) {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		var default_settings = {
			id: null,
			title: 'action',
			image: null,
			width: null,
			height: null,
			number: 0
		};

		settings = settings || default_settings;

		var button = document.createElement('button');
		// We can assign ID to button so we can refer to it in future
		if(settings.id != null) {
			button.id = settings.id;
		}
		// We can set title to our button with or instead of image
		if(settings.title != null) {
			button.textContent = settings.title;
		}
		// We can set number of notifications for the button on creation
		if(settings.number != null) {
			var number = document.createElement('div');
			number.classList.add('nxp-button-number');
			var value = parseInt(settings.number);
			number.textContent = value == 0 ? '' : value;

			button.insertBefore(number, null);
		}		
		// We can set image for our button
		if(settings.image != null) {
			var image = document.createElement('img');
			image.src = settings.image;
			// And specify custom with and\or height for it
			if(settings.width != null) image.width = settings.width;
			if(settings.height != null) image.height = settings.height;
			
			button.insertBefore(image, null);
		}
		

		// insterting created button
		button.addEventListener('click', handler);
		this._buttons.insertBefore(button, null);
	},
	/**
	 * Make buttons of header untappable
	 * @return {void}
	 */
	disableButtons: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		this._buttons.classList.add('nxp-buttons-container--disabled');
	},
	/**
	 * Enable buttons of header back and make them tappable
	 * @return {void}
	 */
	enableButtons: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		this._buttons.classList.remove('nxp-buttons-container--disabled');
	},
	/**
	 * Remeve all buttons from header
	 * @return {void}
	 */
	cleanButtons: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		this._buttons.innerHTML = '';
	},

	/**
	 * Add new button to header
	 * @param {string} id [id of button, can be set during button creation]
	 * @param {int} number [number to show for button, 0 is hidden]
	 * @return {void}
	 */
	setButtonNumber: function(id, number) {
		var button = document.getElementById(id);
		if(button == null) throw "Cannot find button with specified ID";

		var number = button.children[0];
		var value = parseInt(number);

		number.textContent = value == 0 ? '' : value
	},
	/**
	 * Make back button invisible
	 * @return {void}
	 */
	hideBackButton: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";
		
		this._node.classList.add('nxp-back-button-hidden');
		this._backButton.classList.add('nxp-hidden');
	},
	/**
	 * Make back button visible
	 * @return {void}
	 */
	showBackButton: function() {
		if(!this.exists()) throw "NexpaqHeader not exists!";

		this._node.classList.remove('nxp-back-button-hidden');
		this._backButton.classList.remove('nxp-hidden');
	},
	
	/**
	 * Set custom icon for back button
	 * @param {string} icon [url of icon to be used instead of default icon]
	 * @return {void}
	 */
	setBackButtonIcon: function(icon) {
		if(!this.exists()) throw "NexpaqHeader not exists!";

		var image = this._node.getElementsByClassName('npx-button-back-custom')[0];
		image.src = icon;

		this._node.classList.add('nxp-custom-back-button');
	},
	/**
	 * Restore standard icon for back button
	 * @return {void}
	 */
	resetBackButtonIcon: function() {
		this._node.classList.remove('nxp-custom-back-button');
	},
	/**
	* @param {object} {
		color: {string},
		backgroundColor: {string},
		opacity: {number} (0.0-1.0),
		borderBottom(box-shadow): {string},
		iconColor: {string}
	}
	*/
	customize: function(data) {
		if(!this.exists()) throw "NexpaqHeader not exists!";

		if(typeof data !== "object") {
			throw "Data must be an object";
		} else {
			if(data.hasOwnProperty('color')) {
				if(typeof data.color !== "string") {throw "Color has to be string."}
				this._node.style.color = data.color;
			}
			if(data.hasOwnProperty('backgroundColor')) {
				if(typeof data.backgroundColor !== "string") {throw "Background color has to be string."}
				this._node.style.backgroundColor = data.backgroundColor;
			}
			if(data.hasOwnProperty('opacity')) {
				if(typeof data.opacity !== "number" || data.opacity < 0.0 || data.opacity > 1.0) {throw "Opacity has to be number and needs to be between 0.0 - 1.0"};
				this._node.style.opacity = data.opacity;
			}
			if(data.hasOwnProperty('borderBottom')) {
				if(typeof data.borderBottom !== "string") {throw "Border-bottom has to be string."}
				document.querySelector("#nexpaq-header:not(.nxp-no-shadow)").style.boxShadow = data.borderBottom;
			}
			if(data.hasOwnProperty('iconColor')) {
				if(typeof data.iconColor !== "string") {throw "Icon color has to be string."}
				if (document.getElementsByTagName('body')[0].classList.contains("platform-android")) {
					document.querySelector('.nxp-svg-shape').setAttribute("fill",data.iconColor);
				}
				if (document.getElementsByTagName('body')[0].classList.contains("platform-ios")) {
					document.getElementById("Combined-Shape").setAttribute("fill",data.iconColor);
				}
			}
		}
	}
};

// If header initialized after API just plugging in, otherwise creating main Nexpaq object
if(typeof(Nexpaq) != 'undefined') {
	Nexpaq.Header = NexpaqHeader;
} else {
	window.Nexpaq = {
		Header: NexpaqHeader
	};
}

// Nexpaq.API will call 'NexpaqAPIReady function when it is ready, turning it into document event
var NexpaqAPIReadyEvent = new Event('NexpaqAPIReady');
window.NexpaqAPIReady = function() {
	document.dispatchEvent(NexpaqAPIReadyEvent);
}

// When API is ready it can override main Nexpaq object we initialized, so plugging back
document.addEventListener('NexpaqAPIReady', function(event) {
	Nexpaq.Header = NexpaqHeader;
	Nexpaq.API.addEventListener('HardwareBackButtonPressed', function() {
		NexpaqHeader.dispatchEvent('BackButtonClicked', {
			source: 'HardwareBackButtonPressed'
		});
	});
});

document.addEventListener('DOMContentLoaded', function(event) {
	NexpaqHeader._detectCurrentPlatform();
	var injector_js = atob(svg_injector);
	eval(injector_js);
});

// Default back button handler tries to close current instance, 
// if there are any other callback for back button click, it will do nothing
NexpaqHeader.addEventListener('BackButtonClicked', function(event) {
	if(NexpaqHeader.Events.BackButtonClicked.callbacks.length > 1) return;
	Nexpaq.API.Exit();
});


// =========== nexpaq header built-in resources ====
var nxp_header_html = '%%header_html%%';
var nxp_header_css = '%%header_styles%%';
var svg_injector = '%%svg_injector%%';
