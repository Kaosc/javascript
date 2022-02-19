let countEl = document.getElementById("count-el");
let saves = document.getElementById("saves");
let count = 0;

function increment () {
    count +=1;
    countEl.innerText = count;
}

function save() {
    saves.innerHTML += " " + count + " |"
    countEl.innerHTML = "0";
    count = 0;
}