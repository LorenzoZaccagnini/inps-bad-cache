$(document).ready(function() {
  console.log('ready');

  $radios = $("<div></div>");
  $radios.append('<input type="radio" name="firstname" id="r1" value="1">');
  $radios.append('<label for="r1">Leonardo</label><br>');
  $radios.append('<input type="radio" name="firstname" id="r2" value="2">');
  $radios.append('<label for="r2">Donatella</label><br>');
  $radios.append('<input type="radio" name="firstname" id="r3" value="3">');
  $radios.append('<label for="r3">Michelangela</label><br>');

  $("#pippo").append($radios);

  $("#send_button").click(function() {
    var radioValue = $("input[name='firstname']:checked").val();
    if (radioValue) {

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/user?id=${radioValue}`,
        "method": "GET",
      }

      var settings_cache = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/user_cache?id=${radioValue}`,
        "method": "GET",
      }

      $.ajax(settings).done(function(response) {
        $pippoTitle = $(`<h2>Risultato con Cache (Vulnerabilità dell'INPS)</h2>`);
        $pippoDiv = $(`<div>Nome: ${response.name} <br />Colore: ${response.color}</div>`);
        $("#pippoPasCache").empty().append($pippoTitle);
        $("#pippoPasCache").append($pippoDiv);

      });

      $.ajax(settings_cache).done(function(response) {
        $pippoTitle = $(`<h2>Risultato corretto senza Cache</h2>`);
        $pippoDiv = $(`<div>Nome: ${response.name} <br />Colore: ${response.color}</div>`);
        $("#pippoAvecCache").empty().append($pippoTitle);
        $("#pippoAvecCache").append($pippoDiv);

      });
    }
  });

});


//Di quale utente vuoi sapere il colore preferito?
