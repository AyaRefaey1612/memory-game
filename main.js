// sart game
let array=[];
let pic=[];
document.querySelector(".start span").onclick=function(){
    yourName=window.prompt("")
   if(yourName==null || yourName==""){
    document.querySelector(".info-container .name span").innerHTML="Unknown";
   }else{
    document.querySelector(".info-container .name span").innerHTML=yourName;
       
   }
   document.querySelector(".start").remove();
   flippingAtTheStart();
   setInterval(gameTime , 15000);
};
let duration=1000;
let blocksContainer=document.querySelector(".faces");

// generate
// pic.push("fa-sharp fa-solid fa-gem" , "fa-sharp fa-solid fa-gem" , "fa-solid fa-square-full" ,"fa-solid fa-square-full",
// "fa-solid fa-dice-d20","fa-solid fa-dice-d20" );
for(let g=0 ; g< pic.length ;g++){
let faceContainer=document.createElement("div");
faceContainer.className="faces-container";
let front=document.createElement("div");
front.className="front face";
let back=document.createElement("div");
back.className="back face";
let i=document.createElement("i");
i.className=pic[g];
let atrr=document.createAttribute("data-id")
atrr.value=pic[g];
faceContainer.setAttributeNode(atrr);
blocksContainer.appendChild(faceContainer);
faceContainer.appendChild(front);
faceContainer.appendChild(back);
back.appendChild(i);
 }

let blocks=Array.from(blocksContainer.children);
let blockRange=[...Array(blocks.length).keys()];
let timer=document.querySelector(".timer span");
let score=document.querySelector(".score span");
let finallyScore=document.querySelector("div p");
// win
// console.log(blocks.length/2)
function check(){
if(parseInt(score.innerHTML) === (blocks.length/2)){
    document.querySelector(".win").style.display="block";
    blocksContainer.style.pointerEvents= "none"
    setTimeout(() => {
        inforamtion(document.querySelector(".info-container .name span").innerHTML ,  document.querySelector(".wrong-tries span").innerHTML , document.querySelector(".score span").innerHTML);
    setTimeout(() =>{
        location.reload();
 },8000)
  }, 3000);
}
};
// make the timer 
function gameTime(){  
    console.log( parseInt(timer.innerHTML))
      timer.innerHTML= parseInt(timer.innerHTML)+1 ;
     if((parseInt(timer.innerHTML) === 6)){
         document.querySelector(".over").style.display="block"; 
         blocksContainer.classList.add("no-flip");
          finallyScore.innerHTML=parseInt(finallyScore.innerHTML)+parseInt(score.innerHTML);
         setTimeout(() => {
            inforamtion(document.querySelector(".info-container .name span").innerHTML ,  document.querySelector(".wrong-tries span").innerHTML , document.querySelector(".score span").innerHTML);
            setTimeout(() =>{
                   location.reload();
            },8000)
            
         }, 3000);
     }
    }

    // flipping at the start
    function flippingAtTheStart(){
        blocks.forEach(block => {
            block.classList.add("is-flipped");
            setTimeout(() => {
                block.classList.remove("is-flipped");  
            }, 3000);
        });
    }
// make a shuffle
shuffle(blockRange);
blocks.forEach((block , index) => {
    block.style.order=blockRange[index];
    block.addEventListener("click",function(){
        flipped(block)
    })
});
function shuffle(array){
    // setting vars
    let current=array.length;
    let tem;
    while(current>0){
     let random=Math.floor(Math.random()*current)
     current--;
     tem=array[current];
     array[current]=array[random];
     array[random]=tem
    }
     return array;
};
// make the elemnts flipping
function flipped(blockSelected){
    blockSelected.classList.add("is-flipped")

let filterFlipped=blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
if(filterFlipped.length === 2 ){
//   Stop Clicking function
stopClicking()
//   get the match
match(filterFlipped[0] , filterFlipped[1])
}}
//   get the match
function match(one,two){
    let wrongTries=document.querySelector(".wrong-tries span")
    if(one.dataset.id === two.dataset.id){
        one.classList.remove("is-flipped");
        two.classList.remove("is-flipped");

        one.classList.add("is-match");
        two.classList.add("is-match");
        
        document.getElementById("Success").play();
        score.innerHTML=parseInt(score.innerHTML)+1 
        check();
    }else{
        wrongTries.innerHTML=parseInt(wrongTries.innerHTML)+1;
        setTimeout(() => {
          one.classList.remove("is-flipped");
          two.classList.remove("is-flipped");
          document.getElementById("fail").play();
        },duration)
    }
}
//   Stop Clicking function
function stopClicking(){
blocksContainer.classList.add("no-flip");
setTimeout(() => {
    blocksContainer.classList.remove("no-flip");
}, duration);
}

// information in localStorage
if(window.localStorage.getItem("player1")){
    function inforamtion(namee , tries , score){
        const info={
           name:namee,
           Tires:tries,
           score:score,
        }
         
        array.push(info);   
        window.localStorage.setItem("player2" , JSON.stringify(array));
    }
    if(window.localStorage.getItem("player2")){
        function inforamtion(namee , tries , score){
            const info={
               name:namee,
               Tires:tries,
               score:score,
            }
        
            array.push(info);
            window.localStorage.setItem("player1" , JSON.stringify(array));
            window.localStorage.removeItem("player2")
        }
    }
    
}
let gamer1=Object.assign(JSON.parse(window.localStorage.getItem("player1")));
document.querySelector(".leader .gamer1 .name").innerHTML=`${gamer1[0].name}`
document.querySelector(".leader .gamer1 .tries").innerHTML=`${gamer1[0].Tires}`
document.querySelector(".leader .gamer1 .score").innerHTML=`${gamer1[0].score}`
let gamer2=Object.assign(JSON.parse(window.localStorage.getItem("player2")));
document.querySelector(".leader .gamer2 .name").innerHTML=`${gamer2[0].name}`
document.querySelector(".leader .gamer2 .tries").innerHTML=`${gamer2[0].Tires}`
document.querySelector(".leader .gamer2 .score").innerHTML=`${gamer2[0].score}`

