// „ “ ”

var aa = [

    "rod: muški ženski srednji",
    "broj: jednina množina"
];





f = function (l, m) {
    this.l = l + ':' + m;
    this.m = {ps: m};
};
let s = new Set(aa);
let it = s.values();
let a = Array.from(it);
var b = {};
for (var i = 0; i < a.length; i++) {
    var c = a[i].split(': ');
    var d = c[0];
    var e = c[1].split(' ');
    for (var ii = 0; ii < e.length; ii++)
    {
        var h = new f(d, e[ii]);
        b[h.l] = h.m;
    }
}

console.clear();
console.log(JSON.stringify(b, null, 4));



var nešto = <small className="json float-right">{ (this.props.jelOvdeBio) ? 'bio' : 'nije' }</small>;




a = {"glagol": [
        "značenje: radnja stanje zbivanje",
        "glagolsdki oblik: infinitiv prezent perfekt aorist pluskvamperfekt futur_prvi futur_drugi imperativ potencijal_sadašnji potencijal_prošli",
        "vrsta glagola: glavni pomoćni",
        "glagolski vid: nesvršeni svršeni",
        "nesvršeni: trajni iterativni",
        "svršeni: početni završni trenutni",
        "glagolski rod: prelazni neprelazni povratni",
        "uzajamno-povratni: da ne",
        "lice: prvo drugo treće",
        "rod: muški ženski srednji",
        "broj: jednina množina"
    ],
    "prilog": [
        "poreklo: pravi nepravi",
        "stepen poređenja: pozitiv komparativ superlativ",
        "funkcija: mesto vreme način količina uzrok"
    ],
    "broj": [
        "vrsta broja: osnovni redni zbirni"
    ],
    "predlog": [
        "funkcija predloga: mesto vreme uzrok način društvo svrha poređenje"
    ],
    "rečca": [
        "vrsta rečce: upitna potvrdna odrična zaključna isključna pokazna poredbena imperativna modalna"
    ],
    "veznik": [
        "vrsta veznika: nezavisni zavisni",
        "podvrsta veznika: sastavni suprotni rastavni uzročni namerni uslovni"
    ],
    "uzvik": [
        "funkcija: iskazivanje_osećanja dozivanje skretanje_pažnje podsticanje onomatopeja"
    ]};


    a = {
        "samoglasnik": [
            "red: prednji srednji zadnji",
            "položaj: visoki srednji niski",
        ],
        "suglasnik": [
            "grupa: sonant konsonant",
            "zvučnost: zvučni bezvučni",
            "mesto tvorbe: dvousneni usneno-zubni zubni nadzubni prednjonepčani zadnjonepčani",
            "način tvorbe: eksplozivni frikativni afrikata nosni lateral vibrant"
        ]
    };

b = Object.keys(a);

d = {};
for (i = 0; i < b.length; i++) {
    c = b[i];
    e = a[c];
    d[b[i]] = [];
    for (j = 0; j < e.length; j++) {
        k = e[j].split(': ');
        l = k[0];
        m = k[1].split(' ');
        o = [];

        for (n = 0; n < m.length; n++) {
            o.push(l + ': ' + m[n].replace(/_/g, ' '));
        }
        d[b[i]] = d[b[i]].concat(o);
    }


}

console.clear();
console.log(JSON.stringify(d, null, 4));


