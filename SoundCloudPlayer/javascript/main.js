var SoundCloudApi = {};
var UI = {};

// ----------------------- SEARCH ----------------------------

UI.EnterPress = function() {
	document.querySelector('.js-search').addEventListener('keyup', function(e){
    	inputValue = document.querySelector('.js-search').value;
    	if (e.which === 13) {
      	// SoundCloudApi.getTrack(inputValue);
      	console.log(inputValue);
    }
  });
}

UI.SubmitClick = function() {
  document.querySelector('.js-submit').addEventListener('click', function(){
    inputValue = document.querySelector('.js-search').value;
      // SoundCloudApi.getTrack(inputValue);
      console.log(inputValue);
  });
}

UI.ResetClick = function(){
  document.querySelector('#reset-button').addEventListener('click', function(){
    var sideBar = document.querySelector('.js-playlist');
    sideBar.innerHTML = "";
    localStorage.clear();

  });
}

UI.EnterPress();
UI.SubmitClick();
UI.ResetClick();

// ----------------------- API  ----------------------------

SoundCloudApi.init = function()
{
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}

SoundCloudApi.init();

SoundCloudApi.getTrack = function (inputValue)
{
  SC.get('/tracks/', {
		q: inputValue
	}).then(function(tracks) { // < Real tracks list here
  	console.log(tracks);
    // SoundCloudApi.renderTracks(tracks); // When the real tracks come through
	});
}

SoundCloudApi.getTrack("FATE"); // sample artist

// -----------------------------------------------------------------------------------

var tracks = [1,2,3]; // temporary track list

// ----------------------- CARD GENERATION FOR EACH TRACK ----------------------------

SoundCloudApi.renderTracks = Function(tracks)
{

  tracks.forEach(function(track){

    // CREATE CARD
    var card = document.createElement('div');
    card.classList.add("card");

    // CREATE CARD & APPEND TO SEARCH RESULT DIV
    var scearchResults = document.querySelector(".js-search-results");

    // CREATE IMAGE DIV & APPEND CARD
    var image = document.createElement('div');
    image.classList.add("image");

    var src = document.createElement('img');
    src.classList.add('image_img');
    src.src = track.artwork_url || "https://picsum.photos/200"; // only if music artwork doesn't exits or blank

    // CREATE CONTENT DIV & APPEND TO CARD
    var content = document.createElement('div')
    content.classList.add("content");

    // CREATE HEADER DIV & APPEND TO CONTENT DIV
    var header = document.createElement('div');
    header.classList.add('header');

    // CREATE LINK (a) & APPEND TO HEADER DIV
    var link = document.createElement('a');
    link.setAttribute("target","_blank");
    link.href = ">>> SONG URL HERE (track.permalink_url) <<<"
    link.innerHTML = track.title || "SONG TITLE COULDN'T LOAD";

    // CREATE ADD PLAYLIST BUTTON & APPEND TO CARD
    var addButton = document.createElement('div');
    addButton.classList.add("ui", "bottom", "attached", "button", "js-button");

    // CREATE ICON & APPEND TO BUTTON
    var icon = document.createElement('i');
    icon.classList.add("add","icon");

    // CREATE SPAN & APPEND TO BUTTON
    var span = document.createElement('span');
    span.innerHTML = "Add to playlist";

    // APPENDS
    scearchResults.appendChild(card);

    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(addButton);

    image.appendChild(src);

    content.appendChild(header);
    header.appendChild(link);

    addButton.appendChild(icon);
    addButton.appendChild(span);

    addButton.addEventListener('click', function(){
      SoundCloudApi.getEmbed(">> SONG LING WILL GOES HERE << (track.permalink_url)");
    });
  });

}

SoundCloudApi.renderTracks(tracks);

SoundCloudApi.getEmbed = function(trackURL) {
  console.log("click");

  SC.oEmbed('https://soundcloud.com/darkfuturegang/fate-heartfelt', // trackURL will goes here
  {
    auto_play: true
  }).then(function(embed){
    console.log('oEmbed response: ', embed);
    var sideBar = document.querySelector('.js-playlist');

    var box = document.createElement('div');
    box.innerHTML = embed.html;

    sideBar.insertBefore(box,sideBar.firstChild);

    // Backup Playlist
    localStorage.setItem("key", sideBar.innerHTML);
  });

}

// Recover the added songs before
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");
