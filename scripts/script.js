const TypeWriter = function(txtElement, words, wait = 10) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt='';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function(){
    //Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    console.log(fullTxt)
    //Check if deleting
    if(this.isDeleting){
        //remove char
        this.txt=fullTxt.substring(0, this.txt.length - 1);
    } else {
        // add char
        this.txt=fullTxt.substring(0, this.txt.length + 1);
     }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class=="txt">${this.txt}</span>`;

     // initial Type Speed
     let typeSpeed = 100

     if(this.isDeleting){
         typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make pause at end
        typeSpeed = this.wait;
        //set delet to true
        this.isDeleting=true;
    } else if (this.isDeleting&&this.txt===''){
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed= 100
    }
    setTimeout(() => this.type(), typeSpeed);
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);
//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypWriter
    new TypeWriter(txtElement, words, wait);
}