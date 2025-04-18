
let nom = "Alice";
let allcountriesvar;
let allcountriesvar2;
let currenttable="countries";
let textevar="translations";
//let currenttableindex=20;


let currentdata="";
let currentdatalength=0;


const drapeau = document.getElementById("drapeau");
const div = document.getElementById("monTexte");
const container = document.getElementById("button-container");
const champ = document.getElementById("seednumber");
const titre = document.getElementById("titre");

const img = document.createElement("img");
const writeTexte = document.createElement("input"); 

let avancement=0;
let globalavancement=0;
let randomreponsearray=[]
let randomGenerator = createSeededRandom(42);
let dernierboutoncliqué=-1;
let currentboutoncliqué=-1;
let currentsection = 0;
let currentquestion=1;
let allcolumnsname= ["translations","population","area","capital","flag_png","*","*","*","*","*"];//
let allcolumns= [];
let maxquestion = 8;

let randomquestionarray=[
  [0,1,2,3]//geographie
  ,[4,5,6,7,8,4,5,8],[maxquestion+1]
  //,[4]
];
let questionarraylimit=[
  3
,6,1
//,1
];
let currentscore=0;
let scoremax = 0;
let customtablelist=[[5,"quiz_histoire"],[6,"quiz_svt"],[7,"quiz_physique"],[8,"quiz_culture"],[9,"quiz_français"]];
let lexique;

let isinquestions4=false;





let canlaunchgame = false;

function lancerScriptPHP(iswriting,currentcolumnsindex2) {
    //console.log("one piece");
    fetch("test2.php", {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `textevar=${encodeURIComponent(textevar)}&iswriting=${encodeURIComponent(iswriting)}&currenttable=${encodeURIComponent(currenttable)}` // currenttableindex=${encodeURIComponent(currenttableindex)}&
    })
    .then(response => response.text()) 
    .then(data => {
        /*
        console.log("data");
        console.log(data);
        */
        currentdata = JSON.parse(data);
        //allcolumns[currentdataindex].splice(currentcolumnsindex, 0, currentdata);
        //allcolumns[0][0]=currentdata;
        //console.log("allcolumns.length"+(allcolumns.length-1));
        //allcolumns.splice(9, 0, []);
        
        //allcolumns[9]=[];
        //console.log(allcolumns.length);
        //console.log(allcolumns);
        /*
        if (allsectionsindex2>allcolumns.length-1) {
          allcolumns[allsectionsindex2]=[]
        }*/
        //allcolumns[0].push(currentdata);
        allcolumns[currentcolumnsindex2]=currentdata;
        //allcolumns.push(currentdata);
        //console.log("golem"+currentcolumnsindex2);
        //console.log(allcolumns);
        currentdatalength=currentdata.length;
        if (canlaunchgame==true) {
          
        //createboard(["commencer"],"");
        // Démarre la boucle
        requestAnimationFrame(boucle);
        }
        /*
        let data2 = JSON.parse(data);
        console.log(data2);
        */
        if (iswriting==0) {
            
         
    }


        
        
    })
    .catch(error => console.error("Erreur:", error));

    
}

function createwritetext() {
  
      writeTexte.type = "text";
      //writeTexte.placeholder = "Écris ici...";
      container.appendChild(writeTexte);
      
}

function createimage(imagescript) {
 
    img.src = imagescript;
    img.alt = "Drapeau";
    img.width = 320;
    drapeau.appendChild(img);
    
}

function clearimage() {
  drapeau.innerHTML = "";
}



