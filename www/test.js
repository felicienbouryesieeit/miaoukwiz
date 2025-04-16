
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


let avancement=0;
let globalavancement=0;
let randomreponsearray=[]
let randomGenerator = createSeededRandom(42);
let dernierboutoncliqué=-1;
let currentboutoncliqué=-1;
let currentsection = 0;
let currentquestion=1;
let allcolumnsname= ["translations","population","area","capital","flag_png","*"];//
let allcolumns= [];
let randomquestionarray=[
  [0,1,2,3]//geographie
  ,[4],[4]
];
let questionarraylimit=[
  3
,1,1
];
let currentscore=0;
let customtablelist=[[5,"quiz_histoire"]]






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

     // optionnel : adapte à ta mise en page

    

    div.textContent = questiontexte;
    for (let i = 0; i < boutontextes.length; i++) {
      const bouton = document.createElement("button");
    
      bouton.textContent = boutontextes[i];
      bouton.style.margin = "10px 16vw"; 
      //bouton.style.flex-direction: "column";
      //bouton.style.width = "600px";
      
    
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
    beginallcolumns();
    

   
      
  }
  
  beginplay()
  
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
  console.log("ananas : "+currentquestion+" avancement : "+globalavancement)
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


      


      case 4:
      //createboard([getbonnereponse(0,5),getmauvaisereponses(0,5)[0],getmauvaisereponses(0,5)[1],getmauvaisereponses(0,5)[2]],getquestion(0,5));
      let getquestion = create4reponses4column(5);
      //console.log("getquestion");
      //console.log(getquestion[0][0]);
      //console.log("reponse 1");
      //console.log(randomreponsearray[0]);
      createboard([
        randomreponsearray[0],
        randomreponsearray[1],
        randomreponsearray[2],
        randomreponsearray[3]
      ],
      getquestion[0][0]
      );
      
      //console.log(reponsearray);
      //createboard([getcountryname(randomreponsearray[0]),getcountryname(randomreponsearray[1]),getcountryname(randomreponsearray[2]),getcountryname(randomreponsearray[3])],'À quel pays appartient ce drapeau?');
      
      break;
  }
  //console.log("oui");
  avancement=1;
  globalavancement+=1;
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
          reponsetextvar = makereponsetext((randomreponsearray[4]==randomreponsearray[currentboutoncliqué]));
          createboard([randomreponsearray[4]],reponsetextvar[1]);
          break;
      }
      avancement=2;
      afterreponse();

      

}

function makereponsetext(istrue) {
  let victoiretext = "perdu"
  
  if (istrue==true) {
    currentscore+=1;
    victoiretext = "gagné";
  } 
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

  

  console.log("toto")
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
      createboard([("score : "+currentscore)],"Fin !");
    } else {
      globalavancement=0;
      createquestion();
    }
    
    
  }

  
}
