
import {crearCuadricula, girarCuadricula} from "./grid.js";
import {Pantalon} from "./pantalon.js";
var svg = "http://www.w3.org/2000/svg";
var ejeZ= document.createElementNS(svgNS,'line');
var alturaEjeZ = 200;

var svgX = svg.getBoundingClientRect().left;
var svgY = svg.getBoundingClientRect().top; 
var anchoCelda =800/8; 
var anguloX = 0;
var anguloY = 0;
var anguloXadd = 0;
var anguloYadd = 0;
var cosX = 1;
var senX = 0;
var cosY = 1;
var senY = 0; 
var projections = [cosX, senX, cosY, senY ];
var anchoTotal=800;

/* --- CREAR CONTROLES --- */
function crearControles(){
let marco = document.getElementById("personajes");
let titulo = document.getElementById("tituloPersonaje");
var newDiv = document.createElement("div");

var controles = Pantalon.controles;
titulo.innerHTML= controles[0];
for(let i=1; i< controles.length; i++){
  let newDiv = document.createElement("div");
  newDiv.classList.add("grupoValor");
  let newLabel= document.createElement("div");
  newLabel.classList.add("label");
  let newInput = document.createElement("input");
  newInput.setAttribute("type", "number");
  newInput.setAttribute("id", controles[i][0] +controles[i][1]);
  newLabel.innerHTML= controles[i][0];
  if(controles[i][1]== "rB"){
    newInput.max = "170";
    newInput.min = "0";
  } else if(controles[i][1]== "rA"){
    newInput.max = "170";
    newInput.min = "-170";

  }
  newDiv.appendChild(newLabel);
  newDiv.appendChild(newInput);
  marco.appendChild(newDiv);
}
}



/*
  if(controles[1][1] == "p"){
      newLabel.innerHTML= nombre + " Posicion";
      newInput.setAttribute("id", nombre + "Posicion");
      newDiv.appendChild(newImput);
      newDiv.appendChild(newImput);
      marco.appendChild(newDiv);
  }
  */


/* ------ Mostrar los objetos de la lista importada ------*/

function calculationProj(x1,y1,z1){
      let x1n = (x1*cosX-y1*senX) + anchoTotal/2;        
      let y1n = (x1*senX+y1*cosX)*senY - z1*cosY + anchoTotal/2 ;      
      let z1n = z1*cosY;
      return [x1n, y1n];
}
function culling(ini, seg, final){
  let a = (seg[0]-ini[0])*(final[1]-ini[1]) - (final[0]-ini[0])*(seg[1]-ini[1])
  return a >0;
}
function addObjets(){
    
 
} 
/*---------GIROS------*/

function girarEspacio(evt) {
  let inicioDragX = 0;
  let inicioDragY =0;      
  let evento = evt || window.event;
  let pulsado = evento.button;
  if(pulsado ==2){
      inicioDragX = evt.clientX -svgX;
      inicioDragY = evt.clientY-svgY;       
      svg.addEventListener('mousemove', drag);
      svg.addEventListener('mouseup', endDrag);
      svg.addEventListener('mouseleave', endDrag);        
  }     
  function drag(evt) {  
      let dragX = evt.clientX-inicioDragX-svgX;
      let dragY = evt.clientY-inicioDragY-svgY;
      if (evt.ctrlKey){ dragY =0;} 
       if (evt.ctrlKey){ dragY =0;}    
      anguloXadd = (~~(((dragX*0.02)%360)*1000))/1000;
      anguloYadd =  (~~(((-dragY*0.02)%360)*1000))/1000;
      anguloX= ~~((anguloX+anguloXadd)*1000)/1000;    
      anguloY= ~~((anguloY+anguloYadd)*1000)/1000;     
      document.getElementById("anguloY").textContent = "x:"+  Math.floor(anguloX) + "º "+ " y:" + Math.floor(anguloY) + "º"; 
      document.getElementById("rotateX").value = anguloX;
      document.getElementById("rotateY").value = anguloY; 
      let anguloXrad = anguloX/57.29578;
      let anguloYrad = anguloY/57.29578;
      cosX = Math.cos(anguloXrad);  
      senX = Math.sin(anguloXrad);  
      cosY = Math.cos(anguloYrad);  
      senY = Math.sin(anguloYrad); 
      projections = [cosX, senX, cosY, senY ];
      girarCuadricula(projections);    
  }
  function endDrag(evt) {   
      svg.removeEventListener('mousemove', drag);
      svg.removeEventListener('mouseup', endDrag);
      svg.removeEventListener('mouseleave', endDrag);      
  } 

    
}
function anguloFromInput(){ 
  anguloX= document.getElementById("rotateX").value;
  anguloY= document.getElementById("rotateY").value;  
  
}

window.onload = function() { 
  crearControles();
  addObjets(); 
  svg = document.getElementById("svg"); 
  //svg.addEventListener('click', seleccionarObjetos);
  //moverObjetosInput();  
  document.getElementById("rotateX").onchange=anguloFromInput;
  document.getElementById("rotateY").onchange=anguloFromInput;  
  document.documentElement.onmousedown = girarEspacio;
}