function createboard(boutontextes,questiontexte) {
  
    container.innerHTML = "";
    

    container.style.display = "flex";
    container.style.flexDirection = "column";
     // optionnel : adapte à ta mise en page

    

    div.textContent = questiontexte;
    for (let i = 0; i < boutontextes.length; i++) {
      const bouton = document.createElement("button");
    
      bouton.textContent = boutontextes[i];
      bouton.style.margin = "10px"; 
      
      
    
      bouton.onclick = () => {
        //console.log("bouton cliqué : "+i);
         onclick(i);
        
    };
    
      container.appendChild(bouton);
      
      

      }
  }



  



  //function ci() {}


  function beginplay() {
   champ.value=Math.floor(Math.random()*100000000000) ;
    
    //beginmostpeople();

    beginlexique();
    beginallcolumns();
    

   
      
  }
  
  beginplay()

  function beginlexique() {
    fetch('newlexique.json')
    .then(response => {
      if (!response.ok) throw new Error("Erreur HTTP : " + response.status);
      return response.json();
    })
    .then(data => {
      //lexique=data;
      
      //console.log("Contenu JSON :", (lexique[0]));
      //const firstLine = data; // 1ère ligne
      //const firstKey = Object.keys(firstLine)[0]; // 1ère clé
      //const firstValue = firstLine[firstKey]; // 1ère valeur
      /*
      const firstValues = data.map(obj => {
        const firstKey = Object.keys(obj)[0];
        return obj[firstKey];
      });*/
      lexique=data
      console.log("1er élément de la 1ère ligne :", lexique);

      
    })
    .catch(error => {
      console.error("Erreur de chargement JSON :", error);
    });
  }

  function randomdatavalue(i) {
    return seededRandomInt(1,allcolumns[i].length-1)
  }


  function beginallcolumns() {
    allcolumnsname.forEach((columnname, index) => {
      allcolumns.push(0);
      
    });


    allcolumnsname.forEach((columnname, index) => {
      if (index==(allcolumnsname.length-1)) {
        canlaunchgame=true;
      }


      setcurrenttable(index);

      getdatainformation(columnname,index); //"translations","population","area"
  
      
    });

    
  }


  function createrandomquestionarray4columns(columnindex) {
    let randomindex=seededRandomInt(0,allcolumns[columnindex].length-1);
    

    let allarray = [
      [
      getquestion(randomindex,columnindex)
      ],[
      getbonnereponse(randomindex,columnindex),
      getmauvaisereponses(randomindex,columnindex)[0],
      getmauvaisereponses(randomindex,columnindex)[1],
      getmauvaisereponses(randomindex,columnindex)[2]
      ]
    ];

    

    return allarray;

    /*
    let randomindex=seededRandomInt(0,(allcolumns[currenttableindex].length-1))
    */
  }





  function createrandomreponsearray1column(arraysize,columnindex) {
    randomreponsearray.length = 0;
    //seededRandomInt(1,allcolumns[i].length-1)
    let randomarray=[];
    for (let i = 0; i < allcolumns[columnindex].length-1; i++) {
      
      randomarray.push(i)
    }
    shuffle(randomarray);

    
    for (let i = 0; i < arraysize; i++) {
      
      randomreponsearray.push(randomarray[i])
    }
  }

function shuffle(randomquestionarray1) {
    
    let randomquestionarray2 = randomquestionarray1;
    //console.log("array"+randomquestionarray2)
    //randomquestionarray2.length-1
    for (let i = 0; i < randomquestionarray2.length-1; i++) {
      let currentrandomindex = seededRandomInt(0,randomquestionarray1.length-1);
      let currentquestion = randomquestionarray2[i];
      randomquestionarray2[i]=randomquestionarray2[currentrandomindex];
      randomquestionarray2[currentrandomindex]=currentquestion;
    }

    randomquestionarray2.forEach((currentquestion, index) => {
      /*
      let currentrandomindex = seededRandomInt(0,randomquestionarray1.length-1);
      let currentrandomquestion = randomquestionarray2[currentrandomindex]
      randomquestionarray2[currentrandomindex]=  randomquestionarray2[index];
      randomquestionarray2[index]=currentrandomquestion;*/
    });
    //console.log("array"+randomquestionarray2)
    return randomquestionarray2;
}

