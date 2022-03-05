const canvas= document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width= window.innerWidth/3;
canvas.height= window.innerHeight*2;
let adjustX=0;
let adjustY=-15;
let particleArray=[
]
//handle mouse interactions

let mouse= {
    x:null,
    y:null,
    radius:200
}
window.addEventListener("mousemove", function(event){


mouse.x=event.x;
mouse.y=event.y

})
/* event stands for the built in object of the event mouse move
using it  we can track the position of the mouse i.e event.x and event.y
we then assign this positions to mouse.x and mpouse.y because this positions can
only be acccesed inside our event listener*/
ctx.font="15px Arial";
ctx.fillStyle='white';
ctx.fillText("A",0, 27);
ctx.font="10px Verdana";
ctx.fillStyle='red';
ctx.fillStyle='white';

ctx.fillText("m",0,35 );
ctx.font="10px Calibri";
ctx.fillText("s",2, 41);

ctx.fillText("c", 2,48)
ctx.fillText("h", 2,58)
ctx.fillText("e", 2,69)
ctx.fillText("L", 2,79)





const textCoordinates = ctx.getImageData(0,0,100,100);



class Particles{
    constructor(x,y){
this.x=x;
this.y=y;
this.size=5;
this.baseX=this.x;
this.baseY= this.y;
this.density= (Math.random() * 30)+1;
    }
    draw(){
        ctx.fillStyle='red';

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.closePath()
        ctx.fill()
    }


update(){
    let dx= mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance= Math.sqrt( dx* dx + dy *dy);
    let forceDirectionX= dx / distance;
   let forceDirectionY=dy / distance;
   let maxDistance=mouse.radius;
   let force=(maxDistance- distance)/maxDistance;
   let directionX= forceDirectionX *force *this.density
   let directionY=forceDirectionY *force * this.density;
    if( distance<mouse.radius){
        this.x -= directionX;
        this.y -=directionY;

    }else{
   // this.size=2;
   if( this.x !==this.baseX){
       let dex= this.x - this. baseX;
       this.x-=dex;
   }
  if(this.y!==this.baseY){
        let dy= this.y - this.baseY;
        this.y-=dy;
    }
    }
}

}
 function init(){
     particleArray=[];
     for(let y=0,y2=textCoordinates.height;y<y2;y++){
         for(let x=0, x2=textCoordinates.width;x<x2;x++){
             if(textCoordinates.data[(y *4 * textCoordinates.width)+ (x*4)+3]>128){
                 let positionX=x + adjustX
                 let positionY=y + adjustY;
                 particleArray.push(new Particles(positionX *10,positionY*10))
             }
         }
     }
    // particleArray.push( new Particles(50,200));
    // particleArray.push( new Particles(340,50));
 }
 init();
 console.log(particleArray)
 function animate(){
     ctx.clearRect(0,0, canvas.width, canvas.height);
     for( let i= 0; i< particleArray.length; i++){
         particleArray[i].draw();
         particleArray[i].update();
        
     }
     connect()
    requestAnimationFrame(animate);
 }
 animate();

 function connect(){
     let opacityValue=1 ;
     for(let a=0;a<particleArray.length;a++){
         for(let b=a;b<particleArray.length;b++){
             let dx= particleArray[a].x - particleArray[b].x;
             let dy= particleArray[a].y - particleArray[b].y;

             let distance= Math.sqrt(dx * dx + dy *dy);
             pacityValue=1- (distance/10)
                 ctx.strokeStyle='rgba(255,255,255,'+ opacityValue +')';
                 ctx.lineWidth=2;
             if(distance<10){
                 
                 ctx.lineWidth=2;
                 ctx.beginPath()
                 ctx.moveTo(particleArray[a].x,particleArray[a].y)
                 ctx.lineTo(particleArray[b].x, particleArray[b].y)
                 ctx.stroke()
                 
             }
         }
     }
 }