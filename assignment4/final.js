
var row = 1;
function fn1() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var selected = document.querySelector('input[type=radio][name=gender]:checked');

    var link = document.getElementById("url").value;
    var imglink = document.getElementById("imgurl").value;


    var photo = "<img src='" + imglink + "' alt=''>";

    document.getElementById("java").required = true;
    document.getElementById("html").required = true;
    document.getElementById("css").required = true;

    var l1 = document.getElementById("java");
    var l2 = document.getElementById("html");
    var l3 = document.getElementById("css");

    var resres = "";
    if (l1.checked == true) {
        var pl1 = document.getElementById("java").value;
        resres = pl1;
        if (l2.checked == true) {
            var pl2 = document.getElementById("html").value;
            resres = resres + "," + pl2;
            if (l3.checked == true) {
                var pl3 = document.getElementById("css").value;
                resres = resres + "," + pl3;
            }
        } else if (l3.checked == true) {
            var pl3 = document.getElementById("css").value;
            resres = resres + "," + pl3;
        }
    }
    else if (l2.checked == true) {
        var pl2 = document.getElementById("html").value;
        resres = resres + pl2;
        if (l3.checked == true) {
            var pl3 = document.getElementById("css").value;
            resres = resres + "," + pl3;
        }
    } else if (l3.checked == true) {
        var pl3 = document.getElementById("css").value;
        resres = resres + pl3;
    }else{
        resres = resres + "No Skills"
    }

    if (name.length !== 0 && email.length !== 0 && link.length !== 0 && imglink.length !== 0 && selected !== null) {
        var full = name.bold() + "<br>" + selected.value + "<br>" + email + "<br>" + "<a target='_blank' href='link'>" + link + "</a>" + "<br>" + resres;

        var display = document.getElementById("display");
        var newrow = display.insertRow(row);
        var cell1 = newrow.insertCell(0);
        var cell2 = newrow.insertCell(1);
        cell1.innerHTML = full;
        cell2.innerHTML = photo;
        if (row % 2 != 0) {
            newrow.style.backgroundColor = 'white';
        } else {
            newrow.style.backgroundColor = '#EBF2D3';
        }
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('url').value = '';
        document.getElementById('imgurl').value = '';
        document.getElementById('java').checked = false;
        document.getElementById('html').checked = false;
        document.getElementById('css').checked = false;
        document.getElementById('male').checked = false;
        document.getElementById('female').checked = false;
        row++;

    }




}

function del() {
    row = 1;
    $("#display").find("tr:not(:first)").remove();

}
