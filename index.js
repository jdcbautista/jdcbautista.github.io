// const instance = require('.gradient.js');
// const gradiate = instance.gradient();
// from gradient import gradient

const canvas = document.querySelector('canvas');


const c = canvas.getContext('2d')

//subproperty innerWidth of window property can exclude window from window.innerWidth 
canvas.width = innerWidth
canvas.height = innerHeight
canvas.fillStyle = "333333"

console.log(c)
currentColor = "#fefefe"
playerColor = "#00ACFC"
pause = false
diffMult = .5
intervalMult = 1000
combo = 0
c.fillStyle = '#333333'

shakeDuration = 800;
shakeStartTime = -1;

//VISUAL EFFECT FUNCTIONS
//COLOR MODS
function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  // invert color components
  //
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  // console.log((r) + (g) + (b) )
  // console.log(padZero(r) + padZero(g) + padZero(b) )
  return '#' + padZero(r) + padZero(g) + padZero(b);
}
//
//0b 4c 4c
//f4 b3 b3
//parseInt(string [, radix])
range = 0
let rgb = []

function splitComp(hex, range) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  // mod color components
  // console.log(`parse of ${hex.slice(0, 2)}= ${parseInt(hex.slice(0, 2), 16)}`)
  // console.log(`parse of ${hex.slice(2, 4)}= ${parseInt(hex.slice(2, 4), 16)}`)
  // console.log(parseInt(hex.slice(4, 6), 16))
  
  var h1 = parseInt(hex.slice(0, 2), 16),
  h2 = parseInt(hex.slice(2, 4), 16),
  h3 = parseInt(hex.slice(4, 6), 16)
  
  rgb[0] = (0 + h1).toString(16)
  rgb[1] = (0 + h2).toString(16)
  rgb[2] = (0 + h3).toString(16)
  
  for (i=0; i < rgb.length; i++)
  if (rgb[i] <= -1) {
    rgb[i] = 255 - rgb[i]
  }
  
  if (range = 0) {//triad clockwise:
    return '#' + padZero((rgb[0])) + padZero((rgb[1])) + padZero((rgb[2]));
  } else if (range = 1) {
    return '#' + padZero((rgb[1])) + padZero((rgb[2])) + padZero((rgb[0]));
  } else if (range = 2) {
    return '#' + padZero((rgb[2])) + padZero((rgb[0])) + padZero((rgb[1]));
  } else if (range = 3) {
    return '#' + padZero((rgb[0])) + padZero((rgb[2])) + padZero((rgb[1]));
  } else if (range = 4) {
    return '#' + padZero((rgb[1])) + padZero((rgb[0])) + padZero((rgb[2]));
  } else if (range = 5) {
    return '#' + padZero((rgb[2])) + padZero((rgb[1])) + padZero((rgb[2]));
  }
}

//COLOR INVERSION COMPONENT
function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

// //SREEN SHAKE
// function preShake() {
//   if (shakeStartTime ==-1) return;
//   var dt = Date.now()-shakeStartTime;
//   if (dt>shakeDuration) {
//       shakeStartTime = -1; 
//       return;
//   }
//   var easingCoef = dt / shakeDuration;
//   var easing = Math.pow(easingCoef-1,3) +1;
//   ctx.save();  
//   var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*15;
//   var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*15;
//   ctx.translate(dx, dy);  
// }

// function postShake() {
//   if (shakeStartTime ==-1) return;
//   ctx.restore();
// }

// function startShake() {
//    shakeStartTime=Date.now();
// }





//CLASSES

class Title {
  constructor(x, y, color) {

    this.x = x
    this.y = y
    this.color = color
    // this.gradient = c.createLinearGradient(0,0, c.width, 0);
    // this.gradient.addColorStop("0", "magenta");
    // this.gradient.addColorStop("0.5", "blue");
    // this.gradient.addColorStop("1", "red");
    
  }

  draw() {
    // c.beginPath()
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.fillStyle = this.color 
    // c.fill()
    c.font = "30px Arial"
    // c.fillStyle = this.gradient;
    c.fillText("Julius Bautista", 20, 40)
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x * diffMult
    this.y = this.y + this.velocity.y * diffMult
  }

}