function createquestion4reponses(i) {
  isinquestions4=true;
      let getquestion = create4reponses4column(i);
      createboard([
        randomreponsearray[0],
        randomreponsearray[1],
        randomreponsearray[2],
        randomreponsearray[3]
      ],
      getquestion[0][0]
      );
}

function create4reponses1column(columnindex) {
  createrandomreponsearray1column(4,columnindex);
  //let randomreponse=seededRandomInt(0,3);
  create4reponses2();
  //console.log("oui"+randomreponsearray);

}

function create4reponses2() {
  let randomreponse=randomreponsearray[0];
  //console.log("oui"+randomreponsearray);
  randomreponsearray=shuffle(randomreponsearray);
  randomreponsearray.push(randomreponse);
}


function create4reponses4column(columnindex) {
  
  
  
  let allarray = createrandomquestionarray4columns(columnindex);
  
  randomreponsearray=allarray[1];

  //console.log(randomreponsearray);
  create4reponses2();

  return allarray;

  

}

function createquestion() {
  
  //console.log("currentquestion : "+randomquestionarray[0][globalavancement]);
  
  currentquestion = randomquestionarray[currentsection][(globalavancement)];
  //currentquestion=4;
  //console.log("ananas : "+currentquestion+" avancement : "+globalavancement)
  console.log("banana"+currentquestion+" isgood : "+(currentquestion>=4 && currentquestion<=6));
  
  //currentquestion = maxquestion+1;
  if (currentquestion>=4 && currentquestion<=maxquestion) {
    
    createquestion4reponses(currentquestion+1);
  } 
  switch (currentquestion) {
    case 0:
      
      //allcolumns
      createrandomreponsearray1column(2,1);
      createboard([getcountryname(randomreponsearray[0]),getcountryname(randomreponsearray[1])],"Quel pays a le plus d'habitants ?");
      
      
      break;


    case 1:
      
      createrandomreponsearray1column(2,2);
      createboard([getcountryname(randomreponsearray[0]),getcountryname(randomreponsearray[1])],"Quel pays a la plus grande superficie ?");
      
      break;


    case 2:
      
      create4reponses1column(3);
      createboard([getcountrycapital(randomreponsearray[0]),getcountrycapital(randomreponsearray[1]),getcountrycapital(randomreponsearray[2]),getcountrycapital(randomreponsearray[3])],'Quel est la capitale de ce pays: "'+getcountryname(randomreponsearray[4])+'" ?');
      
      break;


      case 3:
      
      create4reponses1column(4);
      createimage(getcountryflag(randomreponsearray[4]));
      createboard([getcountryname(randomreponsearray[0]),getcountryname(randomreponsearray[1]),getcountryname(randomreponsearray[2]),getcountryname(randomreponsearray[3])],'À quel pays appartient ce drapeau?');
      
      break;

      
    case maxquestion+1:
      let currentalphabet = createalphabet();
      
      //console.log();
      
    createboard(['envoyer'],'Compose le mot le plus long possible avec ces lettres : '+currentalphabet+' .');  
    createwritetext();
    break;
      

      /*
      case 4:
      createquestion4reponses(5);
      break;

      case 5:
      createquestion4reponses(6);
      break;

      case 6:
      createquestion4reponses(7);
      break;

      case 7:
      createquestion4reponses(8);
      break;
      */
  }
  //console.log("oui");
  avancement=1;
  globalavancement+=1;
}

