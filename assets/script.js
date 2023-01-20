function resolveLink(){
    if(window.location.href.includes('/resources/')){
        return '../';
    }else
    if(window.location.href.includes('/articles/')){
        return '../';
    }else{
        return './';
    }
}

function COVEN_ASIDE_CONTENT(recursos_, articulos_){
    return `
    <p>El Aquelarre</p>
    <div class="SideMenu-Pentagram">
        <a href="${resolveLink()}index.html">
        <span id="container-pentagram">
            <div class="symbol-external-circle">
                <div class="symbol-internal-circle"></div>
                <div class="symbol-internal-circle-2"></div>
                <div class="symbol-internal-circle-3"></div>
                <div class="symbol-internal-circle-4"></div>
                <div id="symbol-pentagon">
                    <div class="pentagon-side1"></div>
                    <div class="pentagon-side2"></div>
                    <div class="pentagon-side3"></div>
                    <div class="pentagon-side4"></div>
                    <div class="pentagon-side5"></div>
                </div>
                <div id="symbol-star">
                    <div class="star-side1"></div>
                    <div class="star-side2"></div>
                    <div class="star-side3"></div>
                    <div class="star-side4"></div>
                    <div class="star-side5"></div>
                </div>
                <div id="symbol-imgs">
                    <div class="imgs-1"> <img class="inactive-img" src="${resolveLink()}assets/animal_pillars/orange_silhouette_cat.png"><img class="active-img" src="${resolveLink()}assets/animal_pillars/00fff0_silhouette_cat.png"> </div>
                    <div class="imgs-2"> <img class="inactive-img" src="${resolveLink()}assets/animal_pillars/orange_silhouette_fox.png"><img class="active-img" src="${resolveLink()}assets/animal_pillars/00fff0_silhouette_fox.png"> </div>
                    <div class="imgs-3"> <img class="inactive-img" src="${resolveLink()}assets/animal_pillars/orange_silhouette_doe.png"><img class="active-img" src="${resolveLink()}assets/animal_pillars/00fff0_silhouette_doe.png"> </div>
                    <div class="imgs-4"> <img class="inactive-img" src="${resolveLink()}assets/animal_pillars/orange_silhouette_cow.png"><img class="active-img" src="${resolveLink()}assets/animal_pillars/00fff0_silhouette_cow.png"> </div>
                    <div class="imgs-5"> <img class="inactive-img" src="${resolveLink()}assets/animal_pillars/orange_silhouette_hyn.png"><img class="active-img" src="${resolveLink()}assets/animal_pillars/00fff0_silhouette_hyn.png"> </div>
                </div>
                <div id="symbol-shapes">
                    <div class="symbol-shape1"><div class="symbol-shape_"></div></div>
                    <div class="symbol-shape2"><div class="symbol-shape_"></div></div>
                    <div class="symbol-shape3"><div class="symbol-shape_"></div></div>
                    <div class="symbol-shape4"><div class="symbol-shape_"></div></div>
                    <div class="symbol-shape5"><div class="symbol-shape_"></div></div>
                </div>
            </div>
        </span>
        </a>
    </div>

    <hr>

    <ul>
        <li><a href="${resolveLink()}index.html">Página principal</a></li>
        <li><a href="${resolveLink()}recursos.html">Recursos</a></li>
            <ul>
            ${recursos_}
            </ul>
        <li><a href="${resolveLink()}articulos.html">Artículos</a></li>
            <ul>
            ${articulos_}
            </ul>
        <li><a href="${resolveLink()}about.html">About</a></li>
            <ul>
                <li><a href="${resolveLink()}about.html#about-target-cat">cat</a></li>
                <li><a href="${resolveLink()}about.html#about-target-hyn">hyn</a></li>
                <li><a href="${resolveLink()}about.html#about-target-cow">cow</a></li>
                <li><a href="${resolveLink()}about.html#about-target-doe">doe</a></li>
                <li><a href="${resolveLink()}about.html#about-target-fox">fox</a></li>
            </ul>
    </ul>

    <div id="coven-close-aside" onclick="showAside(true)"></div>`;
}

function COVEN_NAV_CONTENT(){
    return `
    <button id="Aquelarre-Show-Aside" onclick="showAside(false)">Ξ</button>
    <p id="Aquelarre-Nav-Title">${element('title').innerHTML}</p>
    <div>
        <p id="Aquelarre-Sun-Moon-Switch" onclick="switchLightDark()">🌙</p>
        <input type="text">
        <button>🔎</button>
    </div>`;
}

