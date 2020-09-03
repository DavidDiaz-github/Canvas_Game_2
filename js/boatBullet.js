class BulletBoat {
    constructor(ctx, boatSizeW, boatSizeH, bulletsizeW, bulletSizeH, boatPosX, boatPosY) { 
        this.ctx = ctx
        this.bulletPos = {        
            x: boatPosX + boatSizeW / 2,
            y: boatPosY + boatSizeH
        }

        this.bulletSize = {
            w: bulletsizeW,
            h: bulletSizeH
        }

        this.imageInstance = undefined

        this.velBullet = {
            x: 0,
            y: 25
        }
         this.damage = 1
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `images/bombaBarco.png`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)

        this.move()
    }

    move() {
        this.bulletPos.y += this.velBullet.y
    }

    
}