const neutralVoice = new Audio('sounds/voice/neutral voice.mp3');
neutralVoice.volume = .5

const angryVoice = new Audio('sounds/voice/angry voice.mp3');
angryVoice.volume = .5

async function storyboard() {    
    await click();
    scene('bg.png');
    show('pessoa mola feliz.png');
    await say('vai se fuder', angryVoice);
    await say('pau pau pau', neutralVoice);
    
    await choice(
        path('pau', async () => {
            show('pessoa mola neutra.png');
            await say('pau pau pau', neutralVoice);
        }),
        path('sim', async () => {
            show('pessoa mola feliz joia.png');
            await say('!!!', angryVoice);
        }),
    );
    await say('sexo', angryVoice);
}