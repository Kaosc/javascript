const BASE_URL = "https://kaosc.github.io/javascript-projects/"

const urls = [
	"AirCnC",
	"AirCnC Dashboard",
	"Black Jack Game",
	"Chrome Extention",
	"GIF TV",
	"Giphy Search Engine",
	"Happy Hour",
	"Sound Cloud Player",
	"Passanger Count App",
	"Sound Cloud Player",
	"Tabletop Google Charts",
]

function listLinks() {
	const section = document.getElementById("main")
	urls.map((url) => {
		const a = document.createElement("a")
		a.innerText = url
		a.href = `${BASE_URL}${url.split(" ").join("")}`
		a.className = "button"
		section.appendChild(a)
	})
}
