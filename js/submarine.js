class Submarine {
    constructor(ctx, submarinePosX, submarinePosY, submarineW, submarineH, canvasSize, subImage, frames) {
        this.ctx = ctx
        this.subPos = {
            x: submarinePosX,
            y: submarinePosY
        }
        this.subSize = {
            w: submarineW,
            h: submarineH
        }
        this.canvasSize = canvasSize
        this.subImage = subImage
        this.subImgInstance = undefined
        this.missiles = []
        this.speed = Math.floor(Math.random() * (15 - 8)) + 8
        
        this.frames = frames
        this.lives = 2
        this.init()
    }

    init() {
        this.subImgInstance = new Image()
        this.subImgInstance.src = `images/${this.subImage}`
    }

    draw() {
        this.moveSubmarine()
        this.ctx.drawImage(this.subImgInstance, this.subPos.x, this.subPos.y, this.subSize.w, this.subSize.h)
        
        this.missiles.forEach(elm => elm.draw())
        
    }

    shootSub(frames) {
        if (frames % 20 === 0) {
            this.missiles.push(new BulletSub(this.ctx, 100, 100,40, 100, this.subPos.x, this.subPos.y))
        }        
    }   

    clearMissiles() {   
        this.missiles = this.missiles.filter(elm => elm.bulletPos.y >= 80)
    }

    moveSubmarine() {
        this.subPos.x += this.speed
        this.subPos.x >= this.canvasSize.w - this.subSize.w || this.subPos.x <= 0 ? this.changeDirection() : null
    }

    changeDirection() {
        this.speed *= -1
    }

}

class SubmarineBoss extends Submarine {
    constructor(ctx, submarineBossPosX, submarineBossPosY, submarineBossW, submarineBossH, canvasSize, frames) {
        super(ctx, frames)
        this.submarineBossPos = {
            x: submarineBossPosX,
            y: submarineBossPosY
        }
        this.submarineBossSize = {
            w: submarineBossW,
            h: submarineBossH
        }

        this.canvasSize = canvasSize

        this.imageInstance = undefined
        this.missile = []
        this.speed = Math.floor(Math.random() * (25 - 18)) + 18
        this.lives = 4
        this.init()

    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/submarineBoss.png`
    }

    draw() {
        this.moveSubmarineBoss()
        this.ctx.drawImage(this.imageInstance, this.submarineBossPos.x, this.submarineBossPos.y, this.submarineBossSize.w, this.submarineBossSize.h)

        this.missiles.forEach(elm => elm.draw())      

    }

    moveSubmarineBoss() {
        this.submarineBossPos.x += this.speed
        this.submarineBossPos.x >= this.canvasSize.w - this.submarineBossSize.w || this.submarineBossPos.x <= 0 ? this.changeDirection() : null
    }

    changeDirection() {
        this.speed *= -1
    }

    shootSub(frames) {
        if (frames % 50 === 0) {
            this.missiles.push(new BulletSub(this.ctx, 100, 100, 50, 150, this.submarineBossPos.x, this.submarineBossPos.y))
        }
        
    }
    clearMissiles() {
        this.missiles = this.missiles.filter(elm => elm.bulletPos.y >= 80)
    }
    

    

}