const boatApp = {
    name: "Canvas Boat Game",
    author: "Heyling Marquez y  David Diaz",
    version: '1.0.0',
    license: undefined,
    description: "Game Boat vs submarines Canvas",
    canvasId: undefined,
    ctx: undefined,
    boat: undefined,
    bulletboat: undefined,
    submarine: undefined,
    submarines : [],
    submarineBoss: undefined,
    missiles: [],
    fish: undefined,
    fishes: [],
    coins: undefined, 
    coin : [],
    score: 0,
    frames: 0,
    bullets: [],
    canvasSize: {
        w: undefined,
        h: undefined
    },
    canvasPos: {  // canvasEjes!!!!
        x: undefined,
        y: undefined
    },
    audios: {
        explosion: new Audio("sound/bang_6.wav"),
        explosionBoat: new Audio("sound/explosion-01.mp3"),
        youLose: new Audio("sound/youLose.mp3"),
        youWin: new Audio("sound/you-win.mp3"),
        fail: new Audio("sound/fail.mp3"),
        soundCoin: new Audio("sound/moneda.mp3"),
        musicGame: new Audio("sound/iron-man-01.mp3")
    },

    init(id) {
        this.canvasId = id;
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.setDimensions()
        this.setEventListener()        
        this.start()

    },

    setDimensions() {
        document.getElementById(this.canvasId).setAttribute('width', window.innerWidth)
        document.getElementById(this.canvasId).setAttribute('height', window.innerHeight)
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
            
        }
  
    },

    start() {
        this.reset()
        this.audios.musicGame.volume = 0.4;
        this.audios.musicGame.play()
        
        this.interval = setInterval(() => {

            this.clearScreen()
            this.drawAll()
            this.generateObstacle()     
            this.boat.clearBullets()

            this.submarines.forEach(elm => elm.shootSub(this.frames))
            this.submarines.forEach(elm => elm.clearMissiles())

            this.submarineBoss.shootSub(this.frames)
            this.submarineBoss.clearMissiles()

            this.boatCollision()
            this.submarineCollision()

            this.frames > 5000 ? this.frames = 0 : this.frames++
            console.log("Score: " + this.score)
            
            this.ctx.font = "bold 20px sans-serif";
            this.ctx.fillText(`SCORE : ${this.score}`, 50, 50);
            this.ctx.fillText(`LIVES : ${this.boat.lives}`,this.canvasSize.w - 150,50)
            console.log(this.submarineBoss.lives)
            this.winGame()

        }, 100);

    },

    reset() {
        this.boat = new Boat(this.ctx, this.canvasSize.w / 2 - 200, this.canvasSize.h / 2 - 350, 300, 100, this.canvasSize, 'boat-sprite.png')
        this.submarineBoss = new SubmarineBoss(this.ctx, this.canvasSize.w / 2 - 100, this.canvasSize.h - 150, 200, 150, this.canvasSize, this.frames)
        this.generateSubmarine(3)

        
    },

    drawAll() {
        this.boat.draw(this.frames)

        this.submarineBoss.draw()
        
        this.fishes.forEach(elm => elm.draw())
        this.coin.forEach(elm => elm.draw(this.frames))

        this.submarines.forEach(elm => elm.draw())
    },

   clearScreen() {
       this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
   
    generateSubmarine(num) {
        for (let i = 0; i < num; i++){
            this.submarines.push(new Submarine(this.ctx, Math.floor(Math.random() * ((this.canvasSize.w - 100) - 0)) + 0, Math.floor(Math.random() * ((this.canvasSize.h - 200) - 150)) + 150, 75, 75, this.canvasSize, 'submarine.png', this.frames))
        }
    },
    
   
    generateObstacle() {
        if (this.frames % 70 === 0) {
            this.fishes.push(new Fish(this.ctx, Math.floor(Math.random() * ((this.canvasSize.w - 100) - 0)) + 0, Math.floor(Math.random() * ((this.canvasSize.h - 300) - 150)) + 150, 75, 75, this.canvasSize, 'pez1.png'))
            console.log(this.fishes) //el array se limpia ok
            this.coin.push(new Coins(this.ctx, Math.floor(Math.random() * ((this.canvasSize.w - 100) - 0)) + 0, Math.floor(Math.random() * ((this.canvasSize.h - 400) - 150)) + 150, 90, 90, this.canvasSize, 'image.png'))
        }
   }, 
    
    boatCollision() {   // generador de colisiones del barco contra los demas elementos.

        this.boat.bullets.forEach(bullet => {
            this.submarines.forEach(sub => {
                //console.log(this.submarines)
                if (bullet.bulletPos.x < sub.subPos.x + sub.subSize.w && bullet.bulletPos.x + bullet.bulletSize.w > sub.subPos.x && bullet.bulletPos.y < sub.subPos.y + sub.subSize.h && bullet.bulletPos.y + bullet.bulletSize.h > sub.subPos.y) {
                    //console.log("colision") // bomb contra submarine1
                    this.boat.bullets = this.boat.bullets.filter(elm => elm !== bullet)
                    this.audios.explosion.play();
                    if (sub.lives > 0) {
                        sub.lives--
                        this.score += 10
                    }
                    if (sub.lives === 0){
                        // borrar submarino de la pantalla
                        this.submarines = this.submarines.filter(elm => elm !== sub)
                        this.score += 30
                    }

                }
            })
            
        })

        this.boat.bullets.forEach(elm => {
            if (elm.bulletPos.x < this.submarineBoss.submarineBossPos.x + this.submarineBoss.submarineBossSize.w && elm.bulletPos.x + elm.bulletSize.w > this.submarineBoss.submarineBossPos.x && elm.bulletPos.y < this.submarineBoss.submarineBossPos.y + this.submarineBoss.submarineBossSize.h && elm.bulletPos.y + elm.bulletSize.h > this.submarineBoss.submarineBossPos.y) {
                //console.log(" SubmarinoBoss  BOOM ") // bomb contra submarineBoss
                this.boat.bullets = this.boat.bullets.filter(bullet => bullet !== elm) //borrar la bomba que cae.
                this.audios.explosion.play()
                if (this.submarineBoss.lives > 0) {
                    this.submarineBoss.lives--
                    this.score += 20
                } 
                if (this.submarineBoss.lives === 0) {
                    this.submarineBoss.submarineBossPos.x = this.canvasSize.w + 300 //Hay otra forma de eliminar este submarino que no esta en un array
                }

            }
        })

        this.boat.bullets.forEach(elm => {
            this.submarines.forEach(sub => {
                sub.missiles.forEach(mis => {
                    if (elm.bulletPos.x < mis.bulletPos.x + mis.bulletSize.w && elm.bulletPos.x + elm.bulletSize.w > mis.bulletPos.x && elm.bulletPos.y < mis.bulletPos.y + mis.bulletSize.h && elm.bulletPos.y + elm.bulletSize.h > mis.bulletPos.y) {
                        //console.log("choque de bombas") //choque de bombas
                        this.boat.bullets = this.boat.bullets.filter(bullet => bullet !== elm) //borrar la bomba que cae.
                        sub.missiles = sub.missiles.filter(elm => elm !== mis)
                    }
                })
                    

                
            })
    
        })



        this.boat.bullets.forEach(elm => {
            this.submarineBoss.missiles.forEach(mis => {
                if (elm.bulletPos.x < mis.bulletPos.x + mis.bulletSize.w && elm.bulletPos.x + elm.bulletSize.w > mis.bulletPos.x && elm.bulletPos.y < mis.bulletPos.y + mis.bulletSize.h && elm.bulletPos.y + elm.bulletSize.h > mis.bulletPos.y) {
                    //console.log("choque de bombas BOSSSSSSSS") //choque de bombas
                    this.boat.bullets = this.boat.bullets.filter(bullet => bullet !== elm)
                    this.submarineBoss.missiles = this.submarineBoss.missiles.filter(boss => boss !== mis)
                }
            })

        })

        this.boat.bullets.forEach(elm => {
            this.fishes.forEach(mis => {
                if (elm.bulletPos.x < mis.fishPos.x + mis.fishSize.w && elm.bulletPos.x + elm.bulletSize.w > mis.fishPos.x && elm.bulletPos.y < mis.fishPos.y + mis.fishSize.h && elm.bulletPos.y + elm.bulletSize.h > mis.fishPos.y) {
                    //console.log("choque de bombas contra pez") //choque de bombaBarco contra pez
                    this.audios.fail.play()
                    this.boat.bullets = this.boat.bullets.filter(bullet => bullet !== elm)
                    this.fishes = this.fishes.filter(fish => fish !== mis)
                    this.score -= 10;
                }
            })

        })

        this.boat.bullets.forEach(elm => {
            this.coin.forEach(mis => {
                if (elm.bulletPos.x < mis.coinPos.x + mis.coinSize.w && elm.bulletPos.x + elm.bulletSize.w > mis.coinPos.x && elm.bulletPos.y < mis.coinPos.y + mis.coinSize.h && elm.bulletPos.y + elm.bulletSize.h > mis.coinPos.y) {
                    //console.log("choque de bombas contra MONEDASSSSS") //choque de bombaBarco contra moneda
                    this.audios.soundCoin.play()
                    this.boat.bullets = this.boat.bullets.filter(bullet => bullet !== elm)
                    this.coin = this.coin.filter(coin => coin !== mis)
                    this.score += 10
                    
                
                }
            })

        })


        
    },

    submarineCollision() {   //generador de colisiones de submarino contra el barco
         
        this.submarines.forEach(elm => {
            elm.missiles.forEach(missil => {
                if (missil.bulletPos.x < this.boat.boatPos.x + this.boat.boatSize.w && missil.bulletPos.x + missil.bulletSize.w > this.boat.boatPos.x && missil.bulletPos.y < this.boat.boatPos.y + this.boat.boatSize.h && missil.bulletPos.y + missil.bulletSize.h > this.boat.boatPos.y) {
                    console.log("colision contra el barco") // submarine1 bomb contra boat
                    elm.missiles = elm.missiles.filter(bullet => bullet !== missil)
                    if (this.boat.lives > 0) {
                        this.boat.lives--
                    }
                    if (this.boat.lives === 0) {
                        this.endGame()
                    }
                    
                }
            })

            
        })


        this.submarineBoss.missiles.forEach(elm => {
            if (elm.bulletPos.x < this.boat.boatPos.x + this.boat.boatSize.w && elm.bulletPos.x + elm.bulletSize.w > this.boat.boatPos.x && elm.bulletPos.y < this.boat.boatPos.y + this.boat.boatSize.h && elm.bulletPos.y + elm.bulletSize.h > this.boat.boatPos.y) {
                console.log("colision contra el barco desde el BOSS") // submarineBoss bomb contra boat
                this.submarineBoss.missiles = this.submarineBoss.missiles.filter(bullet => bullet !== elm)
                if (this.boat.lives > 0) {
                    this.boat.lives--
                }
                if (this.boat.lives === 0) {                    
                    this.endGame()
                    
                }
            }
        })
         
     },


    
    setEventListener() {   //Evento de control de tecla pulsada
        document.onkeydown = e => {
            e.keyCode === 37 ? this.boat.move('left') : null
            e.keyCode === 39 ? this.boat.move('right') : null
            e.keyCode === 32 ? this.boat.shoot('shoot') : null
        }
    },

    endGame() {
        this.audios.explosion.volume = "0.3"
        this.audios.explosion.play()
        this.audios.musicGame.pause()   //Se para el audio

        const div = document.querySelector(".gameOver")
        let clases = div.classList;
        clases.toggle("display") // seleccionamos la class y le cambiamos quitamos la clas display para que se vea.

        clearInterval(this.interval); //paramos el juego

        document.getElementById('div').innerHTML = `SCORE : ${this.score}`; //añadimos la puntuacion a la imagen final de game over
        this.audios.youLose.volume = "1";
        this.audios.youLose.play()
    },

    winGame() {
        if (this.submarineBoss.lives === 0 && this.submarines.length === 0) {
            this.audios.musicGame.pause() //Se para el audio

            const div = document.querySelector(".winner")
            let clases = div.classList;
            clases.toggle("display") // seleccionamos la class y le cambiamos quitamos la clas display para que se vea.
            
            clearInterval(this.interval); //paramos el juego

            document.getElementById('div2').innerHTML = `SCORE : ${this.score}`; //añadimos la puntuacion a la imagen final de game over
            
            this.audios.youWin.volume = "1";
            this.audios.youWin.play()
        }



    }

}