

let idInterval;


//IMAGE pikachu

const cero = new Image();
cero.src="../imagenes/0.png";
const ceroUno = new Image();
ceroUno.src="../imagenes/0.png";
const ceroDos = new Image();
ceroDos.src="../imagenes/0.png";

const uno = new Image();
uno.src="../imagenes/1.png";
const unoUno = new Image();
unoUno.src="../imagenes/1.png";
const unoDos = new Image();
unoDos.src="../imagenes/1.png";

const dos = new Image();
dos.src="../imagenes/2.png";
const dosUno = new Image();
dosUno.src="../imagenes/2.png";
const dosDos = new Image();
dosDos.src="../imagenes/2.png";

const tres = new Image();
tres.src="../imagenes/3.png";
const tresUno = new Image();
tresUno.src="../imagenes/3.png";
const tresDos = new Image();
tresDos.src="../imagenes/3.png";



const sprites=[cero,ceroUno,ceroDos,uno,unoUno,unoDos,dos,dosUno,dosDos,tres,tresUno,tresDos];


let posicion=0;

//IMAGES enemies

const diggletImg=new Image();
diggletImg.src="../imagenes/digglet.png";

const pidgeotImg=new Image();
pidgeotImg.src="../imagenes/megapidgeot.png";

//IMAGE cloud

const nubeImg=new Image();
nubeImg.src="../imagenes/nube.png";


//select canvas

let lienzo= document.getElementById("lienzo");
let ctx= lienzo.getContext("2d");


//enemies arrays

const enemigosPokemon=[];
const enemigosPokemon2=[];

//array clouds
const fondoNube=[];



// CREATE CLOUD

class Nubes {
    constructor(x,y,w,h,imagen,nivel){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.imagen=imagen;
        this.nivel=nivel;
    }
    dibujarse(){
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
     
        this.x -=2;
        
    }
}



//CREATE PIKACHU

class Pikachu {
    constructor(x,y,w,h,color,vida,imagen){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.color=color;
        this.vida=vida;
        this.imagen=imagen;
        this.saltando=false;
        this.crouch=false;
    }
    saltar(){
        this.saltando=true;
    }
    agacharse(){
        this.crouch=true;
    }
    dibujarse(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);

        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
    }
    morirse(){

    }
}


//CREATE ENEMIES

class Digglets {
    constructor(x,y,w,h,imagen,nivel){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.imagen=imagen;
        this.nivel=nivel;
    }
    dibujarse(){
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
        
         this.x -=8;
        
    }
}


class Pidgeots {
    constructor(x,y,w,h,imagen,nivel,color){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.imagen=imagen;
        this.nivel=nivel;
        this.color=color;
    }
    dibujarse(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(this.imagen,this.x,this.y,this.w,this.h);
     
    
        this.x -=8;
    }
}




//SCORE AND HIGHSCORE

function mostrarDatos(distancia,highScore){
    ctx.fillStyle="black";
    ctx.font="64px Arial"
    
    
    ctx.fillText(`Score: ${distancia}m`,40,85);
    ctx.fillText(`Highscore: ${highScore}m`,40,145);
    
   
    
}

//KEYS

function teclas(pika){
    document.addEventListener("keyup", (evento) => {
        console.log("tecla tocada", evento.code);
        switch(evento.code){
            case "Space":
            pika.saltar();
            break;
            case "ArrowDown":
            pika.agacharse();
            break;
        }
    });
}


//SPAWN ENEMIES AND CLOUDS

function crearDigglets(){
    
    
    const num=Math.floor(Math.random()*5);

    
        
    

    if (num===3){
        
        const pokes=new Digglets(1690,750,60,70,diggletImg);
        enemigosPokemon.push(pokes);
        
    
        
    } else if (num===4){
        
        const pokes=new Pidgeots(1590,420,270,300,pidgeotImg);
        enemigosPokemon2.push(pokes);
        
    
        
    } else if (num===1){
        const nube=new Nubes(1590,250,350,200,nubeImg);
        fondoNube.push(nube);

    } else if(num===2){
        const nube2=new Nubes(1590,210,150,100,nubeImg);
        fondoNube.push(nube2);

    }
    
}


let highScore=0;
    

//BEGIN GAME

