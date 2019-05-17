import Snake from './snake.js';
import Apple from './apple.js';
import Drawing from './drawing.js';
import Sound from "./sound.js";

export default class Game {
    constructor(canvasWidth = 900, canvasHeight = 600) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.blockSize = 30;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.widthInBlocks = this.canvasWidth / this.blockSize;
        this.heightInBlocks = this.canvasHeight / this.blockSize;
        this.centreX = this.canvasWidth / 2;
        this.centreY = this.canvasHeight / 2;
        this.timeOut;
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.soundApple = new Sound('./appleCrunch.wav');
        this.soundHurt = new Sound('./hurt.wav');
        this.soundDirectionChange = new Sound('./directionChange.aiff');
        this.soundPowerUp = new Sound('./powerUp.mp3');
    }

    init() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "25px inset gray";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.background = "url('./herbe.jpg')";
        document.body.appendChild(this.canvas);
        this.launch();
    }

    launch() {
        this.snakee = new Snake("right", [6, 4], [2, 4]);
        this.applee = new Apple();
        this.score = 0;
        clearTimeout(this.timeOut);
        this.delay = 100;
        this.refreshCanvas();
    }

    refreshCanvas() {
        this.snakee.advance();
        if (this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)) {
            this.soundHurt.play();
            Drawing.gameOver(this.ctx, this.centreX, this.centreY);
        } else {
            if (this.snakee.isEatingApple(this.applee)) {
                this.soundApple.play();
                this.score++;
                this.snakee.ateApple = true;

                do {
                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);
                } while (this.applee.isOnSnake(this.snakee));

                if (this.score % 5 == 0) {
                    this.soundPowerUp.play();
                    this.speedUp();
                }
            }
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score);
            Drawing.drawSnake(this.ctx, this.blockSize, this.snakee);
            Drawing.drawApple(this.ctx, this.blockSize, this.applee);
            this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.delay);
            // le this du setimeOut aurait été windows si on aurait pas 
            // "bindé" le this, pour qu'il soit celui de game
        }
    }

    speedUp() {
        this.delay -= 10;
    }
}