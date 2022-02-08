//const YOUTUBE_API_KEY = "AIzaSyAPbN4wfymOf-QzxRXeAxJP6t3Dn3m1Mjc";
const YOUTUBE_API_KEY = "AIzaSyCFocTqrMei2h6n1F-uRjNXzhoLJaGoZ6I";
async function main(){
    let query = document.getElementById("input-search").value;
    if(query != ""){
        console.log("query : " + query);
        const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);      //debug
    
        document.getElementById("search-desc").textContent = 'Résultats pour "' + query + '".';
    
        for(var i=0 ; i<data.items.length ; i++){
            let title = data.items[i].snippet.title;
            let thumbnail = data.items[i].snippet.thumbnails.medium.url;
            let channel = data.items[i].snippet.channelTitle;
    
            document.getElementById("results").innerHTML += '<div class="border-2 rounded-lg grid justify-items-center shadow-md"><img src="' + thumbnail + '"><h3 class="text-lg uppercase font-semibold">' + title + '</h3><h4 class="text-base">' + channel + '</h4></div>';
        }    
        query = "";
    }
}