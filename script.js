const Text = document.getElementById('txtInput');
const Submit = document.getElementById('sButton');
const jokeContainer = document.getElementById('oneJoke');
const main = document.querySelector('main');
let xhr = new XMLHttpRequest();
xhr.open('GET', "http://localhost:3000/api/jokes");
xhr.send();
xhr.responseType = "json";
xhr.onload = function(){
    let jokes = xhr.response;
    console.log(jokes);
    if(jokes.length){
        main.innerHTML = '';
        jokes.forEach(joke => {
            main.innerHTML += getJoke(joke);
        });
    }
}
Submit.addEventListener('click',(event)=> {
    const content = Text.value;
    const joke = {content, likes:0 , dislikes:0};
    let xml = new XMLHttpRequest();
    xml.open('POST', "http://localhost:3000/api/jokes");
    xml.send(JSON.stringify(joke));
    xml.onload = function(){
        console.log(1);
        main.innerHTML += getJoke(joke);
    }
})

function getJoke(joke){
    return `
    <div id="oneJoke">
        <div id="jokeContent">
            <h3>${joke.content}</h3>
        </div>
        <div id="jokeReaction">
            <span>${joke.likes}</span> 
            <button id="like"><i class="fa fa-thumbs-o-up fa-2x"></i></button>
            <span>${joke.dislikes}</span>
            <button id="dislike"><i class="fa fa-thumbs-o-down fa-2x"></i></button>
        </div>
    </div>
    `
}
