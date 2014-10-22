'use strict'

window.cookieEngine = (function() {
	function CookieEngine() {}

	CookieEngine.prototype.push = (function(key, value, days) {
		var expires = "";
		if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    document.cookie = name+"="+value+expires+"; path=/";
	    return this;
	});

	CookieEngine.prototype.pop = (function(key) {
		var value = this.get(key);
		this.push(key,"",-1);
	});
	
	CookieEngine.prototype.get = (function(key) {
		var value = "; " + document.cookie;
	  	var parts = value.split("; " + key + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	});

	CookieEngine.prototype.isEnabled = (function() {
		return navigator.cookieEnabled;
	});
});


window.localStorageEngine = (function() {
	function LocalStorageEngine() {}

	LocalStorageEngine.prototype.push = (function(key, value) {
		localStorage.setItem(key, value);
	});

	LocalStorageEngine.prototype.pop = (function(key) {
		var value = this.get(key);
		localStorage.removeItem("lastname");
		return value;
	});

	LocalStorageEngine.prototype.get = (function(key) {
		localStorage.getItem(key);
	});

	LocalStorageEngine.prototype.isEnabled = (function() {
		return (typeof(Storage) !== "undefined");
	});
});

window.tabunication = (function() {

	var instance;

	function Tabunication(engine) {


		if (!(this instanceof SpotifyDOM))
			return new Tabunication(selector);

		var engine = (!engine) ? window.localStorageEngine : engine;

		return this;
	}

	Tabunication.prototype.push = (function (key, value) {
		return this.engine.push(key, value);
	});

	Tabunication.prototype.pop = (function (key) {
		return this.engine.pop(key);
	});

	Tabunication.prototype.get = (function (key) {
		return this.engine.get(key)
	});

	var tabunication = {
		get: function() {
			if (!instance) {
				instance = new Tabunication();
			}
			return instance;
		}
	};

	return tabunication;

}());