function element(element_){
    return document.querySelector(element_)
}

function elements(element_){
    return document.querySelectorAll(element_)
}

function stylize(element_){
    return document.querySelector(element_).style
}

function rewriteCSS(element_, styles_){
    document.querySelector(element_).setAttribute('style', styles_);
}

function stackCSS(element_, styles_){
    document.querySelector(element_).setAttribute('style', styles_);
}

function noname(mili_seconds_, steps_, function_) {
    let interval = 0;
    for(let i=0; i< steps_; i++){
        interval += mili_seconds_;
        setTimeout(function_, interval);
    }    
}

let YipGetDate = new Date();
let Second = YipGetDate.getSeconds();
let Minute = YipGetDate.getMinutes();
let Hour = YipGetDate.getHours();
let Day = YipGetDate.getDate();
let Month = YipGetDate.getMonth();
let Year = YipGetDate.getFullYear();
let Century = Year < 100 ? 1 : parseInt(String(Year).slice(0,-2))+1;
let Millennium = Math.floor(parseInt(Century) / 1000);

function clicked(element_, function_){
    element(element_).onclick = function_;
}

function withEnterTriggerClick(element_, button_){
    let input = element(element_);

    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        element(button_).click();
      }
    }); 
}

function withKeyTriggerFunction(element_, key_, function_, ...functionArgs_){
    let input = element(element_);

    input.addEventListener("keypress", function(event){
        if (event.key === key_) {
            function_(...functionArgs_);
        }
    }); 
}