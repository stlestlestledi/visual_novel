//global variables used through the code 
const dialogue = document.querySelector('#dialogue');
const border = document.querySelector('#dialogue-box');
const character = document.querySelector('#character');
const background = document.querySelector('#bg');
const choiceBox = document.querySelector('#choice-box');

const click = () => new Promise(res => {
    window.addEventListener('click', res);
});
const delay = ms => new Promise(res => setTimeout(res, ms));

let first = 0; let curr = 0;

const load = () => first = parseInt(localStorage.getItem('load'));
const save = () => localStorage.setItem('load', curr);

window.onload = ev => {
    storyboard();
}

const fade = (ms, ...elements) => {
    if (curr < first-1) return;
    return new Promise(res => elements.forEach(e => {
        e.style.display = 'block';
        e.animate([{opacity: 0}, {opacity: 1}], {duration: ms, fillMode: 'forwards'}).onfinish = res;
    }));
}


const write = async (text, container) => {
    let shouldFinish = false;
    window.onclick = ev => shouldFinish = true;

    for (const char of text) {
        if (shouldFinish) {
            container.textContent = text;
            return;
        }    
        container.textContent += char;
        await delay(35);
    }
}

const show = src => {
    if (src === undefined) {
        background.style.display = 'none';
        return;
    }
    character.style.display = 'block';
    character.src = `artwork/sprites/${src}`;
}

const scene = src => {
    if (src === undefined) {
        background.style.display = 'none';
        return;
    }

    background.style.display = 'block';
    background.src = `artwork/background/${src}`;
}

const createChoice = prompt => {
    const choice = document.createElement('div');
    choice.classList.add('borda', 'choice');
    choice.textContent = prompt;
    choiceBox.appendChild(choice);
    return choice;
}

const path = (prompt, action) => ({element: createChoice(prompt), action: action});

const choice = (...options) => {
    return new Promise(res => options.forEach(option => option.element.onclick = async ev => {
        ev.stopPropagation();
        [...choiceBox.children].forEach(child => child.remove());
        await option.action();
        res();
    }));
}

/**
 * 
 * @param {string} what 
 * @param {HTMLAudioElement} voice 
 * @returns 
 */
const say = async (what, voice) => {
    if (curr++ < first-1) return;
    // save();
    border.style.opacity = 1;
    dialogue.textContent = ''; 

    if (voice == undefined) voice = new Audio('sounds/nothing.mp3');

    const voiceEvent = voice.addEventListener('timeupdate', async function() {
        let buffer = .24
        if (this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
        }
    });

    for (const part of what.split('/b')) {
        voice.play();
        await write(part, dialogue);
        voice.pause();
        await click();
    }

    removeEventListener('timeupdate', voiceEvent);
}
