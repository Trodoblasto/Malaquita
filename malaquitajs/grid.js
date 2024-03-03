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
