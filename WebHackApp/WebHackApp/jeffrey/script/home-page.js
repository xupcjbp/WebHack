const videoDemoElement = document.querySelector( "video", "#videoDemo" );
const reloadButtonElement = document.querySelector( "button", "#videoReload" );
const audioDemoElement = document.querySelector( "audio", "#audioDemo" );

reloadButtonElement.onclick = function() {
	console.log( "Reloading video will reset the media to the beginning" );
	videoDemoElement.load();
};

/* Doesn't look like audioTracks is supported by my Chrome browser?!
function audioTrackAdded( track ) {
	// do something with the track
}
videoDemoElement.audioTracks.onaddtrack = function( event ) {
	// When audio tracks are added to this media, this callback fires
	audioTrackAdded( event.track );
};
*/