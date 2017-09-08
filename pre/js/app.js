$(function() {
  //rozgrzewka1
  var update = $('.update');

  getCurrentTime();

  update.on('click', function() {
    getCurrentTime();
  });

  var divSW = $('#starwars');
  $.ajax({
    url: 'http://swapi.co/api/people/4/',
    type: 'GET',
    datatype: 'json'

  }).done(function(response) {
    var it = Object.keys(response);

    for (var i = 0; i < it.length; i++) {
      var pNew = $('<p></p>');
      pNew.text(it[i] + ' - ' + response[it[i]]);
      divSW.append(pNew);
    }
  }).fail(function() {
    console.log("starwars no no");
  });

});

function getCurrentTime() {
  var url1 = 'http://date.jsontest.com';
  var date = $('.date');
  var time = $('.time');

  //ajax request
  $.ajax({
    url: url1,
    type: 'GET',
    datatype: 'json',

  }).done(function(response) {
    date.text(response.date);
    time.text(response.time);
  }).fail(function() {
    console.log("JASNY GWINT!");
  });
}
