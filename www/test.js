
let nom = "Alice";
let allcountriesvar;
let allcountriesvar2;
let currenttable="countries";
let textevar="translations";
let currenttableindex=20;


let currentdata="";
let currentdatalength=0;


const div = document.getElementById("monTexte");
const container = document.getElementById("button-container");
const champ = document.getElementById("seednumber");

let avancement=0;
let randomreponsearray=[]
let randomGenerator = createSeededRandom(42);
let dernierboutoncliqué=-1;

function lancerScriptPHP(iswriting) {
    console.log("one piece");
    fetch("test2.php", {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `currenttableindex=${encodeURIComponent(currenttableindex)}&textevar=${encodeURIComponent(textevar)}&iswriting=${encodeURIComponent(iswriting)}&currenttable=${encodeURIComponent(currenttable)}` // Si nécessaire
    })
    .then(response => response.text()) 
    .then(data => {
        /*
        console.log("data");
        console.log(data);
        */
        currentdata = JSON.parse(data);
        currentdatalength=currentdata.length
        /*
        let data2 = JSON.parse(data);
        console.log(data2);
        */
        if (iswriting==0) {
            
         
    }


        
        
    })
    .catch(error => console.error("Erreur:", error));

    
}





function createboard(boutontextes,questiontexte) {
  
    container.innerHTML = "";
  
    for (let i = 0; i < boutontextes.length; i++) {
      const bouton = document.createElement("button");
    
      bouton.textContent = boutontextes[i];
      bouton.style.margin = "10px";
      div.textContent = questiontexte;
    
      bouton.onclick = () => {
        //console.log("bouton cliqué : "+i);
         onclick(i);
        
    };
    
      container.appendChild(bouton);
    
      }
  }







  function ci() {}


  function beginplay() {
   champ.value=Math.floor(Math.random()*100000000000) ;
    currenttableindex=0;
    div.textContent = "boutontextes[i]";
    beginsection();
    beginmostpeople();

    createboard(["commencer"],"");

   
      
  }
  
  beginplay()
  
 function onclick(boutonindex) {
    
    console.log("dernier cliqué : "+boutonindex);
    dernierboutoncliqué=boutonindex
    //console.log("saucisse"+getcountryname(5,currentdata));
    if (avancement==0) {
   //name="age" min="0" max="120" 

   
   
   const valeur = Number(champ.value); // ou parseInt / parseFloat selon le besoin
    console.log("Nombre saisi :", valeur);
    randomGenerator = createSeededRandom(valeur);

    console.log("current length"+currentdatalength)
    randomreponsearray.push(seededRandomInt(1,currentdatalength-1))
    randomreponsearray.push(seededRandomInt(1,currentdatalength-1))
    console.log(randomreponsearray)
   
    createboard([getcountryname(randomreponsearray[0],currentdata),getcountryname(randomreponsearray[1],currentdata)],"Quel pays à le plus d'habitants ?");
    answermostpeople();
    } else {
    let currentréponse=-1;

    
    if (getcountrypeople(randomreponsearray[0],currentdata)>getcountrypeople(randomreponsearray[1],currentdata)) {
      currentréponse=0;
    } else {
      currentréponse=1;
    }

    console.log("pays 1 : "+getcountrypeople(randomreponsearray[0],currentdata)+"pays 2"+getcountrypeople(randomreponsearray[1],currentdata)+" réponse 0 :"+(getcountrypeople(randomreponsearray[0],currentdata)>getcountrypeople(randomreponsearray[1],currentdata))+" réponse : "+currentréponse + "dernier bouton cliqué : "+dernierboutoncliqué);


    
    
    createboard([getcountrypeople(randomreponsearray[0],currentdata),getcountrypeople(randomreponsearray[1],currentdata)],"réponse");

    if (currentréponse==dernierboutoncliqué) {
      console.log("gagné");
    } else {
      console.log("perdu");
    }
    
    
    
    }

    /*
    if (avancement==0) {
        createboard([getcountryname(5,currentdata),getcountryname(4,currentdata)],"Quel pays à le plus d'habitants ?");
        }*/

    avancement+=1
    

    
 }

 function getcountryname(i,currentdata2) {
    //let data2 = JSON.parse(currentdata2);
    let data3 = JSON.parse(JSON.stringify(currentdata2[i]));


    return JSON.parse(data3.translations).fra.common
 }

 function getcountrypeople(i,currentdata2) {
    let data3 = JSON.parse(JSON.stringify(currentdata2[i]));
    

    return JSON.parse(data3.population);
 }

 function beginsection() {
    currenttable="countries";
    textevar="id";
    lancerScriptPHP(0);
    
    
 }

 function getdatainformation(textevar2) {
    //currenttable="countries";
    textevar=textevar2;
    //currenttableindex=index2;
    lancerScriptPHP(0)
 }


 function beginmostpeople() {
    getdatainformation("translations");
    
   
 }

 function answermostpeople() {
    getdatainformation("population");
 }

 	

 function createSeededRandom(seed) {
   return function() {
     seed |= 0;
     seed = (seed + 0x6D2B79F5) | 0;
     let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
     t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
     return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
   };
 }
 

 function seededRandomInt(min, max) {
   const random = randomGenerator(); // Utilisez une des fonctions ci-dessus
   return Math.floor(random * (max - min + 1)) + min;
 }
 
