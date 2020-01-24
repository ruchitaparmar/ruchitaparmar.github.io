
function getLatestArtist() {
  $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&user=joshuaraichur&api_key=47a86d3261dfc8489a35366ba30db276&format=json", function(data) {
    $("#music").html("The last artist I listened to was " + data.recenttracks.track[0].artist["#text"] + ". ");
  });
}

function getAge(d1, d2){
  var birthdate = new Date("1997/08/31");
  var cur = new Date();
  var diff = cur - birthdate;
  return (diff/(1000 * 60 * 60 * 24 * 365.25)).toFixed(8);
}

function setAge() {
  var age = getAge(new Date(1997, 08, 31));
  $("#age").text(" and I'm " + age + " years old");
}

$(document).ready(function() {
  $("time.timeago").timeago();
  getLatestArtist();
  setAge();
  setInterval(setAge, 100);
});
