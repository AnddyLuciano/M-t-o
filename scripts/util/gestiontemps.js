let week = ["Lundi", "Mardi", "Mercredi", "Jeudi","Vendredi","Samedi","Dimanche"];
let rn = new Date();
let option = {weekday:'long'};
let jourFr = rn.toLocaleDateString('fr-FR',option);
jourFr = jourFr.charAt(0).toUpperCase() + jourFr.slice(1);

let weekorder = week.slice(week.indexOf(jourFr)).concat(week.slice(0,week.indexOf(jourFr)));
console.log(weekorder);
