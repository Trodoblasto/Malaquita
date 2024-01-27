export var listaObjs = {};
 /*----------------------------------- */
 var svgNS = "http://www.w3.org/2000/svg";
listaObjs = {

   /* plano2:{
        nameObj :"plano2.001",
        typeObj :"plane",
        coord : {pos:[0,0,0], rot:[0,0,0], scale:[1,1,1]},
        geom:[[-150,100,300],[150,100,300],[150,0,200],[-150,0,200]],
        style:{fill : "#faa",  stroke:"#000"}
    },     
   
   plano1:{
        nameObj :"plano1.001",
        typeObj :"plane",
        coord : {pos:[0,0,0], rot:[0,0,0], scale:[1,1,1]},
        geom:[[-150,0,100],[150,0,100],[150,0,0],[-150,0,0]],
        style:{fill : "orange",  stroke:"#000"}
    },   
    */
 
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
    },
    

    /*
    piramde:{       
        nameObj :"piramide",
        typeObj :"poly",
        coord :{pos:[300,200,150]},
        geom :[["piramide.01",[-200,-100,0],[200,100,0],[200,-100,0],[-150,0,0]]],
        ["piramide.01",[-150,0,100],[150,0,100],[150,0,0],[-150,0,0]],
        style:{fill:"#806;", stroke:"#000" }
    },
    
    /*puntito: {
        nameObj:"puntito.001",
        typeObj:"dot",
        coord:{pos:[100,200,200], rot:[0,0,0]},
        geom:{radio:14},
        style:{fill:"#666;", stroke:"#000" }
    }
    */
}
