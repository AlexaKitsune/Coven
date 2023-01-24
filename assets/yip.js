function DOMready(function_){
    document.addEventListener("DOMContentLoaded", function_);
}

function element(element_){
    return document.querySelector(element_)
}

function elements(element_){ //Omit in doc.
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

const Second = ()=> new Date().getSeconds();
const Minute = ()=> new Date().getMinutes();
const Hour = ()=> new Date().getHours();
const Day = ()=> new Date().getDate();
const Month = ()=> new Date().getMonth();
const Year = ()=> new Date().getFullYear();
const Century = ()=> Year() < 100 ? 1 : parseInt(String(Year()).slice(0,-2))+1;
const Millennium = ()=> Math.floor(parseInt(Century()) / 10);

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

function withKeyTriggerFunction(element_, key_, function_){
    let input = element(element_);

    input.addEventListener("keypress", function(event){
        if (event.key === key_)
            function_();
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

class connectorLine{
    constructor(element1, element2, lineStyle_){
        this.element1 = element(element1);
        this.element2 = element(element2);
        this.lineStyle = lineStyle_;
    }

    elementsPosition(element_){
        let element1_x = this.element1.getBoundingClientRect().left + ((this.element1.getBoundingClientRect().right - this.element1.getBoundingClientRect().left)/2);
        let element1_y = this.element1.getBoundingClientRect().top + ((this.element1.getBoundingClientRect().bottom - this.element1.getBoundingClientRect().top)/2);
        let element2_x = this.element2.getBoundingClientRect().left + ((this.element2.getBoundingClientRect().right - this.element2.getBoundingClientRect().left)/2);
        let element2_y = this.element2.getBoundingClientRect().top + ((this.element2.getBoundingClientRect().bottom - this.element2.getBoundingClientRect().top)/2);

        if(element_ == 1)
            return [element1_x, element1_y];
        if(element_ == 2)
            return [element2_x, element2_y];
    }

    lineLength(){
        return Math.sqrt(
            Math.pow((this.elementsPosition(2)[0] - this.elementsPosition(1)[0] ), 2)
            +
            Math.pow((this.elementsPosition(2)[1] - this.elementsPosition(1)[1] ), 2) 
        )
    }

    lineAngle(){
        let lineTiltM = (this.elementsPosition(2)[1] - this.elementsPosition(1)[1]) / (this.elementsPosition(2)[0] - this.elementsPosition(1)[0]);
        let lineTiltAngle = Math.atan(lineTiltM);
        return lineTiltAngle;
    }

    polygonCut(polygonPercentA_, polygonPercentB_){
        let result = `polygon(${polygonPercentA_}% 0%, ${polygonPercentB_}% 0%, ${polygonPercentB_}% 100%, ${polygonPercentA_}% 100%)`;
        return result;
    }

    drawLine(polygonPercentA_, polygonPercentB_, appendInto_=false){
        DOMready(()=>{
            let line = document.createElement('hr');
            line.id = `${this.constructor.name}_${this.element1.id}_${this.element2.id}`;
            line.style.position = "absolute";
            line.style.border = "0px solid transparent";
            line.style.borderTop = this.lineStyle;
            line.style.margin = "0";
            line.style.padding = "0";
            line.style.transformOrigin = "top left";

            setTimeout(() => {
                line.style.top = `${this.elementsPosition(1)[1]}px`;
                line.style.left = `${this.elementsPosition(1)[0]}px`;
                line.style.width = `${this.lineLength()}px`;
                line.style.clipPath = this.polygonCut(polygonPercentA_, polygonPercentB_);
                line.style.transform = `rotate(${this.lineAngle()}rad)`;  
            }, 10);
            
            if(appendInto_)
                element(appendInto_).appendChild(line);
            else
                document.body.appendChild(line);

            addEventListener("resize", (event) => {
                line.style.top = `${this.elementsPosition(1)[1]}px`;
                line.style.left = `${this.elementsPosition(1)[0]}px`;
                line.style.width = `${this.lineLength()}px`;
                line.style.clipPath = this.polygonCut(polygonPercentA_, polygonPercentB_);
                line.style.transform = `rotate(${this.lineAngle()}rad)`;
                document.body.appendChild(line);
            });  
        })
    }
}

function SpanishTransliterate(num){
    if(num > 9999999999999)
        return console.error('Limit number exceded (9999999999999)');

    let unidad = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    let decena = ['cero', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    let centena = ['cero', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if(num == "unidad")
        return unidad;
    if(num == "decena")
        return decena;
    if(num == "centena")
        return centena;
    
    num = String(num).split('').reverse();
    let result = "";

    let chunkedArray = num.reduce(
        (all,one,i) => {
            const ch = Math.floor(i/3); 
            all[ch] = [].concat((all[ch]||[]),one); 
            return all;
        }, []
    )

    for(x in chunkedArray){
        chunkedArray[x] = chunkedArray[x].join('');
    }

    for(chunks of chunkedArray){
        if(chunkedArray.indexOf(chunks) == 1)
            result += "mil ";
        if(chunkedArray.indexOf(chunks) == 2)
            result += "millones ";

        for(chunk in chunks){           
            if(chunk == 0)
                result += `${unidad[chunks[chunk]]} `;
            if(chunk == 1)
                result += `y ${decena[chunks[chunk]]} `;
            if(chunk == 2)
                result += `${centena[chunks[chunk]]} `;         
        }
    }

    result = result.split(' ').reverse().join(' ');
    result = result.replaceAll('y cero', '')
                   .replaceAll('diez y uno', 'once')
                   .replaceAll('diez y dos', 'doce')
                   .replaceAll('diez y tres', 'trece')
                   .replaceAll('diez y cuatro', 'catorce')
                   .replaceAll('diez y cinco', 'quince')
                   .replaceAll('diez y ', 'dieci')
                   .replaceAll('veinte y ', 'veinti')

                   .replaceAll('ientos cero y', 'ientos')
                   .replaceAll('cien cero y', 'ciento')
                   .replaceAll('ientos cero', 'ientos')
                   .replaceAll('cien cero', 'cientocero')
                   .replaceAll('cien ', 'ciento ')
                   .replaceAll('cientocero', 'cien')

                   .replaceAll('cero ', '')
                   .replaceAll('uno millones', 'un millón')
                   .replaceAll('uno mil ', 'mil ')

                   .replaceAll('  ',' ');

    if(num.length >= 10 && num.length < 12){
        result = result.split(' ');
        result.splice(2, 0, 'mil');
        result = result.join(' ');
    }

    if(num.length == 12){
        result = result.replace('cien', 'ciento').split(' ');
        if( result[2].includes('veinti')){
            result.splice(3, 0, 'mil');
        }else{
            result.splice(5, 0, 'mil');
        }
        result = result.join(' ');
    }

    if(num.length == 13){
        result = result.replace('cien', 'ciento').split(' ');
        if( result[3].includes('veinti')){
            result.splice(4, 0, 'mil');
        }else{
            result.splice(6, 0, 'mil');
        }
        result.splice(2, 0, 'billones');
        result = result.join(' ');
    }

    result = result.replaceAll('uno mil', 'mil')
                   .replace('ciento mil', 'cien mil')
                   .replaceAll('cientoto','ciento')
                   .replace('uno billones', 'un billón');    
                   
    return result.substring(1);
}

function KanjiTransliterate(num_) {
    let result = SpanishTransliterate(num_);
    let kanji = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

    if(num_ > 99999)
        return console.error('Limit number exceded (9999)');

    for(x in SpanishTransliterate("centena")){
        if(SpanishTransliterate("centena")[x] == "cien")
            continue;
        result = result.replaceAll(SpanishTransliterate("centena")[x], kanji[x]+'百')
                       .replaceAll('ciento','一百');
    }

    for(x in SpanishTransliterate("decena")){
        result = result.replaceAll(SpanishTransliterate("decena")[x], kanji[x]+'十')
                       .replaceAll('veinti','二十');
    }

    for(x in SpanishTransliterate("unidad")){
        result = result.replaceAll(SpanishTransliterate("unidad")[x], kanji[x]);
    }

    result = result.replaceAll(' ','').replaceAll('y','');
    result = result.replaceAll('mil','千').replaceAll('一百s', '百')
                   .replaceAll('once', '十一')
                   .replaceAll('doce', '十二')
                   .replaceAll('trece', '十三')
                   .replaceAll('catorce', '十四')
                   .replaceAll('quince', '十五')
                   .replaceAll('sete', '七')
                   .replaceAll('nove', '九');

    if(String(num_).length >= 5){
        result = result.replaceAll('十千', '万');
        result = result.split('')

        if(String(num_)[1] == '1')
            result.splice(1, 0, '一');

        result = result.join('');
    }

    if(String(num_).length >= 6){
        result = result.replace('万', '')
                       .replace('百', '');
        //falla con xx0xxx.
        if(String(num_)[2] == '1'){
            result = result.replaceAll('一','').split('');
            result.splice(2, 0, '十一千');
            result = result.join('');
        }

        if(String(num_)[2] == '0'){
            //Aquí es donde falla.
        }
    }

    return result;
}

function transliterate(lang_, number_){
    if(Number.isSafeInteger(number_)){
        if(lang_ == 'Spanish')
            return SpanishTransliterate(number_);
        if(lang_ == 'Kanji')
            return KanjiTransliterate(number_);
    }else{
        number_ = String(number_).split('.');
        if(lang_ == 'Spanish')
            return SpanishTransliterate(parseInt(number_[0])) +" punto "+ SpanishTransliterate(parseInt(number_[1]));
    }
}

class circleChart{
    constructor(id_, inputType_ ,percentages_){
        this.id_ = id_;
        this.inputType_ = inputType_;
        this.percentages_ = percentages_;
    }

    createPercentages(gap_){
        let totalPercent = 0;
        let originalPercent = [];
        for(x in this.percentages_){
            totalPercent += parseFloat(Object.keys(this.percentages_[x])[0]);
            originalPercent.push(parseFloat(Object.keys(this.percentages_[x])[0]));
        }

        let percentToDeg = [];
        for(x in originalPercent)
            if(this.inputType_ == '%')
                percentToDeg.push( (360/100)*originalPercent[x] );
            else
                percentToDeg.push( (360/100)*((originalPercent[x]*100)/totalPercent) );

        if(totalPercent > 100 && this.inputType_ == '%')
            console.error(`${totalPercent}%\nPercentages sum should be <= 100%`);
        
        let currentDeg = 0;
        let result = "";
        for(let x = 0; x < percentToDeg.length; x++){
            result += `${this.percentages_[x][Object.keys(this.percentages_[x])]} ${currentDeg}deg ${percentToDeg[x]+currentDeg}deg,`
                   + `\ntransparent ${percentToDeg[x]+currentDeg}deg ${(percentToDeg[x]+currentDeg)+gap_}deg,\n`;
            currentDeg = percentToDeg[x]+currentDeg;
        }

        result = `conic-gradient(\ntransparent 0deg ${gap_}deg,\n${result}gray ${currentDeg}deg)`;
        return result;
    }

    holeChart(internalCircleSize_){
        let precision = 64;
        let radius = internalCircleSize_/2;
        let c = [...Array(precision)].map((_, i) => {
            let a = -i/(precision-1)*Math.PI*2;
            let x = Math.cos(a)*radius + 50;
            let y = Math.sin(a)*radius + 50;
            return `${x}% ${y}%`
        });

        return `polygon(100% 50%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 50%, ${c.join(',')})`;
    }

    createChart(size_, internalCircleSize_, gap_){
        let graphic = newElement(`<div id="${this.id_}"></div>`);
        graphic.setAttribute('style',`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0ch !important; 
            width: ${size_};
            height: ${size_};
            border-radius: 1000vw;
            background-color: red;
            background: ${this.createPercentages(gap_)};
            clip-path: ${this.holeChart(internalCircleSize_)}
        `);

        return graphic;
    }

    drawChart(size_, internalCircleSize_, gap_=0, appendInto_=false){
        if(appendInto_)
            element(appendInto_).appendChild(
                this.createChart(size_, internalCircleSize_, gap_)
            );
        else
            document.body.appendChild(
                this.createChart(size_, internalCircleSize_, gap_)
            );
    }

}

/* //Cause conflict with ".join()":
Object.prototype.valueByIndex = function(index_){
    return Object.keys(this)[index_];
}

Object.prototype.keyByValue = function(value_){
    return Object.keys(this).find(key => this[key] === value_);
}*/