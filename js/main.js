let mymessage = "Welcome"

let endMsg = "Awesome! No words remaining"

let msg = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
const voices = synth.getVoices();

function readAWord() {
    let lessonChoosen = document.querySelector("#chooseLesson").value;
    if (spellingBee[lessonChoosen].length) {
        msg.text = spellingBee[lessonChoosen].splice(spellingBee[lessonChoosen].length * Math.random() | 0, 1)[
            0];
    } else {
        //document.getElementById("btn-next").setAttribute("data-disabled","disabled")
        msg.text = endMsg;
    }
    mymessage = msg.text;
    let mylabel = document.getElementById("spellingBee");
    mylabel.innerText = msg.text;
    console.log(msg.text);
    window.speechSynthesis.speak(msg);

    if (msg.text !== endMsg) {
        let anchor = document.createElement("a");
        anchor.setAttribute('onclick', 'speakLoud("' + msg.text + '")');
        anchor.setAttribute('class', 'speakWord');
        anchor.innerText = msg.text;
        anchor.href = "javascript:void(0)";
        document.getElementById("history").prepend(anchor);
    }
    try {
        let definition = document.getElementById('_definitions_');
        definition.innerHTML = '';
    
    } catch (error) {
        
    }
    
}

function repeatWord() {
    msg.text = mymessage;
    window.speechSynthesis.speak(msg);
}
function readSpelling(){
    let a = mymessage.split("");
    let b = a.toString()
    let c = b.replaceAll(",", ", ");
    msg.text = c;
    window.speechSynthesis.speak(msg);

}
/**
 * task = null, 0 //Add
 * task = -1, // remove
 * **/
function addRemoveRetest(task) {
    let retestWordsStorage = localStorage.getItem("retestWords");
    let retestWords = [];
    try {
        retestWords = retestWordsStorage ? JSON.parse(retestWordsStorage) : [];
    } catch (error) {
        retestWords = [];
    }

    let currentIndex = retestWords.indexOf(msg.text)

    if (task != '-1' && task != -1) {
        if (currentIndex == -1 && msg.text != endMsg) {
            retestWords.push(msg.text)
        }
    } else {
        if (currentIndex != -1) {
            retestWords.splice(currentIndex, 1);
        }
    }
    localStorage.setItem("retestWords", JSON.stringify(retestWords));
    setRetestWords();
    printSpellingList(4);
    
}

function setRetestWords() {
    let retestWordsStorage = localStorage.getItem("retestWords");
    let retestWords = [];
    try {
        retestWords = retestWordsStorage ? JSON.parse(retestWordsStorage) : [];
    } catch (error) {
        retestWords = [];
    }
    spellingBee[4] = retestWords;
}

function printSpellingList(idx) {
    let divElem = document.createElement('div');
    spellingBee[idx].sort();
    for (let i = 0; i < spellingBee[idx].length; i++) {
        let anchor = document.createElement("a");
        anchor.setAttribute('onclick', 'speakLoud("' + spellingBee[idx][i] + '")');
        anchor.setAttribute('class', 'speakWord');
        anchor.innerText = spellingBee[idx][i];
        anchor.href = "javascript:void(0)";

        divElem.appendChild(anchor);
    }
    let spellingLists = document.getElementById("spellingList" + idx);
    spellingLists.replaceChildren();
    spellingLists.appendChild(divElem);
}

function speakLoud(txtmsg) {
    msg.text = txtmsg;
    let mylabel = document.getElementById("spellingBee");
    mylabel.innerText = msg.text;
    window.speechSynthesis.speak(msg);
    if (msg.text !== endMsg) {
        let anchor = document.createElement("a");
        anchor.setAttribute('onclick', 'speakLoud("' + msg.text + '")');
        anchor.setAttribute('class', 'speakWord');
        anchor.innerText = msg.text;
        anchor.href = "javascript:void(0)";
        document.getElementById("history").prepend(anchor);
    }
    try {
        let definition = document.getElementById('_definitions_');
        definition.innerHTML = '';
    
    } catch (error) {
        
    }
}
