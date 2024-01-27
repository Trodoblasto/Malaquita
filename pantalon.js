export const Pantalon = {
  controles : [
            "PANTALON_1",
        ["centro.posX", ["px"]], 
        ["centro.posY", ["px"]], 
        ["centro.posZ", ["px"]], 
        ["hipDe.rotX", ["rA"]], 
        ["rodDe.rotX", ["rB"]], 
        ["hipIz.rotX",["rA"]], 
        ["rodIz.rotX", ["rB"]]
        ] 
}
    

 var svgNS = "http://www.w3.org/2000/svg"; 
 var cintDecoor= [-6,60,0];
 var cintIzcoor= [-6,60,0];
 var hipDeCoor = [-10,40,0];
 var hipIzCoor = [-10,0,0];
 var rodIzCoor = [10,0,0];
 var tobDeCoor = [-10,-40,0];
 var tobIzCoor = [-10,40,0];
 let esq= []
 export function creaPantalon
 export function esqueleto(svg,projections ){
        let cosX = projections[0];  
        let senX = projections[1];  
        let cosY = projections[2];  
        let senY = projections[3];   
        var numeroLineas= lineasVerticales.length;
        let centro = anchoTotal/2
       
        for(let i=0; i<numeroLineas; i++){              
          let x1 = centro -anchoCelda*(i);          
          let y1 = centro;          
          let x2 = x1; 
          let y2 = -centro;
          let x1n = (x1*cosX-y1*senX) + centro;        
          let y1n = (x1*senX+y1*cosX)*senY + centro;        
          let x2n = (x2*cosX-y2*senX) + centro;
          let y2n = (x2*senX+y2*cosX)*senY + centro;
          let lineaV = lineasVerticales[i];
          lineaV.setAttributeNS(null, 'x1', x1n);
          lineaV.setAttributeNS(null, 'y1', y1n);        
          lineaV.setAttributeNS(null, 'x2',x2n);
          lineaV.setAttributeNS(null, 'y2', y2n);    
        }  
 }



   

