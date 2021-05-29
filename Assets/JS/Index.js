window.addEventListener('load', () => {
    const game = new Game('tetris')

    document.addEventListener('keypress', (event) => {
        game.start()
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
      })
});