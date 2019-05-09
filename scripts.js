
    var workSeconds,
    workMinutes,
    restSeconds,
    restMinutes,
    initialWait, 
    count = 0,
    roundsCount = 1,
    timerVariables,
    pseudoTimerVariables,
    isPaused = false,
    goBackFlag = false,
    stopFlag = false,
    totalRounds,
    intervalCycle;
    startSound = new Sound("Resources/Sounds/start.mp3");
    finishSound = new Sound("Resources/Sounds/finish.mp3");               

function setTimer(){

    workSeconds =  document.getElementById("second-input").value;
    workMinutes =  document.getElementById("minute-input").value;
    totalRounds =  document.getElementById("round-input").value;
    restSeconds =  document.getElementById("rsecond-input").value;
    restMinutes =  document.getElementById("rminute-input").value;
    initialWait =  document.getElementById("wait-input").value;
    clearThings();
    settingThings();
    
}






    

function startTimer(){

if(!isPaused){
    if(initialWait && initialWait > 0){
        if(count === 0){
            timerVariables = {
                x : initialWait,
                y : 0
            }
            document.getElementById("heading-container").innerHTML = "INITIAL WAIT";
        }  
         
        
        else if(count > 0  && count % 2 !== 0){
            timerVariables = {
                x : workSeconds,
                y : workMinutes
            }
            document.getElementById("heading-container").innerHTML = "WORKOUT";

        }

        else{
            timerVariables = {
                x : restSeconds,
                y : restMinutes
            }
            document.getElementById("heading-container").innerHTML = "REST";

        }
    }

    else{
        if(count === 0 || count % 2 == 0){
            timerVariables = {
                x : workSeconds,
                y : workMinutes
            }
            document.getElementById("heading-container").innerHTML = "WORKOUT";

        }
        else{
            timerVariables = {
                x : restSeconds,
                y : restMinutes
            }
            document.getElementById("heading-container").innerHTML = "REST";

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
        this.y = this.y - 1;
        document.getElementById("seconds").innerHTML = this.x < 10 ? "0" + this.x : this.x; 
        document.getElementById("minutes").innerHTML = this.y < 10 ? "0" + this.y : this.y;
        
    }
    
    else{
        
        this.x = this.x - 1;
        document.getElementById("seconds").innerHTML = this.x < 10 ? "0" + this.x : this.x;
        document.getElementById("minutes").innerHTML = this.y < 10 ? "0" + this.y : this.y;
    }
    if(this.x == 0 && this.y == 0){
        if(totalRounds && totalRounds > 0){
            if(roundsCount == totalRounds){
                document.getElementById("seconds").innerHTML = "00";
                document.getElementById("minutes").innerHTML = "00";
                clearInterval(intervalCycle);
                finishSound.play();
                return;
                
            }
            else{
                clearInterval(intervalCycle);
                finishSound.play();
                count++;
                startTimer();
            }
            
                if(initialWait &&  initialWait > 0){
                    if(count > 1 && count % 2 !== 0){
                        roundsCount++;
                        document.getElementById("rounds-container").innerHTML = roundsCount + " / " + totalRounds;
                            
                    }
                }
                else{
                    if(count > 0 && count % 2 == 0){
                        roundsCount++;
                        document.getElementById("rounds-container").innerHTML = roundsCount + " / " + totalRounds;
                    }
                }
        }
        else {
            clearInterval(intervalCycle);
            count++; 
            startTimer();
        }

        
    }


}


function pauseTimer(){
    isPaused = true;
    pseudoTimerVariables = {
        x : timerVariables.x,
        y : timerVariables.y
    };
    clearInterval(intervalCycle);

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
    let roundsChildNode;
    if(totalRounds && totalRounds > 0){
        roundsChildNode = document.createTextNode(roundsCount + "/" + totalRounds);
    }
    else{
        roundsChildNode = document.createTextNode("INFINITE ROUNDS");
    }

    roundsNode.appendChild(roundsChildNode);

    let headingNode = document.createElement("DIV");
    headingNode.id = "heading-container";
    let headingChildNode;
    if(initialWait && initialWait > 0){
        headingChildNode = document.createTextNode("INITIAL WAIT");
    }
    else{
        headingChildNode = document.createTextNode("WORKOUT");
    }
    headingNode.appendChild(headingChildNode);




    let minuteNode = document.createElement("SPAN");
    minuteNode.className = "timer";
    minuteNode.id = "minutes";
    let minuteChildNode;
    if(initialWait && initialWait > 0){
        minuteChildNode = document.createTextNode("00");
    }
    else{
        minuteChildNode = workMinutes < 10 ? document.createTextNode("0" + workMinutes) : document.createTextNode(workMinutes);
    }
    minuteNode.appendChild(minuteChildNode);


    let colon = document.createElement("SPAN");
    colon.className = "colon";
    let colonText = document.createTextNode(":");
    colon.appendChild(colonText);

    
    let secondNode = document.createElement("SPAN");
    secondNode.className = "timer";
    secondNode.id = "seconds";
    let secondChildNode;
    if(initialWait && initialWait > 0){
        secondChildNode = initialWait < 10 ? document.createTextNode("0" + initialWait) : document.createTextNode(initialWait);
    }
    else{
        secondChildNode = workSeconds < 10 ? document.createTextNode("0" + workSeconds) : document.createTextNode(workSeconds);
    }

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

    playButton.addEventListener("click", function(){startTimer(); startSound.play()});
    pauseButton.addEventListener("click", pauseTimer);
    stopButton.addEventListener("click", function(){stopFlag = true;alertBox(); });
    backButton.addEventListener("click", alertBox);

// -------------------------- ENDING OF CHILD ELEMENTS-------------------------//


//-------------------APPENDING CHILD ELEMENTS TO PARENT ELEMENTS:--------------------//
    parent.insertBefore(roundsNode, buttonParent);
    parent.insertBefore(headingNode, buttonParent);
    parent.insertBefore(minuteNode, buttonParent);
    parent.insertBefore(colon, buttonParent);
    parent.insertBefore(secondNode, buttonParent);

    buttonParent.appendChild(playButton);
    buttonParent.appendChild(pauseButton);
    buttonParent.appendChild(stopButton);

}

function clearThings(){
    let formContainer = document.getElementById("main-container");
    formContainer.style.display = "none";
}



function alertBox(){

    let alertBox = document.createElement("DIV");
    alertBox.id = "alert-box";
    let alertMessage = document.createElement("DIV");
    alertMessage.id = "alert-message-container";
    let alertTextNode = document.createTextNode("Timer will be reset.");
    alertMessage.appendChild(alertTextNode);
    let linebreak = document.createElement("br");
    alertMessage.appendChild(linebreak);
    let alertTextNode2;
    if(stopFlag){
        alertTextNode2 = document.createTextNode("Are you sure you want to quit?");
        
    }
    else {
        alertTextNode2 = document.createTextNode("Are you sure you want to go back?");
    }
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

    
    yesButton.addEventListener("click", function(){goBackFlag = true; stopFlag = false; goBack();});
    noButton.addEventListener("click", function(){stopFlag = false;goBack();});

}


function goBack(){

    let removeAlert = document.getElementById("alert-box");
    document.body.removeChild(removeAlert);



if(goBackFlag){
        clearInterval(intervalCycle);
        let removeButton = document.getElementById("back");
        document.body.removeChild(removeButton);
        
   
       let formContainer = document.getElementById("main-container");
       formContainer.style.display = "block";
       
   
        let timerContainer = document.getElementById("timer-id");
        document.body.removeChild(timerContainer);
        roundsCount = 1;
    
       goBackFlag = false;

       workSeconds = 0;
       workMinutes = 0;
       restMinutes = 0;
       restSeconds = 0;
       initialWait = 0;
       totalRounds = 0;
       count = 0;
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




