var mymessage = "Welcome"

var endMsg = "Awesome! No words remaining"

var msg = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
const voices = synth.getVoices();

function readAWord() {
    var lessonChoosen = document.querySelector("#chooseLesson").value;
    if (spellingBee[lessonChoosen].length) {
        msg.text = spellingBee[lessonChoosen].splice(spellingBee[lessonChoosen].length * Math.random() | 0, 1)[
            0];
        var mylabel = document.getElementById("spellingBee");

    } else {
        //document.getElementById("btn-next").setAttribute("data-disabled","disabled")
        msg.text = endMsg;
    }
    mymessage = msg.text;
    var mylabel = document.getElementById("spellingBee");
    mylabel.innerText = msg.text;
    console.log(msg.text);
    window.speechSynthesis.speak(msg);

    if (msg.text !== endMsg) {
        var anchor = document.createElement("a");
        anchor.setAttribute('onclick', 'speakLoud("' + msg.text + '")');
        anchor.setAttribute('class', 'speakWord');
        anchor.innerText = msg.text;
        anchor.href = "javascript:void(0)";
        document.getElementById("history").prepend(anchor);
    }

}

function repeatWord() {
    msg.text = mymessage;
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
    //spellingBee[4] = retestWords;
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
    var divElem = document.createElement('div');
    spellingBee[idx].sort();
    for (var i = 0; i < spellingBee[idx].length; i++) {
        var anchor = document.createElement("a");
        anchor.setAttribute('onclick', 'speakLoud("' + spellingBee[idx][i] + '")');
        anchor.setAttribute('class', 'speakWord');
        anchor.innerText = spellingBee[idx][i];
        anchor.href = "javascript:void(0)";

        divElem.appendChild(anchor);
    }
    var spellingLists = document.getElementById("spellingList" + idx);
    spellingLists.replaceChildren();
    spellingLists.appendChild(divElem);
}

function speakLoud(txtmsg) {
    msg.text = txtmsg;
    var mylabel = document.getElementById("spellingBee");
    mylabel.innerText = msg.text;
    window.speechSynthesis.speak(msg);
    if (msg.text !== endMsg) {
        var anchor = document.createElement("a");
        anchor.setAttribute('onclick', 'speakLoud("' + msg.text + '")');
        anchor.setAttribute('class', 'speakWord');
        anchor.innerText = msg.text;
        anchor.href = "javascript:void(0)";
        document.getElementById("history").prepend(anchor);
    }
}