bb = { "glagol": ["značenje: radnja", "značenje: stanje", "značenje: zbivanje",  "glagolsdki oblik: prezent", "glagolsdki oblik: perfekt", "glagolsdki oblik: futur_prvi","glagolsdki oblik: imperativ", "glagolsdki oblik: potencijal_sadašnji", "vrsta glagola: glavni", "vrsta glagola: pomoćni", "glagolski vid: nesvršeni", "glagolski vid: svršeni", "nesvršeni: trajni", "nesvršeni: iterativni", "svršeni: početni", "svršeni: završni", "svršeni: trenutni", "glagolski rod: prelazni", "glagolski rod: neprelazni", "glagolski rod: povratni", "lice: prvo", "lice: drugo", "lice: treće", "rod: muški", "rod: ženski", "rod: srednji", "broj: jednina", "broj: množina"],
    "prilog": ["stepen poređenja: komparativ", "stepen poređenja: superlativ", "funkcija: mesto", "funkcija: vreme", "funkcija: način", "funkcija: količina", "funkcija: uzrok"],
    "broj": ["vrsta broja: osnovni", "vrsta broja: redni", "vrsta broja: zbirni"],
    "predlog": ["funkcija predloga: mesto", "funkcija predloga: vreme", "funkcija predloga: uzrok", "funkcija predloga: način", "funkcija predloga: društvo", "funkcija predloga: svrha", "funkcija predloga: poređenje"],
    "rečca": ["vrsta rečce: upitna", "vrsta rečce: potvrdna", "vrsta rečce: odrična", "vrsta rečce: zaključna", "vrsta rečce: isključna", "vrsta rečce: pokazna", "vrsta rečce: poredbena", "vrsta rečce: imperativna", "vrsta rečce: modalna"],
    "veznik": ["vrsta veznika: nezavisni", "vrsta veznika: zavisni", "podvrsta veznika: sastavni", "podvrsta veznika: suprotni", "podvrsta veznika: rastavni", "podvrsta veznika: uzročni", "podvrsta veznika: namerni", "podvrsta veznika: uslovni"],
    "uzvik": ["funkcija: iskazivanje_osećanja"] };




    var pesme = r.filter(
                    primer => primer.filter(
    					rec => rec === '#'
    				).length > 0
            );
    var stihovi = [];
    for (i = 0; i < pesme.length; i++) {
    	var pesma = pesme[i];
    	var stih = '';
    	for (ii = 0; ii < pesma.length; ii++) {
    		var rec = pesma[ii];
    		if(typeof rec === 'object') {
    			stih += rec['reč'];
    			if(ii < pesma.length - 1 && typeof pesma[ii+1] === 'object') {
    				stih += ' ';
    			}
    			if(ii === pesma.length - 1 || pesma[ii+1] === '#') {
    				stihovi.push(stih);
    				stih = '';
    			} else if (typeof pesma[ii+1] === 'string') {
    				stih += pesma[ii+1] + ' ';
    			}
            }
    	}
    }
    console.log(stihovi);


var a = "abvgdđežzijklqmnwoprstćufhcčxš".split('');
var slova = {};
for (var i = 0; i < a.length; i++) {
	slova[a[i]] = {
        "vrsta": "",
        "grupa": "",
        "mesto tvorbe": "",
        "način tvorbe": ""
	}
}
console.log(JSON.stringify(slova, null, 4));




b = a.replace(/[^ abvgdđežzijklmnoprstćufhcčšABVGDĐEŽZIJKLMNOPRSTĆUFHCČŠ]/g, ' ');
b = b.replace(/ +/g, ' ');
c = b.split(' ');
d = c.filter(rec => rec.length > 10);
console.log(JSON.stringify(d, null, 4));


 // kratkosilazni ‶
 // kratkouzlazni ‵
 // dugosilazni ⁀
 // dugouzlazni ′

 // [^aeiou][′‵⁀‶]

 c = {}; for (b in a) {
 c["glagolska vrsta:" + a[b]] = {
         "ps": a[b] + " vrste"
     }
 }
 
c = []; for (b in a) {
c.push["glagolska vrsta: " + a[b]]; 
}


for (r in p[i].primer) {
  if(p[i].primer[r]['vrsta'] === "zamenica" && p[i].primer[r]['reč'] === "se") {
    p[i].primer[r] = { "reč": "se", "vrsta": "zamenica", "vrsta zamenice": "imenička", "značenje": "povratna", "povratna": "opštepovratna", "padež": "akuzativ" };
  }
}
}


 <pre>
     { JSON.stringify(this.state, null, 4) }
 </pre>
