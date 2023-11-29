// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 550;

// EVENT STUFF
let mouseX;
let mouseY;

document.addEventListener("mousemove", mousemoveHandler);
function mousemoveHandler(e) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);
}

// Animation
requestAnimationFrame(animate);
function animate() {
    // Fill Background
    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, cnv.width, cnv. height);

    // Food Helper Functions
    for (let i = 0; i < food.length; i++) {
        drawCircles(food, i);
    }
    eatFood();
    spontaneousGeneration();

    // Player Helper Functions
    drawCircles(player, 0);
    if (mouseX !== undefined && mouseY !== undefined) {
        playerMovement();
    }

    // Request Animation Frame
    requestAnimationFrame(animate);
}

// Reset Variables
let player;
let food;
let foodTimer;

reset();

function drawCircles(circle, n) {
    if (circle === food) {
        ctx.fillStyle = circle[n].color;
        ctx.beginPath();
        ctx.arc(circle[n].x, circle[n].y, circle[n].r, circle[n].startAngle, circle[n].endAngle * Math.PI);
        ctx.fill();
    } else {
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, circle.startAngle, circle.endAngle * Math.PI);
        ctx.fill();

        ctx.lineWidth = circle.lineWidth;
        ctx.strokeStyle = `${circle.ringColor}`;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function playerMovement() {
    let run1 = mouseX - player.x;
    let rise1 = mouseY - player.y;
    let hyp1 = Math.sqrt(run1 ** 2 + rise1 ** 2);
    let hyp2 = 125 / player.r;
    let scale = hyp1 / hyp2;
    let run2 = run1 / scale;
    let rise2 = rise1 / scale;

    if (hyp1 > 2.5) {
        player.x += run2 / 2.5;
        player.y += rise2 / 2.5;
    }

    if (player.x < 0) {
        player.x = 0;
    } else if (player.x > cnv.width) {
        player.x = cnv.width;
    }
    
    if (player.y < 0) {
        player.y = 0;
    } else if (player.y > cnv.height) {
        player.y = cnv.height;
    }
}

function eatFood() {
    for (let i = 0; i < food.length; i++) {
        let run = food[i].x - player.x;
        let rise = food[i].y - player.y;
        let d = Math.sqrt(run ** 2 + rise ** 2);

        if (d < player.r + food[i].r) {
            player.r += food[i].r / 8;
            food.splice(i, 1);
        }
    }
}

function spontaneousGeneration() {
    foodTimer++;
    if (foodTimer === 180) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));
        foodTimer = 0;
    }
}

function newFood(x1, y1, r1, startAngle1, endAngle1, color1) {
    return {
            x: x1,
            y: y1,
            r: r1,
            startAngle: startAngle1,
            endAngle: endAngle1,
            color: color1
        };
}

function reset() {
    player = {
        x: cnv.width / 2,
        y: cnv.height / 2,
        r: 10,
        lineWidth: 3,
        startAngle: 0,
        endAngle: 2,
        xVelocity: randomInt(-5, 5),
        yVelocity: randomInt(-5, 5),
        ringColor: "blue",
        color: "rgb(193, 193, 247)"
    };

    food = [];
    foodTimer = 0;
    for (let i = 0; i < 25; i++) {
        food.push(newFood(randomInt(0, cnv.width), randomInt(0, cnv.height), randomInt(5, 15), 0, 2, `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`));
    }
}