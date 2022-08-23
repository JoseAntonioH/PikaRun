
//imagenes


const pikachu=new Image();
pikachu.src="../imagenes/pikachu.gif";

const diggletImg=new Image();
diggletImg.src="../imagenes/digglet.png";

const pidgeotImg=new Image();
pidgeotImg.src="../imagenes/megapidgeot.gif";



//seleccionar canvas

let lienzo= document.getElementById("lienzo");
let ctx= lienzo.getContext("2d");


//lista de enemigos en array

const enemigosPokemon=[];



//crear personaje

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


//enemigo

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
        if(this.nivel==="facil"){
            this.x -=4;

        } else {
            this.x -=4;
        }
    
        this.x -=4;
    }
}


class Pidgeots {
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
        if(this.nivel==="facil"){
            this.x -=4;

        } else {
            this.x -=4;
        }
    
        this.x -=4;
    }
}





//mostrar nombre del juego

function mostrarDatos(distancia){
    ctx.fillStyle="black";
    ctx.font="64px Arial"
    
    //distancia
    ctx.fillText(`${distancia}m`,40,65);
    
   
    //ctx.fillText(`Vida: ${vida}`, 235,50);
}

//escuche las teclas

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


function crearDigglets(){
    const num=Math.floor(Math.random()*900);
    

    if (num===3){
        const pokes=new Digglets(1590,750,60,80,diggletImg,"facil");
        enemigosPokemon.push(pokes);
    } else if (num===100){
        const pokes=new Pidgeots(1590,470,270,300,pidgeotImg,"facil");
        enemigosPokemon.push(pokes);
    }
}


function iniciarJuego(){
    let distancia=0;
    const pika=new Pikachu(20,630,195,160,"transparent",100,pikachu);
    teclas(pika);
    pika.dibujarse();

   

    setInterval(() => {
        ctx.clearRect(0,0,1597,892);
        //mostrar datos
        mostrarDatos(distancia,0);
        distancia +=1;

       
     
        pika.dibujarse();

        //saltar

        if(pika.saltando===true){
    
            //altura maxima de salto
            if(pika.y > 400){
                pika.y -=8;
            } else {
                console.log("bajate");
                pika.saltando=false;
            }
            
        }

        

        if(pika.saltando===false && pika.y<630){
            pika.y +=8;
        }

      




//agacharse

if(pika.crouch===true){
    
    //altura maxima agacharse
    if(pika.y < 750){
        pika.y +=6;
    } else {
        pika.crouch=false;
    }
    
}


if(pika.crouch===false && pika.y>630){
    pika.y -=4;
}




        //dibujar enemigos

        enemigosPokemon.forEach((pokes,index) => {
            pokes.dibujarse();
            if(pokes.x <= pika.x + pika.w && pokes.y <= pika.y + pika.h) { //aquiiiii cambiar
                
                //eliminar digglets
                enemigosPokemon.splice(index,1);
                
            }
        });
        

        crearDigglets();
    },1000/60)
}


iniciarJuego();



// puntuacion maxima
// no se repitan enemigos
// colision en y
// no se repitan enemigos
// trabar salto y agacharse
// gif de pikachu