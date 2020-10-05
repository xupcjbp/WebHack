function MyClass( name ) {
	this.myName = name;
	this.setMyName = function( newName ) {
		this.myName = newName;
	}
}