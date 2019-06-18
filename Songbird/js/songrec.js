//the overall idea is I'm using the spotify api to get songs (and information about each song) in different playlists based on whichever genre the user chooses

document.getElementById('recs').style.display="none";

const table = document.getElementById('table');

$("select").change(function(){
    var token = $("#token").val();
  var auth_id = token;
    
   /*  //my latest attempt at translating the curl into javascript, which unfortunately did not work
    //ajax jquery to get authorization id
    $.ajax({url: "https://accounts.spotify.com/api/token",
            method: 'POST',
            dataType: "json",
            headers: {Authorization: 'Basic MWI1N2NkMzUxY2ZmNGZhMjkzMDYwNmUwMGEzNzhiOGI6M2UzMmJhZmI4NWY4NDY4MmI3MTRjNzNlYWMzN2EzZGU='}, data: "grant_type=client_credentials",
            success: function(msg){
                console.log("success");
                console.log(msg);
                //var r=JSON.parse(result);
    //auth_id=r.access_token;//this line idk
  }});
    console.log(auth_id); */
    
    
var genre=$(this).children("option:selected").val();
console.log(genre);

    
    table.innerHTML=""; //empties any text in the div element (so you aren't left with the previous search's results)
    
    var playlist;

//playlist id's of various spotify playlists
    if (genre=="topcharts")
playlist = "37i9dQZEVXbLRQDuF5jeBp";
    if (genre=="hiphop")
playlist = "0Mh2Fj2fUcTIMuv98Ol8jp";
    if (genre=="chillrap")
playlist = "0VVYqBry2WZ1tIpqjeZoTV";
    if (genre=="lofi")
playlist = "6YydFkbopnBXccbMIXi9Cg";
    if (genre=="contemporary")
playlist = "1zhyHFApQwM8orpfHhnZ5d";
    if (genre=="upbeatjazz")
playlist = "7b21Uv3lvp0k5HRL3F2mf8";
    if (genre=="smoothjazz")
playlist = "5tYP3nadT118D1xWxpH87i";
    if (genre=="classical")
playlist = "5ifMsPihlkYEGCakqfqj17";
    if (genre=="pleasant")
playlist = "3TTd0wzPzkTn7dzMLqloJn";

    
if(genre=="unselected"){
document.getElementById('recs').style.display="none"; //hides the table if there is no genre selected
}

if(genre != "unselected"){
    document.getElementById('recs').style.display="block"; //displays the table if there is a genre selected
    
var request = new XMLHttpRequest();


request.open('GET', 'https://api.spotify.com/v1/playlists/' + playlist + '/tracks');
request.setRequestHeader('Authorization', 'Bearer ' + auth_id);
request.onload = function (){
    
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400){ //if the request was successful

      
          const headers = document.createElement('tr');
          const one = document.createElement('th');
          const two = document.createElement('th');
          const three = document.createElement('th');
          
            one.textContent="Title";
          two.textContent="Artist";
          three.textContent="Album";
          
          headers.appendChild(one);
          headers.appendChild(two);
            headers.appendChild(three);
          
          
          table.appendChild(headers);
      
            //adds all the tracks into one array
      var items = data.items;
      
      var Tarray = new Array();
      var ARarray = new Array();
      var ALarray = new Array();
      var Al_ids = new Array();
      
      for (j=0; j<items.length;j++){ //for loop which pulls data from each track object and spearates them into their own simpler string 
          //arrays to manipulate the title, artist(s), and album name
          
          var title = items[j].track.name;
          Tarray.push(title);
          var album = items[j].track.album.name;
          ALarray.push(album);
          var album_id = items[j].track.album.id;
          Al_ids.push(album_id);
          var artists = items[j].track.artists;
          var artist = "";
          
      if (artists.length > 1){ //gets artist name and list artists if there are multiple (turns into a single string)
          
          for (i=0; i<artists.length; i++){
          artist = artist + artists[i].name + ", "}
          
      artist = artist.substr(0, artist.length-2); //cuts ", " off end of artist string
      }
        else{
            artist = artists[0].name;
        }
          ARarray.push(artist);
      }
       
      var indexes = new Array();
      for (i=0; i<items.length;i++){
          indexes[i]=i;
      }
      indexes = shuffle(indexes); //shuffle all the indexes of each song
      for (i=0; i<10; i++){ //for a random 10 songs in the chosen playlist, make a row and add to the table
          var index = indexes[i];
          
          var title = Tarray[index];
          var artist = ARarray[index];
          var album = ALarray[index];
          
          const tr = document.createElement('tr');
          const T = document.createElement('td');
          const Ar = document.createElement('td');
          const Al = document.createElement('td');
          const href = document.createElement('a');
          href.setAttribute('href', 'https://open.spotify.com/album/' + Al_ids[index]); //links the album
          href.setAttribute('target', '_blank')
          href.appendChild(Al);
          
          T.textContent=title;
          Ar.textContent=artist;
          Al.textContent=album;
          
          tr.appendChild(T);
          tr.appendChild(Ar);
          tr.appendChild(href);
          
          
          table.appendChild(tr);
      }
  }
}
request.send();
    
   /* if(worked==false){
        const recs = document.getElementById("recs");
        recs.innerHTML="";
        recs.innerHTML="<h1>Oops, something's wrong...<h1>" */
    }
})

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};