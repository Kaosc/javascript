var imageUrls = [];
var stopFor = false;
var searchInput;

// GET INPUT VALUE AFTER USER HITS THE ENTER
document.querySelector("#input-box").addEventListener("keyup",function(e){
    searchInput = document.querySelector("#user-input").value;

    if (e.which === 13) {
        getData();
    }
});


// GETTING GIFS WITH VALUE FROM GIPHY API
function getData(){
    
    var url = `https://api.giphy.com/v1/gifs/search?api_key=###KEY###&q=${searchInput}&limit=21&offset=0&rating=g&lang=en`
    
    // AJAX REQUEST
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open( 'GET', url );
    GiphyAJAXCall.send();
    
    GiphyAJAXCall.addEventListener('load',function (e){
        var data;
        data = e.target.response;
        tv(data);
    });
}

// SHOWS THE GIFS
function tv(data){
    var response = JSON.parse(data)
    imageUrls = response.data
    var screen = document.querySelector("#container");
    console.log(imageUrls);
    console.log(imageUrls.lenght);

    // REPEAT GIFS EVERY 3.3 SEC
    for (let count = 0; count < 21; count++) {
            
        setTimeout(function(){
            var src = imageUrls[count].images.fixed_height.url;
            screen.innerHTML = "<img src=\"" + src + "\">";
            console.log(src);

        }, 3300*count);

        // WATING THE USER ENTER ANOTHER VALUE / IF DIFFERENT VALUE COMES THIS FOR LOOP WILL BREAK IN BELOW STATMENT
        // Reason of this; if user enters a different value after before this loops ends, This loop combining with other gif loop. 
        // we don't want that.
        document.querySelector("#input-box").addEventListener("keyup",function(e){
        
            if (e.which === 13) {
                stopFor = true;
            }
        });

        if (stopFor === true)
        {
            break;
        }
    }
}


