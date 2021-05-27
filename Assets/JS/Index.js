window.addEventListener('load', () => {
    const game = new Game('tetris')

    document.addEventListener('keypress', () => {
        game.start()
    })

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
      })
});