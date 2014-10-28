/*
 * Scope !== Context
 *
 * We have no controll on the context of execeuting callbacks.
 * Options 1. Stored Context
 * 	Through Scope/Closure we are able to store the context we require for use in our callback.
 * 	Altough this method might not always work 
 */

		foo = {
			bar : function(callback) {
				callback();
			}
		}

		baz = {
			quux: function() {
				var that = this;

				foo.bar(function() {
					//Context set to global object since we have no access 
					//to callback invocation
					console.log(this);

					//Reference to the original context retained through that
					console.log(that.some);
				});
			}

			some: "value"
		}

		baz.quux();

/* 
 * Options 2. Bound Context
 */

		 function bind(func, context) {
		 	return function() {
		 		var args = Array.prototype.slice.call(arguments);
		 		func.apply(context, args);
		 	}
		 }

		 var bounfFunc = bind(baz.quux, baz);
		 foo.bar(boundFunc);

/*
 * Mixin
 */