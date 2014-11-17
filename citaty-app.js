var last_i = -1;

function ukazCitat() {
    var n = document.citaty.length;
    var i;

    do {
        i = Math.floor((Math.random() * n));
    } while (i == last_i && n > 1);
    last_i = i;

    $("#zobrazeny-citat").hide(200);
    setTimeout(function(){$("#zobrazeny-citat").text(document.citaty[i]).show(500);}, 200);
}

function nactiCitaty() {
    var ulozene = localStorage.getItem("citaty");
    if (ulozene === null) {
        var vychozi = [
            "Dělej to, co se obáváš dělat. (Aristotelés)",
            "Ne každý kdo bloudí je ztracený. (J.R.R. Tolkien)",
            "Co je důležité je očím neviditelné. (Antoine de Saint-Exupéry)",
            ];
        localStorage.setItem("citaty", JSON.stringify(vychozi));
        ulozene = vychozi;
    } else {
        ulozene = JSON.parse(ulozene);
    }

    document.citaty = ulozene;
}

function ulozCitaty() {
    localStorage.setItem("citaty", JSON.stringify(document.citaty));
}

function stahniCitaty() {
    var allText = "";
    for (var i = 0; i < document.citaty.length; i++) {
        allText += document.citaty[i] + "\n";
    }

    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([allText], {type: 'text/plain', endings: "native"}));
    a.download = 'citaty.txt';

    // Append anchor to body.
    document.body.appendChild(a)
    a.click();

    // Remove anchor from body
    document.body.removeChild(a)
}

function vypisTabulkuCitatu() {
    $("#tabulka-citatu tbody").html("");

    for (var i = 0; i < document.citaty.length; i++) {
        var text = document.citaty[i];
        $("#tabulka-citatu tbody").append(
            "<tr><td>" + (i+1) + "</td>" +
            "<td>" + text + "</td>" +
            "<td><a href='javascript:odstranCitat(" + i + ");'>odstranit</a></td></tr>");
    };
}

function odstranCitat(i) {
    document.citaty.splice(i, 1);
    ulozCitaty();
    vypisTabulkuCitatu();
}

function odstranVsechnyCitaty() {
    localStorage.removeItem("citaty");
    document.citaty = [];
    vypisTabulkuCitatu();
}

function pridejCitaty() {
    var text = $("#text-noveho-citatu").val();
    var zadaneCitaty = text.match(/[^\r\n]+/g);

    for (var i = 0; i < zadaneCitaty.length; i++) {
        var citat = zadaneCitaty[i];
        if (document.citaty.indexOf(citat)) {
            console.log("Pridan citat " + citat);
            document.citaty.push(citat);
        }
    }
    
    $("#text-noveho-citatu").val("");
    ulozCitaty();
    vypisTabulkuCitatu();
}

function jdiNaCitatDne() {
    $("#page-uprav-citaty").hide();
    $("#li-uprav-citaty").removeClass("active");
    $("#page-citat-dne").show();
    $("#li-citat-dne").addClass("active");
}

function jdiNaUpravCitaty() {
    $("#page-citat-dne").hide();
    $("#li-citat-dne").removeClass("active");
    $("#page-uprav-citaty").show();
    $("#li-uprav-citaty").addClass("active");
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

$(document).ready(function(){
    if (!supports_html5_storage()) {
        $(".main.container").prepend('<div class="alert alert-warning" role="alert">V prohlížeči <b>nefunguje Local Storage</b>, po zavření stránky se citáty neuloží.</div>');
    }
    
    jdiNaCitatDne();
    nactiCitaty();
    vypisTabulkuCitatu();
});
