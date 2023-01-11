//Configuration of CodeMirror:
function setCodeMirror(element_, editable_, language_){

    var content = document.getElementById(element_).innerHTML;
    document.getElementById(element_).innerHTML = "";
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
            matchBrackets: true,
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