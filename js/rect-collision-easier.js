// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 550;

// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    if (event.code === "ArrowUp") {
        player.up = true;
    }
    if (event.code === "ArrowLeft") {
        player.left = true;
    }
    if (event.code === "ArrowRight") {
        player.right = true;
    }
    if (event.code === "ArrowDown") {
        player.down = true;
    }
}

function keyupHandler(event) {
    if (event.code === "ArrowUp") {
        player.up = false;
    }
    if (event.code === "ArrowLeft") {
        player.left = false;
    }
    if (event.code === "ArrowRight") {
        player.right = false;
    }
    if (event.code === "ArrowDown") {
        player.down = false;
    }
}

// Reset Variables
let player;
let walls;

reset();

// Animation
requestAnimationFrame(animate);
function animate() {
      ctx.clearRect(0, 0, cnv.width, cnv.height);

    for (let i = 0; i < walls.length; i++) {
        draw(walls, i);
    }

    draw(player);
    playerMovement();
    checkCollision();

    // Request Animation Frame
    requestAnimationFrame(animate);
}

function draw(shape, n) {
    if (shape === walls) {
        ctx.fillStyle = `${shape[n].color}`;
        ctx.fillRect(shape[n].x, shape[n].y, shape[n].w, shape[n].h);
    } else {
        ctx.fillStyle = `${shape.color}`;
        ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
    }
}

function playerMovement() {
    if (player.up === true) {
        player.y -= player.v;
    }
    if (player.left === true) {
        player.x -= player.v;
    }
    if (player.right === true) {
        player.x += player.v;
    }
    if (player.down === true) {
        player.y += player.v;
    }
}

function checkCollision() {
    // Walls Detection
    for (let i = 0; i < walls.length; i++) {
        // Top (of player)
        if (player.y < walls[i].y + walls[i].h && player.y > walls[i].y && player.x < walls[i].x + walls[i].w && player.x + player.w > walls[i].x) {
            reset();
        }
        // Left (of player)
        if (player.x < walls[i]. x + walls[i].w && player.x > walls[i].x && player.y < walls[i].y + walls[i].h && player.y + player.h > walls[i].y) {
            reset();
        }
        // Right (of player)
        if (player.x + player.w > walls[i]. x && player.x + player.w  < walls[i].x + walls[i].w && player.y < walls[i].y + walls[i].h && player.y + player.h > walls[i].y) {
            reset();
        }
        // Bottom (of player)
        if (player.y + player.h > walls[i].y && player.y + player.h < walls[i].y + walls[i].h && player.x < walls[i].x + walls[i].w && player.x + player.w > walls[i].x) {
            reset();
        }
    }
}

function newWall(x1, y1, w1, h1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1,
        }
}

function reset() {
    player = { 
        x: 50,
        y: cnv.height / 2,
        w: 20,
        h: 20,
        v: 5,
        color: "blue",
        up: false,
        left: false,
        right: false,
        down: false
    };
    
    walls = [];
    walls.push(newWall(0, 0, cnv.width, 20, "grey"));
    walls.push(newWall(0, 0, 20, cnv.height, "grey"));
    walls.push(newWall(cnv.width - 20, 0, 20, cnv.height, "grey"));
    walls.push(newWall(0, cnv.height - 20, cnv.width, 20, "grey"));
    walls.push(newWall(0, cnv.height - 20, cnv.width, 20, "grey"));
    walls.push(newWall(125, 175, 100, 20, "grey"));
    walls.push(newWall(500, 20, 20, 100, "grey"));
    walls.push(newWall(300, 100, 20, 225, "grey"));
    walls.push(newWall(400, 150, 150, 20, "grey"));
    walls.push(newWall(450, 250, 20, 150, "grey"));
    walls.push(newWall(600, 200, 150, 20, "grey"));
    walls.push(newWall(200, 325, 20, 175, "grey"));
    walls.push(newWall(600, 300, 20, 150, "grey"));
    walls.push(newWall(250, 400, 150, 20, "grey"));
    walls.push(newWall(380, 450, 20, 100, "grey"));
}