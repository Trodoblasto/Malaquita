listaObjs = {

   planoPoly:{
       nameObj :"planoPoly",
       typeObj :"poly",
       coord : {pos:[0,0,0], rot:[0,0,0]},
       geom:[[[-150,0,100],[150,0,100],[150,0,0],[-150,0,0]],
             [[-150,100,100],[150,100,100],[150,100,0],[-150,100,0]],
             [[-150,100,100],[150,100,100],[150,0,100],[-150,0,100]],
             [[150,0,100],[150,100,100],[150,100,0],[150,0,0]],
             [[-150,0,100],[-150,100,100],[-150,100,0],[-150,0,0]],
             ],
       style:{fill : "#59f",  stroke:"#000"}
   }
}

var svgNS = "http://www.w3.org/2000/svg";
var svg = document.getElementById("svg"); 
var svgX = svg.getBoundingClientRect().left;
var svgY = svg.getBoundingClientRect().top; 
var ejeZ= document.createElementNS(svgNS,'line');
var alturaEjeZ= 200;
var anguloX = 0;
var anguloY = 0;
var anguloXadd = 0;
var anguloYadd = 0
var anchoCelda =0; 
var cosX = 1;
var senX = 0;
var cosY = 1;
var senY = 0; 
var lineasVerticales = [];
var lineasHorizontales = [];
var numeroLineas=0;
var anchoTotal=800;
var centro=400;

/* ------ CREAR CUADRICULA ------ */
function crearCuadricula (n){  
    svgX = svg.getBoundingClientRect().left;
    svgY = svg.getBoundingClientRect().top;   
    numeroLineas = n;    
    anchoCelda =anchoTotal/n;    
   for(let i= 0; i < numeroLineas + 1; i++){
        let lineaV= document.createElementNS(svgNS,'line');
        lineaV.setAttributeNS(null, 'x1',0);
        lineaV.setAttributeNS(null, 'y1', 400);
        lineaV.setAttributeNS(null, 'x2', anchoTotal);
        lineaV.setAttributeNS(null, 'y2', 400);        
       if( i !== n/2  ){
            lineaV.setAttributeNS(null, 'style', 'stroke: #ccc; stroke-width:1');
          } else {
            lineaV.setAttributeNS(null, 'style', 'stroke: #f00; stroke-width:2');
          }      
        svg.appendChild(lineaV);
        lineasVerticales.push(lineaV);        
      }
      for(let i=0; i<numeroLineas+1; i++){
          let lineaH= document.createElementNS(svgNS,'line');
          lineaH.setAttributeNS(null, 'x1', 0);
          lineaH.setAttributeNS(null, 'y1', 0);        
          lineaH.setAttributeNS(null, 'x2', anchoTotal);
          lineaH.setAttributeNS(null, 'y2',0);             
          if( i !== n/2){
              lineaH.setAttributeNS(null, 'style', 'stroke: #ccc; stroke-width:1');
            } else {
              lineaH.setAttributeNS(null, 'style', 'stroke: #f00; stroke-width:2');
            }            
          svg.appendChild(lineaH);
          lineasHorizontales.push(lineaH);        
        }
        ejeZ.setAttributeNS(null, 'x1', centro);
        ejeZ.setAttributeNS(null, 'y1', centro);
        ejeZ.setAttributeNS(null, 'x2', centro);
        ejeZ.setAttributeNS(null, 'y2', centro-alturaEjeZ); 
        ejeZ.setAttributeNS(null, 'style', 'stroke: #0f0; stroke-width:2'); 
        svg.appendChild(ejeZ);         
}
/* ----------------------------------------*/


/* ------ Mostrar los objetos de la lista importada ------*/
let listaObjsImport =  Object.keys(listaObjs).map(function(key){return listaObjs[key];});
let objsDet =[];
let shapes =[];
let dosDPos = [];

