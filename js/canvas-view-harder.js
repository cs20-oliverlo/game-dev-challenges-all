// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 720;
cnv.height = 480;

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
}

// Reset Variables
let player;
let walls;
let camera;

reset();


// Animation
requestAnimationFrame(animate);

function animate() {
    // Fill Background
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Wall Helper Functions
    for (let i = 0; i < walls.length; i++) {
        draw(walls, i);
    }

    // Player Helper Functions
    draw(player);
    playerMovement();
    checkCollision();

    // Camera Movement
    cameraMovement();
    
    // Request Animation Frame
    requestAnimationFrame(animate);
}

function draw(shape, n) {
    if (shape === walls) {
        ctx.fillStyle = `${shape[n].color}`;
        ctx.fillRect(shape[n].x - camera.x, shape[n].y - camera.y, shape[n].w, shape[n].h);
    } else {
        ctx.fillStyle = `${shape.color}`;
        ctx.fillRect(shape.x - camera.x, shape.y - camera.y, shape.w, shape.h);
    }
}

function playerMovement() {
    playercontrols();

    // Moves Player
    player.yV += player.yAccel;
    player.y += player.yV;

    // Max Y velocity
    if (player.yV > 10) {
        player.yV = 10;
    } else if (player.yV < -10) {
        player.yV = -10;
    }
}

function playercontrols() {
    if (player.up === true) {
        player.yV = -10;
    }
    if (player.left === true) {
        player.x -= player.xV;
    }
    if (player.right === true) {
        player.x += player.xV;
    }
}

function checkCollision() {
    for (let i = 0; i < walls.length; i++) {
        // Wall Detection
        // Top (of player)
        if (player.y < walls[i].y + walls[i].h && player.y > walls[i].y && player.x + player.xV < walls[i].x + walls[i].w && player.x + player.w - player.xV > walls[i].x) {
            player.y = walls[i].y + walls[i].h;
            player.yV = 0;
        }
        // Bottom (of player)
        if (player.y + player.h > walls[i].y && player.y + player.h < walls[i].y + walls[i].h && player.x + player.xV < walls[i].x + walls[i].w && player.x + player.w - player.xV > walls[i].x) {
            player.y = walls[i].y - player.h;
            player.yV = 0;
        }
        // Left (of player)
        if (player.x < walls[i].x + walls[i].w && player.x > walls[i].x && player.y < walls[i].y + walls[i].h && player.y + player.h > walls[i].y) {
            player.x = walls[i].x + walls[i].w;
        }
        // Right (of player)
        if (player.x + player.w > walls[i].x && player.x + player.w < walls[i].x + walls[i].w && player.y < walls[i].y + walls[i].h && player.y + player.h > walls[i].y) {
            player.x = walls[i].x - player.w;
        }
    }
}

function cameraMovement() {
    // Update Camera Position
    camera.x = (player.x + player.w / 2) - camera.w / 2
    camera.y = (player.y + player.h / 2) - camera.h / 2

    // Contrain Cameras X value
    if (camera.x < walls[0].x) {
        camera.x = walls[0].x;
    } else if (camera.x + camera.w > walls[1].x + walls[1].w) {
        camera.x = walls[1].x + walls[1].w - camera.w;
    }

    // Constrain Cameras Y value
    if (camera.y < walls[2].y + walls[2].h / 2) {
        camera.y = walls[2].y + walls[2].h / 2;
    } else if (camera.y + camera.h > walls[3].y + walls[3].h / 2) {
        camera.y = walls[3].y + walls[3].h / 2 - camera.h;
    }
}

function newWall(x1, y1, w1, h1, color1) {
    return {
            x: x1,
            y: y1,
            w: w1,
            h: h1,
            color: color1
    }
}

function reset() {
    walls = [];
    // Border Walls
    walls.push(newWall(0, 0, 200, 1100, "grey"));
    walls.push(newWall(1850, 0, 200, 1100, "grey"));
    walls.push(newWall(0, 0, 2150, 200, "grey"));
    walls.push(newWall(0, 1100, 2150, 200, "grey"));

    // Platforms
    let vert = (walls[3].y - (walls[2].y + walls[2].h));
    let hori = walls[0].w + 320;
    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
            walls.push(newWall(hori, vert, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 200, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 400, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 600, 150, 20, "grey"));
        } else {
            walls.push(newWall(hori, vert + 100, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 200 + 100, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 400 + 100, 150, 20, "grey"));
            walls.push(newWall(hori, vert - 600 + 100, 150, 20, "grey"));
        }
        hori += 205;
    }

    player = {
        x: walls[0].x + walls[0].w * 1.5,
        y: vert,
        w: 20,
        h: 20,
        color: "blue",
        up: false,
        left: false,
        right: false,
        xV: 5,
        yV: 0,
        yAccel: 1
    };

    camera = {
        x: 0,
        y: 0,
        w: cnv.width,
        h: cnv.height
    };
}