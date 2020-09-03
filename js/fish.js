class Fish {
    constructor(ctx, fishPosX, fishPosY, fishW, fishH, canvasSize, fishImage) {
        this.ctx = ctx
        this.fishPos = {
            x: fishPosX,
            y: fishPosY
        }
        this.fishSize = {
            w: fishW,
            h: fishH
        }
        this.canvasSize = canvasSize
        this.fishImage = fishImage
        this.fishImgInstance = undefined
        
        this.speed = {
            x: Math.floor(Math.random() * (30 - 15)) + 15,
            y: 2
        }
        this.fishPhysics = {
            gravity: .2
        }


        //this.frames = frames
        this.init()
    }

    init() {
        this.fishImgInstance = new Image()
        this.fishImgInstance.src = `images/${this.fishImage}`
        // para hacer peces en movimiento
        // this.fishImgInstance.frames = 5
        // this.fishImgInstance.framesIndex = 0
    }

    draw(frames) {
        this.moveFish()
         this.ctx.drawImage(this.fishImgInstance, this.fishPos.x, this.fishPos.y, this.fishSize.w, this.fishSize.h)
        //  this.ctx.drawImage(
        //      this.fishImgInstance,
        //      this.fishImgInstance.framesIndex * Math.floor(this.fishImgInstance.width / this.fishImgInstance.frames),
        //      0,
        //      Math.floor(this.fishImgInstance.width / this.fishImgInstance.frames),
        //      this.fishImgInstance.height,
        //      this.fishPos.x,
        //      this.fishPos.y,
        //      this.fishSize.w,
        //      this.fishSize.h
        //  );
        this.animate(frames)
    }


    moveFish() {
        this.fishPos.x += this.speed.x
        this.speed.y += this.fishPhysics.gravity
        this.fishPos.y += this.speed.y

        this.fishPos.y > this.canvasSize.h - this.fishSize.h ? this.speed.y *= -1 : null
        this.fishPos.x >= this.canvasSize.w - this.fishSize.w || this.fishPos.x <= 0 ? this.changeDirection() : null
    }

    changeDirection() {
        this.speed.x *= -1
    }

    animate(frames) {
        if (frames % 5 == 0) {
            this.fishImgInstance.framesIndex++;
        }
        if (this.fishImgInstance.framesIndex > this.fishImgInstance.frames - 1) {
            this.fishImgInstance.framesIndex = 0;
        }
    }

}