//Routing:
const ARTICLES = {
    "Artículo 1" : "0__articulo1.html"
};

const RESOURCES = {
    "Pentagrama con HTML y CSS" : "1__Pentagrama_con_HTML_y_CSS.html",
    "Editor JS en línea" : "2__Editor_JS_en_linea.html",
    "Yip.js" : "3__Yip.js.html"
};

function routing(articles_or_resources_, dictionary_){
    var linkList = "";
    for(var x = 0; x < Object.keys(dictionary_).length; x++){
        linkList +=`<li>
                        <a href="${resolveLink()}${articles_or_resources_}/${dictionary_[Object.keys(dictionary_)[x]]}">
                            ${Object.keys(dictionary_)[x]}
                        </a>
                    </li>`;
    }
    return linkList;
}

//Setting titles:
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

let nameSite = window.location.href.split('.html')[0];
nameSite = nameSite.split('/');
nameSite = nameSite[nameSite.length-1]+".html";

if(window.location.href.includes('/resources/')){
    nameSite = getKeyByValue(RESOURCES,nameSite);
    element('title').innerHTML = nameSite;
}
if(window.location.href.includes('/articles/')){
    nameSite = getKeyByValue(ARTICLES,nameSite);
    element('title').innerHTML = nameSite;
}
  

console.log(getKeyByValue(ARTICLES,nameSite));

//add style tag:
let styleTag = document.createElement('link');
styleTag.href = `${resolveLink()}assets/style.css`;
styleTag.type = "text/css";
styleTag.rel = "stylesheet";
styleTag.media = "screen,print";
document.getElementsByTagName("head")[0].appendChild(styleTag);

//add coven aside:
let covenAside = document.createElement('aside');
covenAside.id = "coven-aside";
covenAside.innerHTML = COVEN_ASIDE_CONTENT(
        routing("resources", RESOURCES),
        routing("articles", ARTICLES)
    );
document.getElementsByTagName("body")[0].prepend(covenAside);

//add coven nav:
let covenNav = document.createElement('nav');
covenNav.id = "coven-nav";
covenNav.innerHTML = COVEN_NAV_CONTENT();
document.getElementsByTagName("body")[0].prepend(covenNav);

//Switch light and dark mode:
let illuminationMode = 'light';

function switchLightDark(){
    if(illuminationMode == "light"){
        illuminationMode = "dark";
        element('#Aquelarre-Sun-Moon-Switch').innerHTML = "☀️";
        //aside:
        stylize('#coven-aside').backgroundColor = "rgb(14, 23, 41)";
        stylize('#coven-aside').color = "white";
        //article:
        stylize('.coven-article').backgroundColor = "rgb(27, 36, 54)";
        stylize('.coven-article').color = "white";
    }else
    if(illuminationMode == "dark"){
        illuminationMode = "light";
        element('#Aquelarre-Sun-Moon-Switch').innerHTML = "🌙";
        //aside:
        stylize('#coven-aside').backgroundColor = "rgb(240, 240, 240)";
        stylize('#coven-aside').color = "black";
        //article:
        stylize('.coven-article').backgroundColor = "rgb(255, 255, 255)";
        stylize('.coven-article').color = "black";
    }
}

switchLightDark();

//show and close aside in mobile version:
function showAside(asideVisible){
    if(asideVisible == false){
        stylize('#coven-aside').display = "flex";
        setTimeout(() => {
            stylize('#coven-aside').marginLeft = "0vw" 
        }, 1);
        return;
    }
    if(asideVisible == true){
        stylize('#coven-aside').marginLeft = "-75vw";
        setTimeout(() => {
            stylize('#coven-aside').display = "none";
        }, 300);
        return;
    }
}

var mediaQueryList = window.matchMedia("(max-width: 666px)");
if (mediaQueryList.matches) {
    setTimeout(() => {
        showAside(true);
    }, 300);
}

//Add CodeMirror tags:
let CodeMirrorTag = document.createElement('link');
CodeMirrorTag.href = `${resolveLink()}assets/codemirror/lib/codemirror.css`;
CodeMirrorTag.rel = "stylesheet";
CodeMirrorTag.type = "text/css";
document.getElementsByTagName("head")[0].prepend(CodeMirrorTag);

let CodeMirrorDracula = document.createElement('link');
CodeMirrorDracula.href = `${resolveLink()}assets/codemirror/theme/dracula.css`;
CodeMirrorDracula.rel = "stylesheet";
CodeMirrorDracula.type = "text/css";
document.getElementsByTagName("head")[0].prepend(CodeMirrorDracula);

