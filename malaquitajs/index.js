import giro from './girarEspacio.js'

var svgNS = "http://www.w3.org/2000/svg";
var svg = document.getElementById("svg"); 
var svgX = svg.getBoundingClientRect().left;
var svgY = svg.getBoundingClientRect().top; 
var ejeZ= document.createElementNS(svgNS,'line');
var alturaEjeZ= 200;

let anguloX = 0;
let anguloY = 0;

let cosX = 1;
let senX = 0;
let cosY = 1;
let senY = 0; 

var lineasVerticales = [];
var lineasHorizontales = [];
var numeroLineas=0;
var anchoTotal=800;
var centro=400;

/*
function calculationProj(x1,y1,z1){
     let x1n = (x1*cosX-y1*senX) + centro;        
     let y1n = (x1*senX+y1*cosX)*senY - z1*cosY + centro ;      
     let z1n = z1*cosY;
     return [x1n, y1n];
}
*/

function culling(ini, seg, final){
 let a = (seg[0]-ini[0])*(final[1]-ini[1]) - (final[0]-ini[0])*(seg[1]-ini[1])
 return a >0;
}

/*------------------Desplazamientos---------------*/
function moverEspacio(mX, mY) {
 console.log("----------------------------")
 console.log("-mX: "+ mX )
 console.log("-mY: "+ mY )
}



function girarTodo(aX,aY){ 
  let anguloXrad = anguloX/57.29578;
  let anguloYrad = anguloY/57.29578;
  cosX = Math.cos(anguloXrad);  
  senX = Math.sin(anguloXrad);  
  cosY = Math.cos(anguloYrad);  
  senY = Math.sin(anguloYrad); 
  console.log("BBB -cosX= " + cosX + " -senY= " + senX + " -cosY: "  + cosY + " -senY: " + senY  )
} 
 
function anguloFromInput(){   
 anguloX= document.getElementById("rotateX").value;
 anguloY= document.getElementById("rotateY").value;  
 girarTodo(anguloX,anguloY); 
}

function posFromInput(){   
 console.log("DDDDDD")
 posX= document.getElementById("transX").value;
 posY= document.getElementById("transY").value; 
 moverEspacio(posX, posY)
}

function endDrag(evt) {       
  svg.removeEventListener('mousemove', drag);
  svg.removeEventListener('mouseup', endDrag);
  svg.removeEventListener('mouseleave', endDrag);      
} 

function girarEspacio(evt) {  
  
    let evento = evt || window.event;
    console.log("@@@@@@@ evento: "+ JSON.stringify(evento.button))
      if( evento.button == 2){
        let arrayGiros = giro(evt, svg)
        console.log("........: " + JSON.stringify(arrayGiros))
          //Función importada del Módulo 'girarEspacio.js'  
       
    }  

   

  let anguloX= document.getElementById("rotateX").value;
  let anguloY= document.getElementById("rotateY").value; 
  console.log("|||||||||| arrayGiros: " + JSON.stringify(arrayGiros))
}

// Punto final de las funciones
window.onload = function() { 
 svg = document.getElementById("svg"); 
 //svg.addEventListener('click', seleccionarObjetos);
 //moverObjetosInput();  
 document.getElementById("rotateX").onchange=anguloFromInput;
 document.getElementById("rotateY").onchange=anguloFromInput;  
 document.getElementById("transX").onchange=posFromInput;
 document.getElementById("transY").onchange=posFromInput;  
 //console.log("Check Fecha 2024/marzo/04")
 document.documentElement.onmousedown = girarEspacio;
}
