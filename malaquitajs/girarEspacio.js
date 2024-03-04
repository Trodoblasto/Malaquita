
export default function giro(evt, svg) {
    let svgX = svg.getBoundingClientRect().left;
    let svgY = svg.getBoundingClientRect().top; 
    let anguloX = 0;
    let anguloY = 0;
    let anguloXadd = 0;
    let anguloYadd = 0

    let cosX = 1;
    let senX = 0;
    let cosY = 1;
    let senY = 0; 

    let inicioDragX = 0;
    let inicioDragY =0;      
    let evento = evt || window.event;    

    function drag(evt) {  
            let dragX = evt.clientX-inicioDragX-svgX;
            let dragY = evt.clientY-inicioDragY-svgY;
            if (evt.ctrlKey){ dragY =0;} 
            if (evt.ctrlKey){ dragY =0;}    
            anguloXadd = (~~(((dragX*0.02)%360)*1000))/1000;
            anguloYadd =  (~~(((-dragY*0.02)%360)*1000))/1000;
            anguloX= ~~((anguloX+anguloXadd)*1000)/1000;    
            anguloY= ~~((anguloY+anguloYadd)*1000)/1000;     
            //document.getElementById("anguloY").textContent = "x:"+  Math.floor(anguloX) + "º "+ " y:" + Math.floor(anguloY) + "º"; 
            document.getElementById("rotateX").value = anguloX;
            document.getElementById("rotateY").value = anguloY; 
               // ----Hasta aqui es suficient
            let anguloXrad = anguloX/57.29578;
            let anguloYrad = anguloY/57.29578;
            cosX = Math.cos(anguloXrad);  
            senX = Math.sin(anguloXrad);  
            cosY = Math.cos(anguloYrad);  
            senY = Math.sin(anguloYrad);
            console.log(">>>>>: " + JSON.stringify([cosX, senX , cosY, senY]  ))
            return [cosX, senX , cosY, senY]            
        }

    return drag(evt)
  }
  
   
   
