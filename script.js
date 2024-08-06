let words= [
        {
            word: "BOOK",
            hint: "This item is often found on a shelf and contains pages with text."
        },
        {
            word: "CAR",
            hint: "This vehicle has four wheels and is used for personal transportation."
        },
        {
            word: "COMPUTER",
            hint: "This device is used for tasks like browsing the internet and typing documents."
        },
        {
            word: "PEN" ,
            hint:  " It is used to write on paper and can come in various colors."
        },
        {
            word: "APPLE",         
            hint: "The name of this fruit is also associated with a major technology company.",
        },
        { 
            word:"TEACHER" ,
            hint: "They often work in schools or educational institutions."
        },
]

let k=0
let interval
let currentKeyIndex = 0
let currentScore = 0
let time=document.querySelector(".time")
let keys=document.querySelector(".keys")
let hint=document.querySelector(".hint")
let input=document.querySelector("input")
let score=document.querySelector(".score")
let buttons=document.querySelector(".buttons")
let inputDiv = document.querySelector(".input")
let nextWord=document.querySelector(".nextWord")
let letterButtons = document.querySelectorAll('.letter');
function resetGame() {
    k = 0;
    currentKeyIndex = 0; 
    clearInterval(interval); 
    time.innerHTML = "Time: 30";
    inputDiv.innerHTML = ''; 
    enableLetterButtons(); 
    score.innerHTML ="Score: 0"
    currentScore = 0;
}
function enableLetterButtons() {
    letterButtons.forEach(button => {
        button.disabled = false
    });
}
function disableLetterButtons() {
    letterButtons.forEach(button => {
        button.disabled = true; 
    });
}
function letters(){
    inputDiv.innerHTML = '';
    let i=30
    currentKeyIndex = 0; 
    time.style.backgroundColor='green'
    time.innerHTML = "Time: "+ i
    interval=setInterval(function(){
        i--
        time.innerHTML = "Time: "+ i
        if (i <= 0) {
            clearInterval(interval);
            disableLetterButtons();
            time.innerHTML ="Time's up!"
        }
    }, 1000);

    let word=words[k].word
    console.log(word) 
    let key
    for(let j=0; j<word.length; j++){
        input.style.display="none"
        key=document.createElement("div")
        key.classList.add("key")
        key.style.width="30px"
        key.style.height="30px"
        key.style.backgroundColor="rgb(179, 178, 178)"
        key.style.borderRadius="10px"
        key.style.margin="10px"
        key.style.display="flex"
        key.style.justifyContent="center"
        key.style.alignItems="center"
        key.textContent=""
        inputDiv.style.display="flex"
        inputDiv.appendChild(key)
    }
    letterButtons.forEach(button => {
        button.removeEventListener('click', letterClickHandler);
        button.addEventListener('click', letterClickHandler);
    });
}
function letterClickHandler() {
    let word = words[k].word;
    let keys = document.querySelectorAll(".key");
    if (currentKeyIndex < word.length) { 
        let letter = this.getAttribute('data-letter');     
        keys[currentKeyIndex].textContent = letter; 
        console.log(letter);
        if(letter==word[currentKeyIndex]){
            keys[currentKeyIndex].style.backgroundColor="green"
            currentScore += 10
            score.innerHTML = "Score: " + currentScore 
        }
        else{
            keys[currentKeyIndex].style.backgroundColor="red"
            currentScore -= 10
            score.innerHTML = "Score: " + currentScore
        }
        currentKeyIndex++;
    }
}

function timer(){ 
    resetGame();
    letters()
    hint.addEventListener("click",function(){
        alert(words[k].hint)
    })
    nextWord.removeEventListener("click", nextWordClickHandler);
    nextWord.addEventListener("click", nextWordClickHandler);
}
function nextWordClickHandler() {
    clearInterval(interval);
        enableLetterButtons();
        if (k < words.length-1) { 
            console.log(k)
            k++ 
            console.log(k)
            currentKeyIndex = 0;
            letters();  

        } else {
            alert("No more words. Final score: "+currentScore); 
        }
}
let start=document.querySelector(".start")
start.addEventListener("click",timer)


