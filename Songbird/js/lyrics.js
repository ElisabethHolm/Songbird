const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

$("#button").click(function(){
    container.innerHTML=""; //empties any text in the div element (so you aren't left with the previous search's results)
    
    var title = $("#title").val().toLowerCase();
    var artist = $("#artist").val().toLowerCase();

var request = new XMLHttpRequest();
var apiKey = '82fc6368a56ff5d625d9ddb23211580b';

var q_track = title.replace(/ /g, "%20");
var q_artist = artist.replace(/ /g, "%20");


//depending on if the user inputs an artist or not, the url for the API changes
if (artist==""){
request.open('GET', 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=' + q_track + '&apikey=' + apiKey, true);}
else{
request.open('GET', "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_artist=" + q_artist + "&q_track=" + q_track + "&apikey=" + apiKey, true);    
}
    
request.onload = function () {
    
  // Begin accessing JSON data here
  var data = JSON.parse(this.response.substring(9, this.response.length-2));
    console.log(data);
  if (request.status >= 200 && request.status < 400){ //if the request was successful
      
      const h2 = document.createElement('h2'); //make an h2 element and put in the title (and artist if there is one)
      if (artist==""){
          h2.textContent = title;
      }
      else{
          h2.textContent = title + " by " + artist;
      }

      const p = document.createElement('p'); //make a p element and put in the lyrics
      var l = data.message.body.lyrics.lyrics_body;
      p.innerHTML = l.replace(/\n/g, "<br />");

      container.appendChild(h2);
      container.appendChild(p);
  } 
}


request.send(); 
});