function calculationProj(x1,y1,z1){
      let x1n = (x1*cosX-y1*senX) + centro;        
      let y1n = (x1*senX+y1*cosX)*senY - z1*cosY + centro ;      
      let z1n = z1*cosY;
      return [x1n, y1n];
}
function culling(ini, seg, final){
  let a = (seg[0]-ini[0])*(final[1]-ini[1]) - (final[0]-ini[0])*(seg[1]-ini[1])
  return a >0;
}
function addObjets(){
    for (let j=0; j< listaObjsImport.length; j++){ 
      switch (listaObjsImport[j].typeObj) {
        case "dot":
          shapes[j] = document.createElementNS(svgNS,'circle');          
          shapes[j].setAttributeNS(null, 'id', listaObjsImport[j].nameObj.split(".")[0]);
          shapes[j].setAttributeNS(null, 'r', listaObjsImport[j].geom.radio);
          shapes[j].setAttributeNS(null, 'fill' , listaObjsImport[j].style.fill); 
          shapes[j].setAttributeNS(null,  'stroke' , listaObjsImport[j].style.stroke);
          shapes[j].classList.add("draggable");
          let x1 =  listaObjsImport[j].coord.pos[0];
          let y1 =  listaObjsImport[j].coord.pos[1];
          let z1 =  listaObjsImport[j].coord.pos[2];
          dosDPos= calculationProj(x1,y1,z1);
          shapes[j].setAttributeNS(null, 'cx', dosDPos[0]);  
          shapes[j].setAttributeNS(null, 'cy', dosDPos[1]);
        break;
        case "plane": 
          let idNamePlane= listaObjsImport[j].nameObj.split(".")[0]; 
          let type = listaObjsImport[j].typeObj;
          objsDet[j] = [idNamePlane, type, listaObjsImport[j].geom];
          shapes[j] = document.createElementNS(svgNS, "polygon");                  
          shapes[j].setAttributeNS(null, 'id', idNamePlane);         
          let point2D;
          for (let value of objsDet[j][2]) {
              let point = svg.createSVGPoint();
              point2D= calculationProj(value[0],value[1],value[2]);
              point.x = point2D[0];
              point.y =point2D[1];
              shapes[j].points.appendItem(point);
          }
          shapes[j].setAttributeNS(null, 'fill' , listaObjsImport[j].style.fill); 
          shapes[j].setAttributeNS(null,  'stroke' , listaObjsImport[j].style.stroke);
          shapes[j].classList.add("draggable");
        break; 
        case "poly":
          let idNamePoly= listaObjsImport[j].nameObj; //
          let typePoly = listaObjsImport[j].typeObj; //
          objsDet[j] = [idNamePoly, typePoly, listaObjsImport[j].geom];//

          shapes[j] = document.createElementNS(svgNS, "g");
          shapes[j].setAttributeNS(null, 'id', idNamePoly);//
          let fillObj =  listaObjsImport[j].style.fill;//
          let stroke =  listaObjsImport[j].style.stroke;//
          let faces = listaObjsImport[j].geom;//
          
          let face;
          let opacity=1;
          for (let k=0; k< faces.length; k++) {
              face = document.createElementNS(svgNS, "polygon");
              face.setAttributeNS(null, 'id', (idNamePoly + "000" + k));
              let point2Dpoly;
              let pointFace;
              let point2DInicio;
              let point2DSegundo;
              let point2DFinal;
              for (let i = 0;i<faces[k].length; i ++){
                  pointFace = svg.createSVGPoint();
                  point2Dpoly= calculationProj(faces[k][i][0],faces[k][i][1],faces[k][i][2]); 
                  if(i==0){
                    point2DInicio = point2Dpoly;
                  } else if(i ==1){
                    point2DSegundo = point2Dpoly;
                  } else if (i == faces[k].length-1){
                    point2DFinal= point2Dpoly
                  }          
                  pointFace.x = point2Dpoly[0];
                  pointFace.y =point2Dpoly[1];
                  
                  face.points.appendItem(pointFace);
              }
              
              if(culling(point2DInicio, point2DSegundo, point2DFinal)){
                (k%2==0)?face.setAttributeNS(null, 'fill', fillObj): face.setAttributeNS(null, 'fill', "#a33"); 
                face.setAttributeNS(null, 'stroke',stroke);
                face.setAttributeNS(null, 'opacity',0.0);
              } else {
                (k%2==0)?face.setAttributeNS(null, 'fill', fillObj): face.setAttributeNS(null, 'fill', "#a33"); 
                face.setAttributeNS(null, 'fill', fillObj);
                face.setAttributeNS(null, 'opacity', 1.0); 
                face.setAttributeNS(null, 'stroke', stroke);
            }
              (k%2==0)?face.setAttributeNS(null, 'fill', fillObj): face.setAttributeNS(null, 'fill', "#a33"); 
              face.setAttributeNS(null, 'stroke', stroke);
              face.classList.add("draggable");
              shapes[j].insertBefore(face, null);

              
          } 
        break; 
        default:
        break;
      }
      svg.appendChild(shapes[j]);
  }
} 
/*------------------Desplazamientos---------------*/
function moverEspacio(mX, mY) {
  console.log("----------------------------")
  console.log("-mX: "+ mX )
  console.log("-mY: "+ mY )

  for(let j=0; j<numeroLineas+1; j++){
    let lineaH = lineasHorizontales[j];
    let newX1 =  parseFloat(lineaH.getAttributeNS( null,'x1')) +  parseFloat(mX)
    let newY1 =  parseFloat(lineaH.getAttributeNS(null,'y1')) +  parseFloat(mY);        
    let newX2 =  parseFloat(lineaH.getAttributeNS(null, 'x2')) +  parseFloat(mX);
    let newY2 =  parseFloat(lineaH.getAttributeNS(null, 'y2'))+  parseFloat(mY); 
    lineaH.setAttributeNS(null, 'x1', newX1);
    lineaH.setAttributeNS(null, 'y1', newY1);        
    lineaH.setAttributeNS(null, 'x2', newX2);
    lineaH.setAttributeNS(null, 'y2', newY2);    
  }  

  for(let j=0; j<numeroLineas+1; j++){
      let lineaV= lineasVerticales[j];
      let newX1 =  parseFloat(lineaV.getAttributeNS(null, 'x1')) +  parseFloat(mX);   
      let newY1 =  parseFloat(lineaV.getAttributeNS(null,'y1')) +  parseFloat(mY);        
      let newX2 =  parseFloat(lineaV.getAttributeNS(null,'x2')) +  parseFloat(mX);
      let newY2 =  parseFloat(lineaV.getAttributeNS(null,'y2')) +  parseFloat(mY); 
      if(j < 3){
      console.log("-linea H oldX1 "+ j + ": " + lineaV.getAttributeNS(null, 'x1'))
      console.log("-linea H oldY1 "+ j + ": " + lineaV.getAttributeNS(null, 'y1'))
      console.log("-linea H newX1 "+ j + ": " + newX1)
      console.log( "mX :" + mX)
      console.log("-linea H newY1 "+ j + ": " +  newY1)
      }

      lineaV.setAttributeNS(null, 'x1', newX1);
      lineaV.setAttributeNS(null, 'y1', newY1);        
      lineaV.setAttributeNS(null, 'x2', newX2);
      lineaV.setAttributeNS(null, 'y2', newY2);    
  } 
  let ejeZNewX1 =  parseFloat(ejeZ.getAttributeNS(null, 'x1')) +  parseFloat(mX);
  let ejeZNewY1 =  parseFloat(ejeZ.getAttributeNS(null, 'x1')) +  parseFloat(mX);
  let ejeZNewX2 =  parseFloat(ejeZ.getAttributeNS(null, 'x1')) + parseFloat(mX);
  let ejeZNewY2 =  parseFloat(ejeZ.getAttributeNS(null, 'x1')) +  parseFloat(mX);

  ejeZ.setAttributeNS(null, 'x1', ejeZNewX1);
  ejeZ.setAttributeNS(null, 'y1', ejeZNewY1);
 ejeZ.setAttributeNS(null, 'x2', ejeZNewX2);
  ejeZ.setAttributeNS(null, 'y2', ejeZNewY2); 

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
      girarTodo(anguloX,anguloY);     
  }
  function endDrag(evt) {       
      svg.removeEventListener('mousemove', drag);
      svg.removeEventListener('mouseup', endDrag);
      svg.removeEventListener('mouseleave', endDrag);      
  }      
}

