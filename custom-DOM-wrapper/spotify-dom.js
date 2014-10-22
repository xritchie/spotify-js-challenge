'use strict'

/**
 * Constructor for the SpotifyDOM object.
 *
 * @param selector {String}, it can follow the following formats:
 *  - class e.g. '.element'
 *  - identifier e.g. '#element'
 *  - tag name e.g. 'li'
 * @return {SpotifyDOM}
 */
var SpotifyDOM = function(selector) {

	if (!(this instanceof SpotifyDOM))
		return new SpotifyDOM(selector);

	if (!selector)
		this.docs = document;
	else if (selector.docs)
		this.docs = selector.docs;
	else if (typeof selector == 'string' || selector instanceof String)
	{
		var updateSelector = function(selector) {
			return (['.','#'].indexOf(selector[0]) != -1) ? selector.slice(1, selector.length) : selector;
		};

		var method = function(selector) {
			switch(selector[0]) {
			    case '.':
			        return document.getElementsByClassName;
			        break;
			    case '#':
			        return document.getElementById;
			        break;
			    default:
			        return document.getElementsByTagName;
			}
		}

		this.docs = method(selector).apply(document, [updateSelector(selector)]);
	}


	return this;
};

/**
 * Changes or returns the content of the element.
 *
 * @param content {String}
 * @return {SpotifyDOM}
 * @method html
 * @return {String} The content of the element
 * @throws {SpotifyDOMInvalidElement} When the current content of the wrapper
 * is a collection,
 *  e.g. SpotifyDOM(‘li’).html(‘test’)
 */
SpotifyDOM.prototype.html = function(content) {
	var isCollection = this.isCollection();
	if  (isCollection && (this.docs.length != 1))
			throw "SpotifyDOMInvalidElement"; 

	var updateDoc = function(doc) {
		if (!content)
			return doc.innerHTML;

		doc.innerHTML = content;
		return this;
	}.bind(this);

	return (!isCollection) ? updateDoc(this.docs) : updateDoc(this.docs[0]);
};

/**
 * Applies the callback to every element of the collection, the callback will
 * receive the current SpotifyDOM object of the iteration.
 *
 *  e.g. SpotifyDOM(‘li’).each(function(element) { element.html(‘test’); });
 *
 * @method each
 * @param {Function} callback
 * @return {SpotifyDOM}
 */
SpotifyDOM.prototype.each = function(callback) {
	if (this.isCollection())
		for (var i = 0; i < this.docs.length; i++) 
			callback(new SpotifyDOM({docs: this.docs[i]}));

	return this;
};

/**
 * @method isCollection
 * @return {Boolean} true if the currently selected element is a collection(e.g. ‘li’).
 */
SpotifyDOM.prototype.isCollection = function() {
	return this.docs && Object.prototype.toString.call(this.docs) === '[object HTMLCollection]';	
};

/**
 * @test - run on load the check all the functionality is working correctly
 */
window.onload = function() {
	console.log(SpotifyDOM());
	console.log(SpotifyDOM('#p1').html());
	console.log(SpotifyDOM('#p1').html('RESET'));
	console.log(SpotifyDOM('.paragraph').html());
	SpotifyDOM('li').each(function(content) {console.log(content.html())});
}

