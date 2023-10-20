const btn = document.querySelector('.menu-btn')

btn.addEventListener('click', () => {
  document.body.classList.toggle('menu-open')
  menu()
})

const items = document.querySelectorAll('.menu-item')
let isOpen = false
function menu() {
  isOpen = !isOpen
  items.forEach((item, idx) => {
    if (isOpen) {
      setTimeout(() => {
        item.classList.add('active')
      }, idx * 100 + 100)
    } else {
      item.classList.remove('active')
    }
  })
}

var c = document.getElementById('menuBG'),
  ctx = c.getContext('2d'),
  cw = (c.width = window.innerWidth),
  ch = (c.height = window.innerHeight),
  points = [],
  tick = 0,
  opt = {
    count: 8,
    range: {
      x: 0,
      y: 0,
    },
    duration: {
      min: 40,
      max: 70,
    },

    strokeColor: '#ffff',
    level: 1,
    curved: true,
  },
  rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  ease = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
  }

const img = new Image()
img.src =
  window.innerWidth > 768
    ? './assets/images/aqua.jpg'
    : './assets/images/aqua2.jpg'
// Only use the image after it's loaded
img.onload = () => {
  const pattern = ctx.createPattern(img, 'repeat')
  ctx.lineJoin = 'round'
  ctx.lineWidth = 0
  ctx.strokeStyle = opt.strokeColor
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, cw, ch)
}

var Point = function (config) {
  this.anchorX = config.x
  this.anchorY = config.y
  this.x = config.x
  this.y = config.y
  this.setTarget()
}

Point.prototype.setTarget = function () {
  this.initialX = this.x
  this.initialY = this.y
  if (isOpen) {
    this.targetY = 0
  } else {
    this.targetY = ch
  }
  this.targetX = this.anchorX + rand(opt.range.x * 2, 0) - opt.range.x

  this.tick = 0
  this.duration = rand(opt.duration.min, opt.duration.max)
}

Point.prototype.update = function () {
  var dx = this.targetX - this.x
  var dy = this.targetY - this.y
  var dist = Math.sqrt(dx * dx + dy * dy)

  if (Math.abs(dist) <= 0) {
    this.setTarget()
  } else {
    var t = this.tick
    var b = this.initialY
    var c = this.targetY - this.initialY
    var d = this.duration
    this.y = ease(t, b, c, d)

    b = this.initialX
    c = this.targetX - this.initialX
    d = this.duration
    this.x = ease(t, b, c, d)

    this.tick++
  }
}

Point.prototype.render = function () {
  ctx.beginPath()
  ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false)
  // ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.fillRect()
}

var updatePoints = function () {
  var i = points.length
  while (i--) {
    points[i].update()
  }
}

var renderPoints = function () {
  var i = points.length
  while (i--) {
    points[i].render()
  }
}

var renderShape = function () {
  ctx.beginPath()
  var pointCount = points.length
  ctx.moveTo(points[0].x, points[0].y)
  var i
  for (i = 0; i < pointCount - 1; i++) {
    var c = (points[i].x + points[i + 1].x) / 2
    var d = (points[i].y + points[i + 1].y) / 2
    ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
  }
  ctx.lineTo(0, ch)
  ctx.lineTo(cw, ch + opt.range.y)
  ctx.closePath()
  // ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.fill()
  ctx.stroke()
}

var clear = function () {
  ctx.clearRect(0, 0, cw, ch)
}

let count = 0
var loop = function () {
  tick++
  clear()
  updatePoints()
  renderShape()
  //renderPoints();
}

var i = opt.count + 2
var spacing = (cw + opt.range.x * 2) / (opt.count - 1)
while (i--) {
  points.push(
    new Point({
      x: spacing * (i - 1) - opt.range.x,
      y: ch - ch * opt.level,
    })
  )
}

var stop = false
var frameCount = 0
var fps, fpsInterval, startTime, now, then, elapsed

// initialize the timer variables and start the animation

function startAnimating(fps) {
  fpsInterval = 1000 / fps
  then = Date.now()
  startTime = then
  animate()
}
// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {
  // request another frame
  requestAnimationFrame(animate)

  // calc elapsed time since last loop
  now = Date.now()
  elapsed = now - then

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval)

    // Put your drawing code here
    loop()
  }
}
startAnimating(60)
