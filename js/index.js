"use strict";

window.onload = function () {
    //Pour moi
    var compa = 0;
    //Variables de joueur
    var plist = [];
    var joueurs = [];
    var pbutton = document.getElementById('addplayer');
    var randp;
    //Variables de rôles
    var rlist = [];
    var rbutton = document.getElementById('addrole');
    var randr;
    //Débuter
    var begin = document.getElementById('begin');

    //Ajout de joueurs
    pbutton.onclick = function () {
        var pname = document.getElementById('playerin').value;
        if (pname == "") {
            alert("Rentrez un nom de joueur");
        } else {
            document.getElementById('playerin').value = "";
            console.log("ajout de joueur : " + pname);
            plist.push(pname);
            console.log(plist);

            document.getElementById('playerlist').innerHTML = "";

            for (var i = 0; i < plist.length; i++) {
                var li = document.createElement("li");
                li.innerHTML = plist[i] + " <button class='remplayer'>Retirer le joueur</button>";
                document.getElementById('playerlist').appendChild(li);
            }
        }
    }
    //Ajout de rôles
    rbutton.onclick = function () {
        var rname = document.getElementById('rolein').value;
        if (rname == "") {
            alert("Rentrez un nom de rôle");
        } else {
            console.log("ajout de rôle : " + rname);
            rlist.push(rname);
            console.log(rlist);

            document.getElementById('rolelist').innerHTML = "";

            for (var i = 0; i < rlist.length; i++) {
                var li = document.createElement("li");
                li.innerHTML = rlist[i] + " <button class='remrole'>Supprimer le rôle</button>";
                document.getElementById('rolelist').appendChild(li);
            }
        }
    }
    //Débuter la partie
    begin.onclick = function () {
        console.log(plist.length, rlist.length)
        console.log('début', begin);
        if (plist.length < 5) {
            alert('Il faut au minimum 5 joueurs !');
        } else {
            if (plist.length !== rlist.length) {
                alert("Le nombre de joueurs et de rôles n'est pas égal");
            } else {
                document.getElementById("prepa").classList.add("hidden");
                giverole();
                pbutton.disabled = true;
                rbutton.disabled = true;
                begin.disabled = true;
                $(".remrole").remove();
                $(".remplayer").remove();
            }
        }
    }

    //Retirer un rôle
    $(document).on('click', ".remrole", function (e) {
        var remrole = this.parentElement.innerHTML;
        remrole = remrole.replace(' <button class="remrole">Supprimer le rôle</button>', "");
        console.log(remrole);

        for (var b = 0; b <= rlist.length - 1; b++) {
            if (rlist[b] == remrole) {
                rlist.splice(rlist.indexOf(remrole), 1);
                console.log(rlist);
                break;
            }
        }
        $(this).parent().remove();
    });

    //Retirer un joueur
    $(document).on('click', ".remplayer", function (e) {
        var remplayer = this.parentElement.innerHTML;
        remplayer = remplayer.replace(' <button class="remplayer">Retirer le joueur</button>', "");
        console.log(remplayer);

        for (var b = 0; b <= plist.length - 1; b++) {
            if (plist[b] == remplayer) {
                plist.splice(plist.indexOf(remplayer), 1);
                console.log(plist);
                break;
            }
        }
        $(this).parent().remove();
    });

    function giverole() {
        document.getElementById('roles').innerHTML = "";
        while (document.getElementById('roles').childElementCount !== plist.length) {
            compa++;
            genrand();
            if (rlist[randr] === undefined || plist[randp] === undefined) {
                genrand();
            } else {
                var li = document.createElement("li");
                li.classList.add("circle");
                li.innerHTML = plist[randp] + " devient un " + rlist[randr];
                document.getElementById('roles').appendChild(li);

                delete plist[randp];
                delete rlist[randr];
                console.log(plist, rlist);
            }
        }
        console.log(compa);
    }

    function genrand() {
        randp = Math.floor(Math.random() * plist.length);
        randr = Math.floor(Math.random() * rlist.length);
        console.log(randp, randr);
        return randp, randr;
    }
}
