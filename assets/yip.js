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

function timeStepper(mili_seconds_, steps_, function_) {
    let interval = 0;
    for(let i=0; i< steps_; i++){
        interval += mili_seconds_;
        setTimeout(function_, interval);
    }    
}

const YipGetDate = new Date();
const Second = YipGetDate.getSeconds();
const Minute = YipGetDate.getMinutes();
const Hour = YipGetDate.getHours();
const Day = YipGetDate.getDate();
const Month = YipGetDate.getMonth();
const Year = YipGetDate.getFullYear();
const Century = Year < 100 ? 1 : parseInt(String(Year).slice(0,-2))+1;
const Millennium = Math.floor(parseInt(Century) / 1000);

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

function newElement(tag_){
    let tagElement = tag_.split(' ')[0].replace('<','').replace('/>','').replace('>','');

    let tagInside = tag_.split('>')[1].split('<')[0];

    let tagAttributes = tag_.match(/(?<=\<[A-Za-z]*[ ])(.*?)(?=\>)/);
    tagAttributes = String(tagAttributes) !== 'null' ? String(tagAttributes).substring(0, (String(tagAttributes).length/2) ) : null;

    let newElement_ = document.createElement(tagElement);
    newElement_.textContent = tagInside;

    if(tagAttributes === null)
        return newElement_;

    tagAttributes = tagAttributes.split(/(?<=\")([ ].*?)(?=[A-Za-z])/);

    for(let x = 0; x < tagAttributes.length; x++){
        if(tagAttributes[x].match(/^[ ]*$/))
            continue;

        let tagKey = tagAttributes[x].replaceAll('"','').replace('=','>>>').split('>>>')[0];
        let tagValue = tagAttributes[x].replaceAll('"','').replace('=','>>>').split('>>>')[1];

        if(tagKey == 'id') newElement_.id = tagValue;
        if(tagKey == 'src') newElement_.src = tagValue;
        if(tagKey == 'class') newElement_.className = tagValue;
      
        if(tagKey !== 'id' && tagKey !== 'src' && tagKey !== 'class')
            newElement_.setAttribute(tagKey, tagValue);
    }

    return newElement_;
}

Object.prototype.valueByIndex = function(index_){
    return Object.keys(this)[index_];
}

Object.prototype.keyByValue = function(value_){
    return Object.keys(this).find(key => this[key] === value_);
}