async function storyboard() {    
    show('pessoa mola feliz.png');
    await say('');
    
    await choice(
        path('pau', async () => {
            show('pessoa mola neutra.png');
            await say('???');
        }),
        path('sim', async () => {
            show('pessoa mola feliz joia.png');
            await say('!!!');
        })  
    );
}