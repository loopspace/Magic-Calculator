var btn;

function init() {
    var frm = document.getElementById("form");
    frm.addEventListener("submit", setCards, false);
    var nc = document.getElementById("ncards");
    nc.addEventListener("change", setCards, false);
    btn = document.getElementById("calc");
    calc.addEventListener("click", calcNum,false);
    btn.disabled = true;
    var rst = document.getElementById("reset");
    rst.addEventListener("click", setCards,false);
    setCards();
}

window.addEventListener("load",init,false);

function setCards(e) {
    e && e.preventDefault();
    var nc = document.getElementById("ncards");
    var ncards = parseInt(nc.value,10);
    var n = 2**ncards;
    var spw = 2**Math.floor(ncards/2)-1;
    var carddiv = document.getElementById("cards");
    carddiv.innerHTML = "";
    var card, bit, table, tr, td,txt, nelts;
    var cards = [];
    for (var j = 0; j < ncards; j++) {
	bit = 2**j;
	card = [];
	for (var i = 0; i < n; i++) {
	    if ((i&bit) == bit) {
		card.push(i);
	    }
	}
	shuffle(card,false);
	cards.push(card);
    }
    shuffle(cards,true);
    var cardelts = [];
    for (var j = 0; j < cards.length; j++) {
	card = document.createElement("div");
	card.classList.add("card");
	card.id = "card" + cards[j][cards[j].length-1];
	card.dataset.value = cards[j][cards[j].length-1];
	table = document.createElement("table");
	tr = document.createElement("tr");
	table.appendChild(tr);
	nelts = 0;
	for (var i = 0; i < cards[j].length; i++) {
	    nelts++;
	    td = document.createElement("td");
	    txt = document.createTextNode(cards[j][i]);
	    td.appendChild(txt);
	    tr.appendChild(td);
	    if (nelts > spw) {
		tr = document.createElement("tr");
		table.appendChild(tr);
		nelts = 0;
	    }
	}
	card.appendChild(table);
	cardelts.push(card);
	card.addEventListener("click",hideMe,false);
    }
    for (var j = 0; j < ncards; j++) {
	carddiv.appendChild(cardelts[j]);
    }
    setMessage("Choose a number between 1 and " + (n-1) + " then click on the cards that contain your number.");
    btn.disabled = false;
}

function hideMe(e) {
    e.preventDefault();
    e.currentTarget.classList.toggle("hide");
}

function setMessage(s) {
    var msgelt = document.getElementById("message");
    msgelt.innerHTML = "";
    var txt = document.createTextNode(s);
    msgelt.appendChild(txt);
    msgelt.classList.add("view");
}

function calcNum(e) {
    e.preventDefault();
    var cards = document.getElementsByClassName("card");
    var num = 0;
    for (var i = 0; i < cards.length; i++) {
	if (cards[i].classList.contains("hide")) {
	    num += parseInt(cards[i].dataset.value,10);
	}
    }
    setMessage("Your number was: " + num);
    btn.disabled = true;
}

function shuffle(p,b) {
    var j,tmp,s;
    if (b) {
	s = 0;
    } else {
	s = 1;
    }
    for (var i = s; i < p.length; i++) {
	j = randomInt(i,p.length);
	tmp = p[j];
	p[j] = p[i];
	p[i] = tmp;
    }
    if (!b) {
	tmp = p[0];
	p[0] = p[p.length-1];
	p[p.length-1] = tmp;
    }
}

function randomInt(a,b) {
    a = Math.ceil(a);
    b = Math.floor(b);
    return Math.floor(Math.random()*(b-a))+a;
}
