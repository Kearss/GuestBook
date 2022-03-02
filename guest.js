function LoadList() {
    // määritellään kutsu
    var xhttp = new XMLHttpRequest();
    // avataan tiedosto
    xhttp.open("GET", 'dataset.json', true);
    //lähetään kutsu..
    xhttp.send();
    // jos kutsu tulee takaisin. voidaan aloittaa function käyttö.
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
}
function myFunction(json) {
    //saatu xml tiedoston kutsu
    var xmlDoc = json.responseJson;
    // määrittelee talukon etukäteen.
    var table="<tr><th>Username</th><th>Country</th><th>Message</th></tr>";
    //heataan kaikki tiedot Show nimestä tagistä sisältö.
    var x = xmlDoc.getElementsByTagName("");


    for (var i = 0; i < x.length; i++) { 
        // tekee taulukon
        table += "<tr><td>" +
        //hakee talukolle jokaisen esityksen riville
        x[i].getElementsByTagName("Username")[0].childNodes[0].nodeValue +
        "</td><td>" +
        //hakee talukolle jokaisen esityksen pituunden riville
        x[i].getElementsByTagName("Country")[0].childNodes[0].nodeValue +
        "</td><td>" + 
        //hakee talukolle jokaisen esityksen luokitksen riville  
        x[i].getElementsByTagName("Message")[0].childNodes[0].nodeValue +
        "></td></tr>";
    }
    //tulostaa lopuksi demo taulukolle kaikki tiedot.
    document.getElementById("userdata").innerHTML = table;
  }
