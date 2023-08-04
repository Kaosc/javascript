var searchInput
var url

const GIPHY_KEY = process.env.GIPHY_KEY

document.querySelector(".js-go").addEventListener("click", function () {
	searchInput = document.querySelector("input").value
	getData()
})

document.querySelector(".js-userinput").addEventListener("keyup", function (e) {
	searchInput = document.querySelector("input").value

	// if the key ENTER is pressed
	if (e.which === 13) {
		getData()
	}
})

function getData() {
	url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${searchInput}&limit=21&offset=0&rating=g&lang=en`
	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest()
	GiphyAJAXCall.open("GET", url)
	GiphyAJAXCall.send()

	GiphyAJAXCall.addEventListener("load", function (e) {
		var data = e.target.response
		pushToDOM(data)
	})
}

function pushToDOM(data) {
	var response = JSON.parse(data)
	var imageUrls = response.data
	var container = document.querySelector(".js-container")

	container.innerHTML = "" // Clears the container content before get new gifs

	//console.log(imageUrls);
	imageUrls.forEach(function (image) {
		var src = image.images.fixed_height.url
		container.innerHTML += '<img src="' + src + '" class="container-image">'
	})
}