class Player {
  constructor(x,y,radius,color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

}

class Projectile {
  constructor(x, y, radius, color, velocity) {

    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x * (1 + combo/2000)
    this.y = this.y + this.velocity.y * (1 + combo/2000)
  }

}

class Ai {
  constructor(x, y, radius, color, velocity) {

    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color 
    c.fill()
  }

  update() {
    this.draw()
    this.x = this.x + this.velocity.x * diffMult
    this.y = this.y + this.velocity.y * diffMult
  }

}


const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 24, currentColor)
const title = new Title(x, y, 24, currentColor)

const projectile = new Projectile(
  player.x,
  player.y,
  5,
  player.color,
  {
    x: 1,
    y: 1
  }
)

//Displays Title class, currently with single draw render.  Let's try adding an "enter" link.
function displayTitle() {

}

const projectiles = []
const aiArray = []

function playerMove() {
  
}



function spawnAI() {
  setInterval(() => {
    const radius = Math.random() * (30 - 10) + 10

    let x;
    let y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }
    const color = invertColor(player.color)
    const angle = Math.atan2(
      player.y - y,
      player.x - x
    )
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    aiArray.push(new Ai(x,y,radius,color,velocity))
  }, intervalMult)
  
  setInterval(() => {
    const radius = Math.random() * (30 - 10) + 10

    let x;
    let y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }
    const color = splitComp(player.color, 2)
    const angle = Math.atan2(
      player.y - y,
      player.x - x
    )
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    aiArray.push(new Ai(x,y,radius,color,velocity))
  }, intervalMult)
}

//ANIMATION
let animationId
function animate() {
  animationId = requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width,canvas.height)
  player.draw()
  title.draw()
  currentColor = player.color
  intervalMult = 1000 - (combo)
  // preShake();
  // //
  // // drawThings();
  // //
  // postShake();
  
  //animate Projectile
  projectiles.forEach((projectile, index) => {
    projectile.update()
    //Out of bounds
    if (
      projectile.x - projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
        setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    }
  })

  //animate.Collider
  aiArray.forEach((ai, index) => {
    ai.update()
    //Out of Bounds
    if (
      ai.x - ai.radius < 0 ||
      ai.x - ai.radius > canvas.width ||
      ai.y + ai.radius < 0 ||
      ai.y - ai.radius > canvas.height
    ) {
        setTimeout(() => {
        aiArray.splice(index, 1)
      }, 0)
    }

    //player hit
    const dist = Math.hypot(player.x - ai.x, player.y - ai.y)
    //end combo
    if (dist - ai.radius - player.radius <1) {
      if (combo >= 1) {
        combo -= 2
        console.log('Combo broken!!')
      }
      // startShake();
      // setInterval(startShake,2500);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - ai.x, projectile.y - ai.y)

      //if objects collide
      if (dist - ai.radius - projectile.radius < 1) {
        setTimeout(() => {
          aiArray.splice(index, 1)
          projectiles.splice(projectileIndex, 1)
          combo += 100
          console.log(`Combo: ${combo/100}`)
        }, 0)

      }
    })
  }) 
}


//Was this going to be for pausing?
addEventListener('keyup', event => {
  if (event.code == 'Space') {
    console.log('space')
  }
});

//Player Movement
addEventListener('mousemove', function(event) => {
  myFunction(event);
});
                 
function myFunction(e) {                 
  player.x = e.clientX;
  player.y = e.clientY;
};

// WASD movement
addEventListener('keydown', event => {
  spd = 4
  if (event.keyCode == 87) {
    player.y -= (3 + spd);  
    console.log(`Key "w" pressed  [event: keydown]`);
  }else if (event.keyCode == 83) { 
    player.y += (3 + spd);
    console.log(`Key "s" repeating  [event: keydown]`); 
  }else if (event.keyCode == 65) { 
    player.x -= (3 + spd);
    console.log(`Key "a" repeating  [event: keydown]`);
  }else if (event.keyCode == 68) { 
    player.x += (3 + spd);
    console.log(`Key "d" repeating  [event: keydown]`); }
});

//Shoots projectile on Click
addEventListener('click', () => {
  const angle = Math.atan2(
    event.clientY - player.y,
    event.clientX - player.x
  )
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }

  projectiles.push(
    new Projectile(player.x, player.y, 3, player.color, velocity)
  )
})

animate()
spawnAI() 
