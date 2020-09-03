class Coins {
    constructor(ctx, coinPosX, coinPosY, coinW, coinH, canvasSize, coinImage, frames) {
        this.ctx = ctx
        this.coinPos = {
            x: coinPosX,
            y: coinPosY
        }
        this.coinSize = {
            w: coinW,
            h: coinH
        }
        this.canvasSize = canvasSize
        this.coinImage = coinImage
        this.coinImgInstance = undefined
        
        this.speed = {
            x: Math.floor(Math.random() * (30 - 15)) + 15,
            y: 2
        }
        this.coinPhysics = {
            gravity: .2
        }
            

        this.frames = frames
        this.init()
    }

    init() {
        this.coinImgInstance = new Image()
        this.coinImgInstance.src = `images/${this.coinImage}`

         this.coinImgInstance.frames = 6
         this.coinImgInstance.framesIndex = 0
    }

    draw(frames) {
        this.moveCoin()
        //this.ctx.drawImage(this.coinImgInstance, this.coinPos.x, this.coinPos.y, this.coinSize.w, this.coinSize.h)


        this.ctx.drawImage(
             this.coinImgInstance,
             this.coinImgInstance.framesIndex * Math.floor(this.coinImgInstance.width / this.coinImgInstance.frames),
             0,
             Math.floor(this.coinImgInstance.width / this.coinImgInstance.frames),
             this.coinImgInstance.height,
             this.coinPos.x,
             this.coinPos.y,
             this.coinSize.w,
             this.coinSize.h
        );
        this.animate(frames)
    }

    moveCoin() {
        this.coinPos.x += this.speed.x
        this.speed.y += this.coinPhysics.gravity
        this.coinPos.y += this.speed.y

        this.coinPos.y > this.canvasSize.h - this.coinSize.h ? this.speed.y *= -1 : null
        this.coinPos.x >= this.canvasSize.w - this.coinSize.w || this.coinPos.x <= 0 ? this.changeDirection() : null
    }

    changeDirection() {
        this.speed.x *= -1
    }

    animate(frames) {
        if (frames % 5 == 0) {
            this.coinImgInstance.framesIndex++;
        }
        if (this.coinImgInstance.framesIndex > this.coinImgInstance.frames - 1) {
            this.coinImgInstance.framesIndex = 0;
        }
    }

}