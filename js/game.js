class Game {
    constructor() {
  
        this.startScreen = document.getElementById
            ('game-start')
        this.gameScreen = document.getElementById
            ('game-screen')
        this.gameEndScreen = document.getElementById
            ('game-over')
  
        
        this.height = 800
        this.width = 1000
        this.player = new Player(this.gameScreen)
        this.obstacle = [new Obstacle(this.gameScreen)]
        this.isGameOver = false
        this.score = 0
        this.lives = 3
        this.animateId
    }
  
    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`
  
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
  
        this.gameLoop()
    }
  
    gameLoop() {
        this.update()
  
        if (Math.random() > 0.98 && this.obstacle.length < 1) {
            this.obstacle.push(new Obstacle(this.gameScreen));
        }
  
  
        if (this.isGameOver) {
           this.endGame()
        }
        requestAnimationFrame(() => this.gameLoop())
    }
  
    update() {
        this.player.move()
        const obstacleToKeep = []
        this.obstacle.forEach(obstacle => {
            obstacle.move()
            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.lives -= 1
            } else if (obstacle.left < 0) {
                this.score += 1
            } else {
                obstacleToKeep.push(obstacle)
            }
        })
  
        this.obstacle = obstacleToKeep;
  
        if (this.lives <= 0) {
            this.isGameOver = true
        }
    }
    endGame() {
        this.player.element.remove()
        this.obstacle.forEach(obstacle => obstacle.element.remove())
    
        // Hide game screen
        this.gameScreen.style.display = 'none'
        // Show end game screen
        this.gameEndScreen.style.display = 'block'
      }
    }