function createalphabet() {
  
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  
  
  let lettresScrabble = [
    // 9 x A
    "A", "A", "A", "A", "A", "A", "A", "A", "A",
    // 2 x B
    "B", "B",
    // 2 x C
    "C", "C",
    // 3 x D
    "D", "D", "D",
    // 15 x E
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    // 2 x F
    "F", "F",
    // 2 x G
    "G", "G",
    // 2 x H
    "H", "H",
    // 8 x I
    "I", "I", "I", "I", "I", "I", "I", "I",
    // 1 x J
    "J",
    // 1 x K
    "K",
    // 5 x L
    "L", "L", "L", "L", "L",
    // 3 x M
    "M", "M", "M",
    // 6 x N
    "N", "N", "N", "N", "N", "N",
    // 6 x O
    "O", "O", "O", "O", "O", "O",
    // 2 x P
    "P", "P",
    // 1 x Q
    "Q",
    // 6 x R
    "R", "R", "R", "R", "R", "R",
    // 6 x S
    "S", "S", "S", "S", "S", "S",
    // 6 x T
    "T", "T", "T", "T", "T", "T",
    // 6 x U
    "U", "U", "U", "U", "U", "U",
    // 2 x V
    "V", "V",
    // 1 x W
    "W",
    // 1 x X
    "X",
    // 1 x Y
    "Y",
    // 1 x Z
    "Z",
  ];
  




  

 // console.log("scrabble");
 // console.log(trierlettres(lettresScrabble));

  shuffle(lettresScrabble);
  let lettresScrabble2=[];
  
  

  for (let i = 0; i < 10; i++) {
  lettresScrabble2.push(lettresScrabble[i]);
  };

  randomreponsearray.length = 0;
  randomreponsearray[0]=trierlettres(lettresScrabble2)
  console.log(randomreponsearray[0]);

  return lettresScrabble2;
}

 function trierlettres(lettresScrabble) {
  let lettrestriées = [];

  lettresScrabble.forEach((currentscrabble, index1) => {
    //console.log("oui"+currentscrabble);
    let currentscrabble2 = currentscrabble.toLowerCase();
        let havecurrentlettre = false;
        lettrestriées.forEach((currentarraylettre, index3) => {
          
          currentarraylettre.forEach((currentlettre, index4) => {
            
            if (currentscrabble2==currentlettre) {
              if (havecurrentlettre==false)  {
              //console.log("push"+currentscrabble);
              currentarraylettre.push(currentscrabble2);
              havecurrentlettre = true;
            }
            }
          });
          
        });
        if (havecurrentlettre==false)  {
          lettrestriées.push([currentscrabble2])
        }              
      
  });

  return lettrestriées;
 }

 function motexiste(beginmot) {
  let motexistebool = false;
  
  lexique.forEach((currentmot, index1) => {
    if (motexistebool==false) {
    if (enleverAccents(String(currentmot))==enleverAccents(String(beginmot))) {
      //console.log("mot"+enleverAccents(String(currentmot))+ "mot 2 "+String(currentmot));
      console.log("mot :"+currentmot+"existe at index"+index1);
      motexistebool = true;
    }}
  });

  return motexistebool;

 }

 function respectelettres(mot) {
  mot = enleverAccents(mot);
  let motarray = trierlettres(mot.split(""));
  console.log(motarray);
  console.log(randomreponsearray[0]);
  //let isrespecting = false;
  let outsideletter = false;
  let toomuchletters = false;
  motarray.forEach((currentlettrearraymot, index) => {
    //console.log(currentlettrearraymot);
    currentlettrearraymot.forEach((currentlettremot, index2) => {
      //console.log(currentlettrearray);
      //if currentlettre
    let outsideletter2 = true;
    
      randomreponsearray[0].forEach((currentlettrearrayalphabet, index3) => {
        currentlettrearrayalphabet.forEach((currentlettrealphabet, index4) => {
          if (currentlettremot==currentlettrealphabet) {
            outsideletter2 = false;
            //console.log("alphabet length : "+currentlettrearrayalphabet.length+" mot length"+ currentlettrearraymot.length);
            if (currentlettrearrayalphabet.length<currentlettrearraymot.length) {
              toomuchletters = true;
            }
          }

          if (currentlettremot==" ") {
            outsideletter2 = false;
          }
        });
      });
    
    if (outsideletter2==true) {
      outsideletter=true;
    }
    });
  });

console.log("outside letter : "+outsideletter);
console.log("too much letters : "+toomuchletters);
return [outsideletter,toomuchletters]
 };


 function enleverAccents(texte) {
  return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

 function onclick(boutonindex) {
  //console.log(getcountryname(0));
  //console.log(avancement);
  
  currentboutoncliqué=boutonindex;
  if (globalavancement==0) {
    titre.innerHTML = "";
    randomGenerator = createSeededRandom(champ.value);
    //shuffle(randomquestionarray[0]);
    //console.log("array"+shuffle([0,1,1,2,2,3,3]))
    console.log(allcolumns);
    randomquestionarray.forEach((currentarray, index) => {
      shuffle(currentarray);
    });
    
  }
  switch (avancement) {
    case 0:
      
      createquestion();
        
      break;
    case 1:
      createreponse();
        break;
    case 2:
        
        break;

  }
  
  



    
  
     
    
    dernierboutoncliqué=boutonindex;
    

    
  
 }















function createreponse() {
      let reponsetextvar
      if (isinquestions4) {
        reponsetextvar = makereponsetext((randomreponsearray[4]==randomreponsearray[currentboutoncliqué]));
        createboard([randomreponsearray[4]],reponsetextvar[1]);
      }
      switch (currentquestion) {
        case 0:
      reponsetextvar = checkreponse2(getcountrypopulation(randomreponsearray[0])>getcountrypopulation(randomreponsearray[1]));
      createboard([getcountrypopulation(randomreponsearray[0]),getcountrypopulation(randomreponsearray[1])],reponsetextvar[1]);
    
          
          break;

        case 1:
      

      reponsetextvar = checkreponse2(getcountryarea(randomreponsearray[0])>getcountryarea(randomreponsearray[1]));
      createboard([getcountryarea(randomreponsearray[0]),getcountryarea(randomreponsearray[1])],reponsetextvar[1]);

          break;

        case 2:
        //console.log("reponse : "+getcountrycapital(randomreponsearray[4])+"derniercliqué: "+getcountrycapital(randomreponsearray[currentboutoncliqué]) +"vrai : "+(getcountrycapital(randomreponsearray[4])==getcountrycapital(randomreponsearray[currentboutoncliqué])));
        reponsetextvar = makereponsetext((randomreponsearray[4]==randomreponsearray[currentboutoncliqué]));
        createboard([getcountrycapital(randomreponsearray[4])],reponsetextvar[1]);
          break;

          case 3:
        //console.log("reponse : "+getcountrycapital(randomreponsearray[4])+"derniercliqué: "+getcountrycapital(randomreponsearray[currentboutoncliqué]) +"vrai : "+(getcountrycapital(randomreponsearray[4])==getcountrycapital(randomreponsearray[currentboutoncliqué])));
        reponsetextvar = makereponsetext((randomreponsearray[4]==randomreponsearray[currentboutoncliqué]));
        createboard([getcountryname(randomreponsearray[4])],reponsetextvar[1]);
          break;

          case 4:
          
          break;

          case maxquestion+1:
            //console.log("respecte lettres : ", );
            //console.log("mot existe : "+ motexiste(writeTexte.value));
            let respectevar = respectelettres(writeTexte.value);
            let existevar = motexiste(writeTexte.value);
            let iswinningscrable=true;
            let iswinningscrabletext= "le mot est bon";

            if (respectevar[0]==true || respectevar[1]==true) {
              iswinningscrabletext= "une lettre n'était pas dans la liste";
              iswinningscrable=false;
            };

            if (existevar == false) {
              iswinningscrabletext= "le mot n'existe pas";
              iswinningscrable=false;
            };

            if (iswinningscrable==true) {
              console.log("score"+currentscore);
              currentscore+=(writeTexte.value.length*0.5)
              console.log("scorebis"+currentscore);
            }

            reponsetextvar = makereponsetextscrabble((iswinningscrable))
            //makereponsetext();
            createboard([iswinningscrabletext],reponsetextvar[1]);
          
          break;
      }
      avancement=2;
      afterreponse();

      

}

function makereponsetextscrabble(istrue) {
  let reponsevar = makereponsetext2(istrue);
  return reponsevar;
}
function makereponsetext(istrue) {
  let reponsevar = makereponsetext2(istrue);
  if (reponsevar[0]==true) {
    currentscore+=2;
  }
  scoremax+=2;
  return reponsevar;
}
function makereponsetext2(istrue){
  let victoiretext = "perdu"
  
  if (istrue==true) {
    
    victoiretext = "gagné";
  } 

  
  console.log("consolemax"+scoremax);
  return [istrue,victoiretext];
}

function checkreponse2(is1right) {
  
  let havewin=false;
  
  if (currentboutoncliqué==0) {
    if (is1right==true) {
      havewin=true;
      
    }
  } else {
    if (is1right==false) {
      havewin=true;
      
    }

  }

  return makereponsetext(havewin);
  
}

function setcurrenttable(i) {
  
  currenttable="countries";

  

  //console.log("toto")
  customtablelist.forEach((customtable, index) => {
    
    if (customtable[0]==i) {
      //console.log(customtable[1]); 
      currenttable=customtable[1];
    }

    
  });
}








































////GEOGRAPHIE
 function getcountryname(i) {
  return JSON.parse(allcolumns[0][i].translations).fra.common;
}

function getcountrypopulation(i) {
  return  JSON.parse(allcolumns[1][i].population); 
}

function getcountryarea(i) {
  return  JSON.parse(allcolumns[2][i].area);
}

function getcountrycapital(i) {
  return  JSON.parse(allcolumns[3][i].capital)[0];
}

function getcountryflag(i) {
  return  allcolumns[4][i].flag_png;
}


////GENERALE


//questions

function getquestion(i,currenttableindex) {
  return  allcolumns[currenttableindex][i].question;
}

function getbonnereponse(i,currenttableindex) {
  return  allcolumns[currenttableindex][i].bonne_reponse;
}

function getmauvaisereponses(i,currenttableindex) {
  return  [
    allcolumns[currenttableindex][i].mauvaise_reponse_1,
    allcolumns[currenttableindex][i].mauvaise_reponse_2,
    allcolumns[currenttableindex][i].mauvaise_reponse_3
          ];
}
































 function getdatainformation(textevar2,allsectionsindex2) {
    //currenttable="countries";
    
    textevar=textevar2;
    
    //currenttableindex=index2;
    
    lancerScriptPHP(0,allsectionsindex2)
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
 









function beginplayafterbutton() {
  avancement=0;
  
  createboard(["commencer"],"");
}


 function boucle() {
  // Code exécuté à chaque frame
  //console.log(allcolumns.length);

  //console.log("canfinish : "+finishcolumn());

  // Re-demande une frame
  if (finishcolumn()) {
    beginplayafterbutton();
  
} else {
  requestAnimationFrame(boucle);
  
}

}

function finishcolumn() {
  let canfinishcolumn=true;
  allcolumns.forEach((allcolumn, index) => {
    if (allcolumn==0) {
      canfinishcolumn=false;
    };

    
  });

  return canfinishcolumn;
}










































function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function afterreponse() {
  //console.log("Attente...");
  await wait(1500); // attend 1000 ms (1 seconde)
  //console.log("1 seconde est passée !");
  clearimage();
  if (globalavancement<questionarraylimit[currentsection]) {
    
    createquestion();
    console.log("questionnaire max : "+randomquestionarray.length + " "+currentsection);
    
  } else {
    currentsection+=1;

    console.log("bubu questionnaire max : "+randomquestionarray.length + " "+currentsection);
    

    if (currentsection==randomquestionarray.length) {
      createboard([("score : "+currentscore+" / "+scoremax)],"Fin !");
    } else {
      globalavancement=0;
      createquestion();
    }
    
    
  }

  
}