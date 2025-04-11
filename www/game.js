// Tableau de noms des boutons

let nom = "Alice";
let allcountriesvar;
let allcountriesvar2;
let avancement;
//let boutontextes = ["ciel", "ciel 2", "ciel 3"];

// Conteneur dans lequel les boutons seront ajoutés
const container = document.getElementById("button-container");

// Création des boutons


function createboard(boutontextes,questiontexte) {
  
  container.innerHTML = "";

  for (let i = 0; i < boutontextes.length; i++) {
    const bouton = document.createElement("button");
  
    //console.log("console " + getallcountries())
    bouton.textContent = boutontextes[i];
    bouton.style.margin = "10px";
    div.textContent = questiontexte;
  
    // Action au clic (tu peux changer l'URL ici)
    bouton.onclick = () => {
      onclick();
      
  };
  
    container.appendChild(bouton);
  
    }
}
/*
boutons.forEach((nom, index) => {
  const bouton = document.createElement("button");
  bouton.textContent = nom;
  bouton.style.margin = "10px";

  // Action au clic (tu peux changer l'URL ici)
  bouton.onclick = () => {
    console.log("Bonjour, " + nom);
  };

  container.appendChild(bouton);
});*/



// Définition de la string
const message = "Bonjour depuis le fichier JS !";

// Sélection de la div par son ID
const div = document.getElementById("monTexte");

// Insertion du texte dans la div


let iswriting='translations';
function getallcountries() {
    
    fetch('restcountries.json')
  .then(response => response.json())
  .then(data => {
    //        // Affiche tout l'objet JSON
   allcountriesvar2=data
   console.log(allcountriesvar2);
   //return allcountriesvar
  })
  .catch(error => console.error("Erreur : ", error));

  //return "oui"
  
  
  fetch('getpays.php',{
    method: "POST", // Ou "GET" selon ton besoin
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `iswriting=${encodeURIComponent(iswriting)}` // &iswriting=${encodeURIComponent(iswriting)
}
)
  .then(response => response.json())
  .then(data => {
    //allcountriesvar=data
    
    //console.log("Liste des pays :", data);
    //beginplay();
    // Exemple : afficher tous les noms communs
    /*
    data.forEach(pays => {
      console.log(pays.name_common);
    });*/
  })
  .catch(error => console.error("Erreur :", error));

  }

  
  
function beginplay() {
  getallcountries()
  //getallcountries();
  avancement=0;

  createboard(["commencer"],"");//["ciel", "ciel 2", "ciel 3"]
  
    
}

beginplay()

function onclick() {


/*
fetch(allcountriesvar)
  .then(response => response.json())
  .then(data => {
  //console.log(data);        // Affiche tout l'objet JSON
   //allcountriesvar=data
   //return allcountriesvar
  })
  .catch(error => console.error("Erreur : ", error));
*/

if (avancement==0) {
createboard(["allcountriesvar[0].translations.fra.official","allcountriesvar[1].translations.fra.official"],"Quel pays à le plus d'habitants ?");

}


fetch('restcountries.json')
  .then(response => response.json())
  .then(data => {
    //console.log(data);        // Affiche tout l'objet JSON
   allcountriesvar2=data
   //return allcountriesvar
  })
  .catch(error => console.error("Erreur : ", error));
  
  //console.log(allcountriesvar)
  console.log(JSON.stringify(allcountriesvar2[0].translations))


avancement+=1;
//getallcountries();
//console.log(allcountriesvar[0].translations.fra.official)//common
}