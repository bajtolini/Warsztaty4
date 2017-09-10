$(function() {
  var urlHome = 'http://localhost:8282/books';

  var table = $('.books').children().first();
  var listOfBooks = $('#listOfBooks');

  var initTable = true;

  init();

  //list init
  function init() {
    $.ajax({
      url: urlHome,
      type: 'GET',
      datatype: 'json'
    }).done(function(response) {
      listOfBooks.children().remove();
      for (var i = 0; i < response.length; i++) {
        var newLi = $('<li class="collection-item" data-id=' + response[i].id + '>' + response[i].title + '</li>');
        var delBtn = $('<button class="waves-effect waves-light btn" style="left: 30px;">Usuń</button>');

        newLi.append(delBtn);
        listOfBooks.append(newLi);
      }
    }).fail(function() {
      console.log("books no no");
    });
  }

  //event show table row
  listOfBooks.on('click', 'li', function() {
    var id = $(this).attr('data-id');
    if ($('tr[data-id=' + id + ']').length == 0) {
      showID(id);
    }
  });

  //event delete book
  listOfBooks.on('click', 'button', function(e) {
    var idDel = $(this).parent().attr('data-id');
    var delLi = $(this).parent().detach();

    $.ajax({
      url: urlHome + '/remove/' + idDel,
      type:'DELETE',
      datatype: 'json'
    }).done(function() {
      alert('Usunięto książke ' + delLi.text().replace(delLi.children().text(), ''));
    }).fail(function() {
      console.log("fail to del");
    });

    var delTr = $('tr[data-id=' + idDel + ']');
    if (delTr.length != 0) delTr.remove();
    e.stopPropagation();
  });

  //show row (currently only head)
  function row(array) {
    var tr = $('<tr></tr>');
    for (var i = 0; i < array.length; i++) {
      var td = $('<td></td>');
      td.text(array[i]);
      tr.append(td);
    }
    table.append(tr);
  }

  //add book to table
  function showID(id) {
    $.ajax({
      url: urlHome + '/' + id,
      type: 'GET',
      datatype: 'json'

    }).done(function(response) {

        var it = Object.keys(response);

        if (initTable) {
          row(it);
          initTable = false;
        }

        var tr = $('<tr data-id=' + response.id + '></tr>');
        for (var j = 0; j < it.length; j++) {
          var td = $('<td></td>');
          td.text(response[it[j]]);
          tr.append(td);
        }
        table.append(tr);

    }).fail(function() {
      console.log("books no no");
    });
  }

  var submit = $('#add').find('#submit');
  submit.on('click', function() {
    var book = {
      isbn : $('#isbn').val(),
      title : $('#title').val(),
      author : $('#author').val(),
      publisher : $('#publisher').val(),
      type : $('#type').val()
    };

    $('#isbn').val("");
    $('#title').val("");
    $('#author').val("");
    $('#publisher').val("");
    $('#type').val("");

    $.ajax({
      url: urlHome + '/add',
      type: 'POST',
      data: JSON.stringify(book),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).done(function() {
      alert("Dodano książkę");
      init();
    }).fail(function() {
      alert("Niestety nie udało się dodać książki");
    });
  });
});
