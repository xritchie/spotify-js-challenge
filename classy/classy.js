/*
 *				NOTES
 *-------------------------------------
 *
 * inheritance works by going up the prototype 
 * chain once the key is found it is used therefore
 * overriding any other keys further up the chain
 *
 * this will always hold the same context irrispective
 * how high up in the prototype chain you are therefore
 * we are able to access child elements from the parent 
 * elements from the this attribtue.
 *
 * when functions are defined inside the constructor function
 * a unique copy per instance will be created therefore
 * using up more memory. To solve this all you need to do 
 * is assign the functions using the prototype of the 
 * constructor object
 *
 * Calling the super of a class instance can be 
 * achieved in the following manners;
 * 1. Call the function of the prototype manually
 *		Object.prototype.method.call(context, args);
 * 2. If function is an object literal then you need
 *	  to keep a reference to the object literal and 
 *	  access the function from there;
 *	       objLiteral.method.call(context, args);
 *
 */

//Create an Object.create function in browser which do not support it 
if (!Object.create || !typeof Object.create=='function') {
	Object.create == function(obj) {
		//Create a function which will be used as our new Object
		var F = function(){};
		//Assign the objects prototype to the new function
		F.prototype = obj;
		//return an instance of the new function which the assigned prototype
		return new F();
	}
}

//ClassObjects a small framke work for javascript inheritence
ClassyObjects = {};

//Copies all attributes from one object to another
ClassyObjects.copyTo = function(target, source) {
	for(var attr in source) {
		target[attr] = source[attr];
	}
}

//Creates an object with a specified prototype and a definition
ClassyObjects.inherits = function(inherited, definition){
	//Creates an object with the same prototype as inherited
	var inheritedInstance = Object.create(inherited);
	//Copies all attributes from the definition to the instance
	ClassyObjects.copyTo(inheritedInstance, definition);
	//Creates a Constructor for the new inherited class
	var ClassConstructor = function() {
		//assign super the the inherited prototype therefore we are able to access the super class without this.prototype.foo
		this.super = inherited;
	}
	//Assign the prototype to the inheritedInstance prototype 
	ClassConstructor.prototype = inheritedInstance;
	//return the class constructor
	return ClassConstructor;
}

//given a defintion which contains both a prototype we can extend and specific data we need to copy
ClassyObjects.extend = function(definition) {
	//this in this paritcular scenario has the value of classyObj which contains a definition of extend assigned in the define function
	var prototype = this;
	//if prototype isn't actually an object literal but a constructor/function definition then extend it's prototype no the object literal assigned 
	if (typeof prototype == 'function') {
		prototype = this.prototype;
	}
	//Create a constructor which from the prototype extracted and the defintiion
	var Constructor = ClassyObjects.inherits(prototype, definition);
	//Assign the extned method to be used in our framework
	Constructor.extend = this.extend;
	//return the constructor
	return Constructor;
}

ClassyObjects.define = function(definition) {
	//Create an object literal
	var classyObj = {};
	//assign an extend function to this object literal
	classyObj.extend = ClassyObjects.extend;
	//Create a constructor which inherits 
	return classyObj.extend(definition);
}

ParentClass = ClassyObjects.define({
	foo:'bar',
	baz: function() {
		console.log(this.foo);
	}
});

ChildClass = ParentClass.extend({
	newFoo: 'barx2',
	baz2: function() {
		console.log(this.newFoo);
	}
})


parentObj = new ParentClass();
parentObj.baz();

childObj = new ChildClass();
childObj.baz();
childObj.baz2();

