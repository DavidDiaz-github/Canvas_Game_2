

class Boat {
    constructor(ctx, posX, posY, boatW, boatH, canvasSize, imageName) { 
        this.ctx = ctx
        this.boatPos = {
            x: posX,
            y : posY
        }
        this.boatSize = {
            w: boatW,
            h : boatH
        }
        this.canvasSize = canvasSize
        this.imageName = imageName
        this.imageInstance = undefined
        this.bullets = [];

        this.lives = 5
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/${this.imageName}`

        this.imageInstance.frames = 9
        this.imageInstance.framesIndex = 0
    }

    draw(frames) {
        //this.ctx.drawImage(this.imageInstance, this.boatPos.x, this.boatPos.y, this.boatSize.w, this.boatSize.h)

        this.bullets.forEach(bullet => bullet.draw())

        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * Math.floor(this.imageInstance.width / this.imageInstance.frames),
            0,
            Math.floor(this.imageInstance.width / this.imageInstance.frames),
            this.imageInstance.height,
            this.boatPos.x,
            this.boatPos.y,
            this.boatSize.w,
            this.boatSize.h
        );
        this.animate(frames)

    }

    move(dir) {        
        if (this.boatPos.x >= 0 && this.boatPos.x <= this.canvasSize.w - this.boatSize.w) {
            dir === 'left' ? this.boatPos.x -= 25 : null
            dir === 'right' ? this.boatPos.x += 25 : null
        } else  if (this.boatPos.x <= 0){
            this.boatPos.x *= -1
        } else if (this.boatPos.x >= this.canvasSize.w - this.boatSize.w) {
            this.boatPos.x += -10
        }
    }

    shoot(event) {
        if (event === 'shoot') {
            this.bullets.push(new BulletBoat(this.ctx, 200, 100,50,50,this.boatPos.x,this.boatPos.y))
        }         
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletPos.y <= this.canvasSize.h)
    }  
    
    animate(frames) {
        if (frames % 5 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex > this.imageInstance.frames - 1) {
            this.imageInstance.framesIndex = 0;
        }
    }

}