function iniciarJuego(){
    let distancia=0;
    
    let intervalPokemon=0;
    
    const pika=new Pikachu(20,630,195,160,"transparent",100,cero);
    
    teclas(pika);

    pika.dibujarse();


    idInterval=setInterval(() => {
        
        ctx.clearRect(0,0,1597,892);
        //mostrar datos
        
        mostrarDatos(distancia,highScore,intervalPokemon);
        distancia +=1;
        intervalPokemon ++;

        pika.imagen=sprites[posicion];
    
        posicion++;
    
        if (posicion===12){
        posicion=0;
        }

     
        pika.dibujarse();


        //JUMP

        if(pika.saltando===true){
            posicion=4;
            //MAX JUMP HEIGTH
            if(pika.y > 400){
                pika.y -=8;
            } else {
                pika.saltando=false;
            }
            
        }

        if(pika.saltando===false && pika.y<630){
            pika.y +=8;
            posicion=6;
        }

        //CROUCH

        if(pika.crouch===true){
    
        //MAX CROUCH HEIGTH
        if(pika.y < 750){
            pika.y +=6;
        } else {
            pika.crouch=false;
        }
    
        }


        if(pika.crouch===false && pika.y>630){
            pika.y -=4;
        }

       //draw clouds

        fondoNube.forEach((cloud) => {
            
            cloud.dibujarse();

        });
            

        //dibujar enemigos

        enemigosPokemon.forEach((pokes,index) => {

           
            pokes.dibujarse();

            //velocidad de enemigos
            if (distancia>1000){
                pokes.x -=2;
            } 
            
            if (distancia>2000){
                pokes.x -=3;
            } 
            
            if (distancia>2500){
                pokes.x -=3;
            }
            
            if (distancia>3000){
                pokes.x -=3;
            }
            
            if (distancia>3500){
                pokes.x -=3;
            } 
            
            if (distancia>4000){
                pokes.x -=3;
            }
            
            if (distancia>5000){
                pokes.x -=3;
            }

            if(pokes.x <= pika.x + pika.w && pokes.x >=pika.x && pokes.y <= pika.y + pika.h) { 
                
                //eliminar digglets
                enemigosPokemon2.splice(0);
                enemigosPokemon.splice(index);
                
                if(distancia>highScore){
                    highScore=distancia;
                }
                
                distancia=0;
                
                clearInterval(idInterval);

                ctx.fillStyle= "rgb(0,0,0,.7)"
                ctx.fillRect(450,350,700,400);
                ctx.fillStyle= "rgb(255,255,255)";
                ctx.fillText("Game Over",630,500);
                ctx.fillStyle= "rgb(0,0,0,.7)"
                ctx.fillRect(675,550,250,90);
                ctx.fillStyle= "rgb(255,255,255)";
                ctx.font="24px Arial"
                ctx.fillText("Play Again",745,600);
                const btnStart = document.querySelector('.start');
                btnStart.addEventListener('click', () => {
                    clearInterval(idInterval);
                    iniciarJuego();
                });
                
                
                
            }
        });
        
        enemigosPokemon2.forEach((pokes,index) => {
            
            pokes.dibujarse();
                

            //velocidad de enemigos
            if (distancia>1000){
                pokes.x -=2;
            }
            
            if (distancia>2000){
                pokes.x -=3;
            } 
            if (distancia>2500){
                pokes.x -=3;
            }  
            
            if (distancia>3000){
                pokes.x -=3;
            }
            
            if (distancia>3500){
                pokes.x -=3;
            } 
            
            if (distancia>4000){
                pokes.x -=3;
            } 
            
            if (distancia>5000){
                pokes.x -=3;
            }

            if(pokes.x <= pika.x + pika.w && pokes.x >=pika.x && pokes.y+50 >= pika.y - pika.h) { 
                
                //eliminar pidgeots
                enemigosPokemon.splice(0);
                enemigosPokemon2.splice(index);
                
                if(distancia>highScore){
                    highScore=distancia;
                }
                
                distancia=0;
                
                ctx.fillStyle= "rgb(0,0,0,.7)"
                ctx.fillRect(450,350,700,400);
                ctx.fillStyle= "rgb(255,255,255)";
                ctx.fillText("Game Over",630,500);
                ctx.fillStyle= "rgb(0,0,0,.7)"
                ctx.fillRect(675,550,250,90);
                ctx.fillStyle= "rgb(255,255,255)";
                ctx.font="24px Arial"
                ctx.fillText("Play Again",745,600);
                const btnStart = document.querySelector('.start');
                btnStart.addEventListener('click', () => {
                    clearInterval(idInterval);
                    iniciarJuego();
                });
                
                clearInterval(idInterval);
                
            }
        });

        

        if(intervalPokemon>70 && distancia<2000){
            crearDigglets();
            intervalPokemon=0;
        }  
        
        if (intervalPokemon>60 && distancia>=2000){
            crearDigglets();
            intervalPokemon=0;
        };
       
        
    },1000/60)
}


iniciarJuego();





// pausar juego en colision

// movimiento de nubes