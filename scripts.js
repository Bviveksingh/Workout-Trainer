
    var workSeconds,
        workMinutes,
        restSeconds,
        restMinutes,
        initialwait, 
        count = 0,
        roundsCount = 1,
        timerVariables,
        pseudoTimerVariables,
        isPaused = false,
        goBackFlag = false,
        totalRounds,
        intervalCycle,
        tickSound,
        finishSound;
         
        tickSound = new Sound("Resources/Sounds/tick.mp3");
        finishSound = new Sound("Resources/Sounds/finish.mp3");               
 
function setTimer(){

    workSeconds =  document.getElementById("second-input").value;
    workMinutes =  document.getElementById("minute-input").value;
    totalRounds =  document.getElementById("round-input").value;
    restSeconds =  document.getElementById("rsecond-input").value;
    restMinutes =  document.getElementById("rminute-input").value;
    initialwait =  document.getElementById("wait-input").value;
    clearThings();
    settingThings();
        
}







// function startTimer(x,y)s{
    
//     intervalCycle = setInterval(()=>{
        
//         if(x == 0){
//             x = 59;
//             y = y-1;
//             tickSound.play();
//             document.getElementById("seconds").innerHTML = x < 10 ? "0" + x : x; 
//             document.getElementById("minutes").innerHTML = y < 10 ? "0" + y : y;
            
//         }
        
//         else{
//             tickSound.play();
//             x = x - 1;
//             document.getElementById("seconds").innerHTML = x < 10 ? "0" + x : x;
            
//         }
//         if(x == 0 && y == 0){

//             if(roundsCount == totalRounds){
//                 document.getElementById("seconds").innerHTML = "00";
//                 document.getElementById("minutes").innerHTML = "00";
//                 clearInterval(intervalCycle);
//                 tickSound.stop();
//                 finishSound.play();
//                 return;
                
//             }
//             else{
//                 clearInterval(intervalCycle);
//                 switched(count);
//                 tickSound.stop();
//                 finishSound.play();
//                 count++;
//             }

//             if(count % 2 == 0){
//                 roundsCount++;
//                 document.getElementById("rounds-container").innerHTML = roundsCount + " / " + totalRounds;
//             }
            
//         }

// },1000);

// }




// function startTimer(){
    
//     if(!isPaused){
//         if(count == 0 || count % 2 == 0){
//             timerVariables = {
//                 x : workSeconds,
//                 y : workMinutes
//             }
//         }
//         else{
//             timerVariables = {
//                 x : restSeconds,
//                 y : restMinutes
//             }
//         }
//     }

//     else{
//         timerVariables = {
//             x : pseudoTimerVariables.x,
//             y : pseudoTimerVariables.y
//         }
//         isPaused = false;
//     }

    

    
    
//     intervalCycle = setInterval(timerFunction.bind(timerVariables) ,1000);
    

// }   
        

function startTimer(){
    
    if(!isPaused){
        if(count == 0){
            timerVariables = {
                x : initialwait,
                y : 0
            }
        }  
         
        
        if(count > 0  && count % 2 == 0){
            timerVariables = {
                x : workSeconds,
                y : workMinutes
            }
              
        }

        else{
            timerVariables = {
                x : restSeconds,
                y : restMinutes
            }
        }
    }

    else{
        timerVariables = {
            x : pseudoTimerVariables.x,
            y : pseudoTimerVariables.y
        }
        isPaused = false;
    }

    

    
    
    intervalCycle = setInterval(timerFunction.bind(timerVariables) ,1000);
    

}   


        
function timerFunction(){

        
        if(this.x == 0){
            this.x = 59;
            this.y = this.y-1;
            tickSound.play();
            document.getElementById("seconds").innerHTML = this.x < 10 ? "0" + this.x : this.x; 
            document.getElementById("minutes").innerHTML = this.y < 10 ? "0" + this.y : this.y;
            
        }
        
        else{
            tickSound.play();
            this.x = this.x - 1;
            document.getElementById("seconds").innerHTML = this.x < 10 ? "0" + this.x : this.x;
            
        }
        if(this.x == 0 && this.y == 0){

            if(roundsCount == totalRounds){
                document.getElementById("seconds").innerHTML = "00";
                document.getElementById("minutes").innerHTML = "00";
                clearInterval(intervalCycle);
                tickSound.stop();
                finishSound.play();
                return;
                
            }
            else{
                clearInterval(intervalCycle);
                tickSound.stop();
                finishSound.play();
                count++;
                startTimer();
            }

            if(count % 2 == 0){
                roundsCount++;
                document.getElementById("rounds-container").innerHTML = roundsCount + " / " + totalRounds;
            }
            
        }


    }







function pauseTimer(){
    tickSound.stop();
    isPaused = true;
    pseudoTimerVariables = {
        x : timerVariables.x,
        y : timerVariables.y
    };
    clearInterval(intervalCycle);
    
}

function stopTimer(){
    tickSound.stop();
    clearInterval(intervalCycle);
    document.getElementById("seconds").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    
}







