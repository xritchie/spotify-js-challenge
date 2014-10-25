'use strict'

window.CookieEngine = (function() {
	function CookieEngine() {
		if (!(this instanceof CookieEngine))
			return new CookieEngine();

		return this;
	}

	CookieEngine.prototype = {
		push: function(key, value, days) {
			var expires = "";
			if (days) {
		        var date = new Date();
		        date.setTime(date.getTime()+(days*24*60*60*1000));
		        var expires = "; expires="+date.toGMTString();
		    }
		    document.cookie = name+"="+value+expires+"; path=/";
		    return this;
		},
		pop: function(key) {
			var value = this.get(key);
			this.push(key,"",-1);
			return value;
		},
		get: function(key) {
			var value = "; " + document.cookie;
		  	var parts = value.split("; " + key + "=");
			if (parts.length == 2) return parts.pop().split(";").shift();
			return null;
		},
		isEnabled: function() {
			return navigator.cookieEnabled;
		}
	};

	return CookieEngine;
})();

window.LocalStorageEngine = (function() {
	function LocalStorageEngine() {
		if (!(this instanceof LocalStorageEngine))
			return new LocalStorageEngine();

		return this;
	}

	LocalStorageEngine.prototype = {
		push: function(key, value) {
			localStorage.setItem(key, value);
			return this;
		},
		pop: function(key) {
			var value = this.get(key);
			localStorage.removeItem("lastname");
			return value;
		},
		get: function(key) {
			return localStorage.getItem(key);
		},
		isEnabled: function() {
			return (typeof(Storage) !== "undefined");
		}
	};

	return LocalStorageEngine;
})();

window.CustomEvent = (function () {
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;

	return CustomEvent;
})();

window.tabunication = (function() {

	var instance;

	var fireEvent = function(eventId, payload) {
		var event = new CustomEvent(eventId, payload);
		document.dispatchEvent(event);
	};

	function Tabunication(engine) {
		if (!(this instanceof Tabunication))
			return new Tabunication(selector);

		this.engine = (!engine) ? new LocalStorageEngine() : engine;
		this.callbacks = [];

		document.addEventListener("tabunication:push", function(e) {
			console.log("pushed: " + e.detail.key);
		});

		document.addEventListener("tabunication:pop", function(e) {
			console.log("poped: " + e.detail.key);
		});

		window.addEventListener('storage', function (e){
			if (this.callbacks.length > 0) {
				this.callbacks.forEach(function(entry) {
					entry.apply(this, [e]);
				}.bind(this))
			} else {
				console.log("key: " + e.key);
			    console.log("newValue: " + e.newValue);  
			    console.log("oldValue: " + e.oldValue);  
			    console.log("url: " + e.url);  
			    console.log("storageArea: " + e.storageArea);  
			}  
		}.bind(this));

		return this;
	};

	Tabunication.prototype = {
		push: function (key, value) {
			this.engine.push(key, value);
			fireEvent('tabunication:push', {'detail': {'key': key}});
			return this;
		},
		pop: function (key) {
			fireEvent('tabunication:pop', {'detail': {'key': key}});
			return this.engine.pop(key);
		},
		get: function (key) {
			return this.engine.get(key)
		},
		addCallback: function(callback) {
			this.callbacks.push(callback);
			return this;
		},
		clearCallbacks: function() {
			this.callbacks = [];
			return this;
		}
	};

	return {
		getInstance: function() {
			if (!instance) {
				instance = new Tabunication();
			}
			return instance;
		},
		create: function() {
			return this.get();
		}
	};
})();

window.onload = function() {
	localStorage.clear();
    window.tabunication.getInstance();
}