function girarTodo(aX,aY){ 
  let anguloXrad = anguloX/57.29578;
  let anguloYrad = anguloY/57.29578;
  cosX = Math.cos(anguloXrad);  
  senX = Math.sin(anguloXrad);  
  cosY = Math.cos(anguloYrad);  
  senY = Math.sin(anguloYrad); 
  
  /* ---- Girar la cuadricula -------*/
  for(let i=0; i<numeroLineas+1; i++){                   
    let x1 = centro -anchoCelda*(i);          
    let y1 = centro;          
    let x2 = x1; 
    let y2 = -centro;
    let x1n = (x1*cosX-y1*senX) + centro;        
    let y1n = (x1*senX+y1*cosX)*senY + centro;        
    let x2n = (x2*cosX-y2*senX) + centro;
    let y2n = (x2*senX+y2*cosX)*senY + centro;
    let linea = lineasVerticales[i];
    linea.setAttributeNS(null, 'x1', x1n);
    linea.setAttributeNS(null, 'y1', y1n);        
    linea.setAttributeNS(null, 'x2',x2n);
    linea.setAttributeNS(null, 'y2', y2n);    
  }  
  for(let j=0; j<numeroLineas+1; j++){         
    let x1 = centro ;          
    let y1 = centro-anchoCelda * (j);            
    let x2 = -centro; 
    let y2 = y1;
    let x1n = (x1*cosX-y1*senX)+ centro;        
    let y1n = (x1*senX+y1*cosX)*senY + centro;        
    let x2n = (x2*cosX-y2*senX) + centro;
    let y2n = (x2*senX+y2*cosX)*senY + centro;
    let lineaH = lineasHorizontales[j];
    lineaH.setAttributeNS(null, 'x1', x1n);
    lineaH.setAttributeNS(null, 'y1', y1n);        
    lineaH.setAttributeNS(null, 'x2',x2n);
    lineaH.setAttributeNS(null, 'y2', y2n);    
  }  
  ejeZ.setAttributeNS(null, 'x1', centro);
  ejeZ.setAttributeNS(null, 'y1', centro);
  ejeZ.setAttributeNS(null, 'x2', centro);
  ejeZ.setAttributeNS(null, 'y2', centro-alturaEjeZ*cosY); 
  for(let j=0; j<numeroLineas+1; j++){         
    let x1 = centro ;          
    let y1 = centro-anchoCelda*(j);            
    let x2 = -centro; 
    let y2 = y1;
    let x1n = (x1*cosX-y1*senX)+ centro;        
    let y1n = (x1*senX+y1*cosX)*senY + centro;        
    let x2n = (x2*cosX-y2*senX) + centro;
    let y2n = (x2*senX+y2*cosX)*senY + centro;
    let lineaH = lineasHorizontales[j];
    lineaH.setAttributeNS(null, 'x1', x1n);
    lineaH.setAttributeNS(null, 'y1', y1n);        
    lineaH.setAttributeNS(null, 'x2',x2n);
    lineaH.setAttributeNS(null, 'y2', y2n);    
  } 

  for (let j=0; j<objsDet.length; j++){ 
    switch (objsDet[j][1]) {
      case "dot":
        let posiciones =  objsDet[j][2];
        let x = posiciones[0] ;          
        let y = posiciones[1] ;            
        let z = posiciones[2];
        let x3D = (x*cosX-y*senX) + centro;        
        let y3D = (x*senX+y*cosX)*senY - z*cosY + centro ;      
        let z3D = z*cosY;
        shapes[j].setAttributeNS(null, 'cx', x3D);  
        shapes[j].setAttributeNS(null, 'cy', y3D); 
      break;  
      case "plane":
        let arrayPoints = objsDet[j][2];
        let point2D ;   
        let pointString = "";
        for (let point of arrayPoints) {
            point2D = calculationProj(point[0],point[1],point[2]);
            pointString += point2D[0]+ "," +  point2D[1] + " ";
        }
        shapes[j].setAttribute("points",pointString);
      break;
      case "poly":                
          let arrayFaces = objsDet[j][2];
          let shapesNodes = shapes[j].childNodes;
          for (let i=0; i < shapesNodes.length; i++) { 
            let point2D ;   
            let pointString2 = "";  
            let face = arrayFaces[i] ; 
            let point2DInicio;
            let point2DSegundo;
            let point2DFinal;        
              for (let k=0; k < face.length; k++){
                let point = face[k]
                point2D = calculationProj(point[0],point[1],point[2]);
                pointString2 += point2D[0]+ "," +  point2D[1] + " ";
                if(k==0){
                  point2DInicio = point2D;
                } else if(k ==1){
                  point2DSegundo = point2D;
                } else if (k == face.length-1){
                  point2DFinal= point2D
                }                
              }               
              shapesNodes[i].setAttribute("points",pointString2); 
              if(culling(point2DInicio, point2DSegundo, point2DFinal)){              
                shapesNodes[i].setAttributeNS(null, 'opacity',0.0);
              } else {                
                shapesNodes[i].setAttributeNS(null, 'opacity', 1.0);
            }
          } 
        break; 
      default:
      break;
    } 
  }  
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

window.onload = function() { 
  crearCuadricula(9);
  addObjets(); 
  svg = document.getElementById("svg"); 
  //svg.addEventListener('click', seleccionarObjetos);
  //moverObjetosInput();  
  document.getElementById("rotateX").onchange=anguloFromInput;
  document.getElementById("rotateY").onchange=anguloFromInput;  
  document.getElementById("transX").onchange=posFromInput;
  document.getElementById("transY").onchange=posFromInput;  
  document.documentElement.onmousedown = girarEspacio;
}