function settingThings(){
    
    //----------------------------CREATING ELEMENTS FOR THE TIMER:----------------------------//
    

    //----------------------------PARENT ELEMENT OF TIMER:------------------------------------//

    let parent = document.createElement("DIV");
    parent.className = "timer-container";
    parent.id = "timer-id";
    document.body.appendChild(parent);


    //----------------------------PARENT ELEMENT OF BUTTONS:-----------------------------------//

    let buttonParent = document.createElement("DIV");
    buttonParent.className = "buttons-container";
    parent.appendChild(buttonParent);


    //----------------------------CHILD ELEMENTS OF TIMER BELOW-------------------------------//

    let roundsNode = document.createElement("DIV");
    roundsNode.id = "rounds-container";
    let roundsChildNode = document.createTextNode(roundsCount + "/" + totalRounds);
    roundsNode.appendChild(roundsChildNode);
    



    let minuteNode = document.createElement("SPAN");
    minuteNode.className = "timer";
    minuteNode.id = "minutes";
    let minuteChildNode = workMinutes < 10 ? document.createTextNode("0" + workMinutes) : document.createTextNode(workMinutes);
    minuteNode.appendChild(minuteChildNode);
    

    let colon = document.createElement("SPAN");
    colon.className = "colon";
    let colonText = document.createTextNode(":");
    colon.appendChild(colonText);

       
    let secondNode = document.createElement("SPAN");
    secondNode.className = "timer";
    secondNode.id = "seconds";
    let secondChildNode = workSeconds < 10 ? document.createTextNode("0" + workSeconds) : document.createTextNode(workSeconds);
    secondNode.appendChild(secondChildNode);

    //---------------------------------BUTTON ELEMENTS BELOW:------------------------------//


    //----------------------------BACK BUTTON----------------------------------------------//
    var backButton = document.createElement("DIV");
    backButton.id = "back";
    document.body.appendChild(backButton);


    //-------------------------------PLAY BUTTON------------------------------------------//

    var playButton = document.createElement("DIV");
    playButton.id = "play";
    
    //-------------------------------PAUSE BUTTON-----------------------------------------//

    var pauseButton = document.createElement("DIV");
    pauseButton.id = "pause";

    //-------------------------------STOP BUTTON-----------------------------------------//

    var stopButton = document.createElement("DIV");
    stopButton.id = "stop";



    //----------------------------- EVENTS OF BUTTONS------------------------------------//

    playButton.addEventListener("click", startTimer);
    pauseButton.addEventListener("click", pauseTimer);
    stopButton.addEventListener("click", stopTimer);
    backButton.addEventListener("click", goBackAlert);

    // -------------------------- ENDING OF CHILD ELEMENTS-------------------------//
    
    
    //-------------------APPENDING CHILD ELEMENTS TO PARENT ELEMENTS:--------------------//
    parent.insertBefore(roundsNode, buttonParent);
    parent.insertBefore(minuteNode, buttonParent);
    parent.insertBefore(colon, buttonParent);
    parent.insertBefore(secondNode, buttonParent);

    buttonParent.appendChild(playButton);
    buttonParent.appendChild(pauseButton);
    buttonParent.appendChild(stopButton);

}

function clearThings(){
     let formContainer = document.getElementById("main-container");
    // document.body.removeChild(formContainer);
    formContainer.style.display = "none";
}


function goBackAlert(){
    
    let alertBox = document.createElement("DIV");
    alertBox.id = "goback-alert";
    let alertMessage = document.createElement("DIV");
    alertMessage.id = "goback-message-container";
    let alertTextNode = document.createTextNode("Timer will be reset.");
    alertMessage.appendChild(alertTextNode);
    let linebreak = document.createElement("br");
    alertMessage.appendChild(linebreak);
    let alertTextNode2 = document.createTextNode("Are you sure you want to go back?");
    alertMessage.appendChild(alertTextNode2);

    let yesButton = document.createElement("button");
    yesButton.className = "alert-buttons";
    let buttonText = document.createTextNode("YES");
    yesButton.appendChild(buttonText);
    let noButton = document.createElement("BUTTON");
    let buttonText2 = document.createTextNode("NO");
    noButton.appendChild(buttonText2);
    noButton.className = "alert-buttons";
    
    

    
    document.body.appendChild(alertBox);
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(yesButton);
    alertBox.appendChild(noButton);
    

    yesButton.addEventListener("click", function(){goBackFlag = true; goBack()});
    noButton.addEventListener("click", function(){goBack()});
    
    
}


function goBack(){

    let removeAlert = document.getElementById("goback-alert");
    document.body.removeChild(removeAlert);
    tickSound.stop();
    
    
    if(goBackFlag){
    
            let removeButton = document.getElementById("back");
            document.body.removeChild(removeButton);
       
           let formContainer = document.getElementById("main-container");
           formContainer.style.display = "block";
       
            let timerContainer = document.getElementById("timer-id");
            document.body.removeChild(timerContainer);
            roundsCount = 1;

            goBackFlag = false;
    }

}




//-----------------------------------SOUND OBJECT CONSTRUCTOR---------------------------------------//

function Sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}



