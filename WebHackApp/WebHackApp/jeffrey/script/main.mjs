// DOM: document object model allows Javascript to manipulate HTML elements
const headingElement = document.querySelector('h1');
headingElement.textContent = 'Hello world!';


// choose 'let' over 'var'
let myStr = 'jeffrey';
let myBool = true; // no quotations needed for boolean; 'undefined' evaluates to false
if( myBool === true ) { // triple equal signs mean equal in value and type; whereas double equal signs mean equal in value
	// alert( myStr ); /* supported by the browser, shows a popup */
	myStr = 'not jeffrey';
}
console.log( myStr );
let myArr = [ true, 'string', headingElement ];
let myNum = 0;
function passByWhat( num ) {
	num = 5;
	return num;
}
passByWhat( myNum );
if( myNum === 0 ) {
	console.log( 'pass by value' );
} else {
	console.log( 'pass by ref' );
}


let myClassInst = new MyClass( 'Jeffrey' );
console.log( myClassInst.myName );
const myHtml = document.querySelector('html');
// Events: my guess is it's supported by DOM as well
myHtml.onclick = function() { // anonymous function
	//alert('Ouch! Stop poking me!');
	myClassInst.setMyName( 'Not Jeffrey' );
};


let conceptArtElement = document.querySelector( 'img', '#conceptArt' );
let downloadElement = document.querySelector( 'a', '#download' );
const imageDirectory = 'resource/image/';
const conceptArtImage1 = 'concept-art.jpg';
const conceptArtImage2 = 'concept-art-original.jpg';
const downloadDirectory = 'download/';
const conceptArtName1 = 'JeffreyConceptArt1.jpg';
const conceptArtName2 = 'JeffreyConceptArt2.jpg';
conceptArtElement.onclick = function() {
	const currentImage = conceptArtElement.getAttribute( 'src' ).replace( imageDirectory, '' );
	if( currentImage === conceptArtImage1 ) {
		conceptArtElement.setAttribute( 'src', imageDirectory.concat( conceptArtImage2 ) );
		downloadElement.setAttribute( 'href', downloadDirectory.concat( conceptArtImage2 ) );
		downloadElement.setAttribute( 'download', conceptArtName2 );
	} else if( currentImage === conceptArtImage2 ) {
		conceptArtElement.setAttribute( 'src', imageDirectory.concat( conceptArtImage1 ) );
		downloadElement.setAttribute( 'href', downloadDirectory.concat( conceptArtImage1 ) );
		downloadElement.setAttribute( 'download', conceptArtName1 );
	} else {
		console.log( 'function swapConceptArt found unexpected image' );
	}
};

function setPageHeading() {
	const cachedName = localStorage.getItem( 'name' );
	if( cachedName === null ) {
		console.log( 'function setPageHeading: no cached name found' );
		headingElement.textContent = 'Greetings';
	} else if( cachedName === '' ) {
		console.log( 'function setPageHeading: empty name found' );
		headingElement.textContent = 'Greetings';
	} else {
		let storedName = localStorage.getItem('name');
		headingElement.innerHTML = 'Greetings, ' + storedName; // how come `innerHTML` and `textContent` is the same here?;
	}
}
function setUserName() {
	let myName = prompt('Please enter your name.');
	if( myName === null ) { // what is the different between `null` and `undefined`
		console.log( 'function setUserName: prompt cancelled' );
	} else if( myName === '' ) {
		/*
			Clear local web storage
			We could also do `localStorage.removeItem( 'name' );` here
		*/
		console.log( 'function setUserName: clearing storage' );
		localStorage.clear();
	} else {
		/*
			Web Storage API
			Not sure when the values are normally cleared
		*/
		localStorage.setItem('name', myName);
	}
	setPageHeading();
}
let buttonElement = document.querySelector( 'button' );
buttonElement.onclick = function() {
	setUserName();
};
setPageHeading();


const dynamicListElement = document.createElement( 'ol' );
document.querySelector('#lowerPage').append( dynamicListElement );
const listItem = document.createElement( 'li' );
listItem.textContent = 'A dynamically added list item'
dynamicListElement.appendChild( listItem );