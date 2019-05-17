export default class Drawing {

    static gameOver(ctx, centreX, centreY) {
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeText("Game Over!", centreX, centreY - 180);
        ctx.fillText("Game Over!", centreX, centreY - 180);
        ctx.font = "bold 20px sans-serif";
        ctx.strokeText("Press 'Space' to restart", centreX, centreY - 120);
        ctx.fillText("Press 'Space' to restart", centreX, centreY - 120);
        ctx.restore();
    }

    static drawScore(ctx, centreX, centreY, score) {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }

    static drawBlock(ctx, position, blockSize) {
        const radius = blockSize / 2;
        const [x, y] = position;
        ctx.beginPath();
        ctx.arc(x * blockSize + radius ,y * blockSize + radius , radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

    static drawSnake(ctx, blockSize, snake) {
        ctx.save();
        ctx.fillStyle = "#59ff07";
        for (let block of snake.body) {
            this.drawBlock(ctx, block, blockSize);
        }
        ctx.restore();
    }

    static drawApple(ctx, blockSize, apple) {
        const radius = blockSize / 2;
        const x = apple.position[0] * blockSize + radius;
        const y = apple.position[1] * blockSize + radius;
        ctx.save();
        ctx.fillStyle = "#ff0749";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
    };
}