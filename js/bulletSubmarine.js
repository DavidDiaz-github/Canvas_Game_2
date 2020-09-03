class BulletSub {
    constructor(ctx, subSizeW, subSizeH, bulletsizeW, bulletSizeH, subPosX, subPosY) { 
        this.ctx = ctx
        this.bulletPos = { 
            x: (subPosX - 40)+ subSizeW / 2,
            y: (subPosY + 60) - subSizeH 
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
        this.imageInstance.src = `images/misilSub.png`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)

        this.move()
    }

    move() {
        this.bulletPos.y -= this.velBullet.y
    }


}