//Configuration of CodeMirror:
function setCodeMirror(element_, editable_, language_){

    var content = document.getElementById(element_).innerHTML;
    document.getElementById(element_).innerHTML = "";
    content = content.replaceAll('&gt;','>').replaceAll('&lt;','<');
    var readOnly_;

    if(editable_){
        readOnly_ = false;
    }else{
        readOnly_ = true;
    }

    var element_ = CodeMirror(document.getElementById(element_), {
        mode:  language_,
        value: content,
        theme:"dracula",
        matchBrackets:true,
        autoCloseBrackets: true,
        lineNumbers: true,
        readOnly: readOnly_,
        firstLineNumber: 0,
        viewportMargin: Infinity
    });

}

class setEditorCodeMirror{

    constructor(element_){
        this.element_ = element_;
        this.content_ = document.getElementById(element_).value;
        this.editor;
    }

    setEditor(){
        this.editor = CodeMirror.fromTextArea(document.getElementById(this.element_), {
            mode: 'javascript',
            value: this.content_,
            theme:"dracula",
            matchBrackets:true,
            autoCloseBrackets: true,
            lineNumbers: true,
            readOnly: false,
            firstLineNumber: 1,
            viewportMargin: Infinity
        });
    }

    getCode(){
        return this.editor.getValue();
    }

}

//Creating Facebook section comments: (only works in a server).
function setFacebookComments(section_){

    var identifier_fb_comments = window.location.href.split('.html')[0];
    identifier_fb_comments = section_ + identifier_fb_comments.split(section_)[1] + ".html";
    //identifier_fb_comments returns something like "articles/3__Alexa.js.html"; which is for identify a facebook comment section.
    
    let FacebookCommentsSectionMAIN = document.createElement('section');
    FacebookCommentsSectionMAIN.id = "Facebook-comments-section-MAIN";
    element('.coven-article').appendChild(FacebookCommentsSectionMAIN);

    let FacebookCommentsHR = document.createElement('hr');
    FacebookCommentsHR.id = "hr-Facebook-comments-section";
    element('#Facebook-comments-section-MAIN').appendChild(FacebookCommentsHR);

    let FacebookCommentsH1 = document.createElement('h2');
    FacebookCommentsH1.innerHTML = "Comentarios";
    element('#Facebook-comments-section-MAIN').appendChild(FacebookCommentsH1);

    let FacebookComments_async_defer = document.createElement('script');
    FacebookComments_async_defer.setAttribute('async', '');
    FacebookComments_async_defer.setAttribute('defer', '');
    FacebookComments_async_defer.crossOrigin = "anonymous";
    FacebookComments_async_defer.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v14.0&appId=5156629667708436&autoLogAppEvents=1";
    FacebookComments_async_defer.nonce = "gutb20tg";
    element('#Facebook-comments-section-MAIN').appendChild(FacebookComments_async_defer);

    let FacebookCommentsSection = document.createElement('section');
    FacebookCommentsSection.id = "Facebook-comments-section";
    element('#Facebook-comments-section-MAIN').appendChild(FacebookCommentsSection);

    let FacebookComments_fb_root = document.createElement('div');
    FacebookComments_fb_root.id = "fb-root";
    element('#Facebook-comments-section').appendChild(FacebookComments_fb_root);

    let FacebookComments_async_defer_2 = document.createElement('script');
    FacebookComments_async_defer_2.setAttribute('async', '');
    FacebookComments_async_defer_2.setAttribute('defer', '');
    FacebookComments_async_defer_2.crossOrigin = "anonymous";
    FacebookComments_async_defer_2.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v14.0&appId=5156629667708436&autoLogAppEvents=1";
    FacebookComments_async_defer_2.nonce = "Us2Q4nxK";
    element('#Facebook-comments-section').appendChild(FacebookComments_async_defer_2);

    let FacebookComments_div = document.createElement('div');
    FacebookComments_div.className = "fb-comments";
    FacebookComments_div.setAttribute('data-href', `https://github.com/AlexaKitsune/#Aquelarre_/${identifier_fb_comments}`);
    FacebookComments_div.setAttribute('data-width', '100%');
    FacebookComments_div.setAttribute('data-numposts', '5');
    FacebookComments_div.setAttribute('data-colorscheme', 'dark');
    element('#Facebook-comments-section').appendChild(FacebookComments_div);
}

if(window.location.href.includes('/resources/')){
    setFacebookComments('resources');
}
if(window.location.href.includes('/articles/')){
    setFacebookComments('articles');
}