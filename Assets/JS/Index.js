window.addEventListener('load', () => {
    const game = new Game('tetris');
    game.start();

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
      })
});