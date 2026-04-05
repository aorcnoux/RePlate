// 1.npm install
// 2.npm start
// 3.打開localhost3000

let foodcar;
let car1, car2, car3, car4, car5;
let gameBackground;

let sushiAnimation;
let bentoAnimation;
let cakeAnimation;

let dragOffsetX = 0;
let dragOffsetY = 0;
let isDragging = false;
let draggingSprite = null;

let foodSprites = []; // 存放食物的 Sprite 陣列
let usedPositions = []; // 已使用的位置
let foodPositions = [
    { x: 500, y: 330 }, { x: 625, y: 330 }, { x: 743, y: 330 },
    { x: 855, y: 330 }, { x: 500, y: 391 }, { x: 625, y: 391 },
    { x: 743, y: 391 }, { x: 855, y: 391 }, { x: 500, y: 452 },
    { x: 625, y: 452 }, { x: 743, y: 452 }, { x: 855, y: 452 },
    { x: 500, y: 514 }, { x: 625, y: 514 }, { x: 743, y: 514 },
    { x: 855, y: 514 }
];

let countdown = 60; // 設定倒數時間（秒）
let startTime; // 儲存開始時間
let numberFont;

let currentFoodIndex = 0; // 用於追蹤目前應該出現的食物數量
let foodInterval; // 控制食物出現的間隔
const foodChoice = [
    { title: 'sushi', anima: null },
    { title: 'bento', anima: null },
    { title: 'cake', anima: null }
];

let gameState = "pressToStart"; 
let startBackgroundImage;
let endBackgroundImage;

let gates = []; // 保存所有車輛的陣列
const gateTypes = ["sushi", "bento", "cake"]; // 定義類型
const initialGatePositions = [
    { x: 150, y: 150 },
    { x: 150, y: 550 },
    { x: 1300, y: 450 },
    { x: 1300, y: 250 },
    { x: 150, y: 350}
];
// 初始化图片索引
let carImageIndex = 0;
let buttons = []; // 按鈕物件陣列
let buttonImage, actionImages = [];

const labels = ["分送街友", "作為肥料", "再生能源", "直接丟棄"];

const buttonWidth = 250; // 選擇按鈕寬度
const buttonHeight = 80; // 選擇按鈕高度
let buttonImages = [];

let car, foodItems = [];
let foodImages = [];
let carImage;
let draggedSprite = null;
let startMove = false;

let backgroundX1 = 0; // 第一張背景初始位置
let backgroundX2; // 第二張背景初始位置
let scrollSpeed = 5; // 滑動速度
let isScrolling = true; // 控制背景是否繼續滑動
let newBackground; // 新背景圖片

let count = 3;

let isAbandon = false;
let isFertilizer = false;
let isTramp = false;
let isTransform = false;

let restartSituation = false;
let restartButtonWidth = 100; // 假設圖片寬度
let restartButtonHeight = 100; // 假設圖片高度
let restartButtonX = 180 - restartButtonWidth / 2;
let restartButtonY = 100 * 6 + 100;


let sounds = {}
let yummyPlayed = false;
let endPlayed = false;

let foodIcons ={};


function preload() {
    startEndBackgroundImage = loadImage('pic/startBackground.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    startGameImage = loadImage('pic/startGame.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    titleImage = loadImage('pic/title.png', (img) => {
        img.resize(img.width * 0.45, img.height * 0.45);
    });
    gameBackgroundImage = loadImage('pic/gameBackground.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    endGameImage = loadImage('pic/endGame.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    smallGameImage = loadImage('pic/road.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    End4Image = loadImage('pic/abandon.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    End2Image = loadImage('pic/fertilizer.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    End1Image = loadImage('pic/tramp.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    End3Image = loadImage('pic/transform.png', (img) => {
        img.resize(img.width * 0.75, img.height * 0.75);
    });
    thankYouImage = loadImage('pic/thankyou.png', (img) => {
        img.resize(img.width * 0.5, img.height * 0.5);
    });
    cryImage = loadImage('pic/cry.png', (img) => {
        img.resize(img.width * 0.5, img.height * 0.5);
    });
    restartButtonImage = loadImage("pic/restartButton.png");

    
    
    buttonImages[0] = loadImage("pic/choiceButton1.png");
    buttonImages[1] = loadImage("pic/choiceButton2.png");
    buttonImages[2] = loadImage("pic/choiceButton3.png");
    buttonImages[3] = loadImage("pic/choiceButton4.png");

    for (let i = 0; i < 4; i++) {
        actionImages.push(loadImage(`pic/fertilizer.png`)); // 對應的圖片-改名字image${i}
    }


    foodcarImage = loadImage('pic/foodcar.png', (img) => {
        img.resize(img.width * 0.6, img.height * 0.6);
    });

    numberFont = loadFont('Leckerli_One/LeckerliOne-Regular.ttf');
    chineseFont = loadFont('Noto_Sans_TC/static/NotoSansTC-ExtraBold.ttf');

    sushiAnimation = loadAnimation('pic/sushi0.png', 'pic/sushi6.png');
    bentoAnimation = loadAnimation('pic/bento0.png', 'pic/bento6.png');
    cakeAnimation = loadAnimation('pic/cake0.png', 'pic/cake6.png');

    foodChoice[0].anima = sushiAnimation;
    foodChoice[1].anima = bentoAnimation;
    foodChoice[2].anima = cakeAnimation;

    carImage = loadImage("pic/car5.png");
    foodImages.push(loadImage("pic/sushi0.png"));
    foodImages.push(loadImage("pic/bento0.png"));
    foodImages.push(loadImage("pic/cake0.png"));


    sounds.yummy = createAudio('Yummy.mp3');
    sounds.end = createAudio('End.mp3');
    sounds.press = createAudio('Press.mp3');
    sounds.release = createAudio('Release.mp3');
    sounds.cargo = createAudio('Cargo.mp3');
    // sounds.cargo = loadSound('Cargo.mp3');

    foodIcons['bento'] = loadImage('pic/bento0.png');
    foodIcons['sushi'] = loadImage('pic/sushi0.png');
    foodIcons['cake'] = loadImage('pic/cake0.png');
}

function setup() {
    // createCanvas(windowWidth, windowHeight);
    createCanvas(1440,778);
}

function draw() {
    if(gameState === "pressToStart"){
        background(230);
        textFont(chineseFont, 27);
        fill(69, 12, 14);
        textAlign(CENTER, CENTER);
        text("點一下開始遊戲", width / 2, height / 2);
    }else if (gameState === "start") {
        console.log(windowWidth, windowHeight); //(1440,778)
        if(!yummyPlayed){
            sounds.end.stop();
            sounds.yummy.play();
            sounds.yummy.elt.loop = true;
            yummyPlayed = true;
            endPlayed = false;
        }
        drawStartScreen();
    }else if (gameState === "start2") {
        drawStartScreen2()
    }else if(gameState === "start3"){
        drawStartScreen3()
    }
    else if (gameState === "playing") {
        drawGame();
    } else if (gameState === "choose") {
        if(!endPlayed){
        sounds.yummy.stop();
        yummyPlayed = false;
        sounds.end.play();
        sounds.end.elt.loop = true;
        endPlayed = true;
        }
        
        drawEndScreen();
    }else if (gameState === "smallGame") {
        drawSmallGame();
    }
}

function drawStartScreen() {
    background(startEndBackgroundImage);

    imageMode(CENTER);
    image(startGameImage, width / 2, height / 2);
    image(titleImage, width / 2, height / 2 + 60);

    fill(255);
    textAlign(CENTER, CENTER);
    textFont(numberFont, 50);
}

function drawStartScreen2() {
    let x = width / 2;
    let y = height / 2 - 100; // 初始 y 座標
    let lineHeight = 40; // 行高

    background(startEndBackgroundImage);

    imageMode(CENTER);
    image(startGameImage, width / 2, height / 2);

    fill(175, 30, 36);
    textAlign(CENTER, CENTER);
    textFont(chineseFont, 50);
    text("遊戲理念", x, y);
    y += lineHeight + 20;

    textFont(chineseFont, 27);
    fill(69, 12, 14);
    text("全球每年浪費 13 億噸食物", x, y);
    y += lineHeight;
    text("但仍有 8 億人受飢餓之苦", x, y);
    y += lineHeight;
    text("食物浪費是一整條供應鏈的問題", x, y);
    y += lineHeight + 10;
    text("在遊戲中", x, y);
    y += lineHeight;
    text("不斷湧出的訂單和食物分別代表過度消費及生產", x, y);
    y += lineHeight;
    text("請玩家在有限時間內合理分配食物", x, y);
    y += lineHeight;
    text("為地球與飢餓人口帶來改變！", x, y);
}

function drawStartScreen3() {
    let x = width / 2;
    let y = height / 2 - 100; // 初始 y 座標
    let lineHeight = 40; // 行高

    background(startEndBackgroundImage);

    imageMode(CENTER);
    image(startGameImage, width / 2, height / 2);

    fill(175, 30, 36);
    textAlign(CENTER, CENTER);
    textFont(chineseFont, 50);
    text("遊戲規則", x, y);
    y += lineHeight + 30;

    textFont(chineseFont, 27);
    fill(69, 12, 14);
    text("遊戲時間為60秒", x, y);
    y += lineHeight;
    text("餐車櫃子會持續生產食物", x, y);
    y += lineHeight;
    text("玩家需將正確的食物拖曳至對應的外送訂單", x, y);
    y += lineHeight + 10;
    fill(175, 30, 36);
    text("注意：", x, y);
    y += lineHeight;
    fill(69, 12, 14);
    text("食物有保鮮期限 若放置過久會變黑壞掉", x, y);
    y += lineHeight;
    text("導致空間與食物的浪費", x, y);
    y += lineHeight;
    text("請把握時間 完成訂單挑戰！", x, y);
}

function drawGame() {
    background(gameBackgroundImage);

    // 計算剩餘時間
    const elapsedTime = Math.floor((millis() - startTime) / 1000);
    const remainingTime = max(0, countdown - elapsedTime);

    if (remainingTime === 0) {
        gameState = "choose"; // 切換到結束畫面
        clearInterval(foodInterval);
    }

    textAlign(CENTER, TOP);
    textFont(numberFont, 120);
    fill(200, 0, 0);
    text(`${remainingTime}`, width / 2, 10);

    drawSprites();

    for (let sprite of foodSprites) {
        stopAnimationAtFrame(sprite, 7);
    }

    for (let gate of gates) {
        if (gate.sprite) {
            let x = gate.sprite.position.x;
            let y = gate.sprite.position.y;

            // 畫圖示
            if (foodIcons[gate.type]) {
                image(foodIcons[gate.type], x - 55, y - 105, 45, 45);
            }

            // 畫數字
            push();
            textAlign(LEFT, CENTER);
            textSize(40);
            fill(0);

            text(`× ${gate.foodDemand}`, x + 5, y - 85);

            pop();
        }
    }
}

function drawEndScreen() {
    for (let gate of gates) {
        if (gate.msg) {
            gate.msg.remove(); // 移除 msg
        }
    };
    background(startEndBackgroundImage);

    let x = width / 2;
    let y = height / 2 - 100; // 初始 y 座標
    let lineHeight = 40; // 行高

    imageMode(CENTER);
    image(endGameImage, width / 2, height / 2);

    fill(69, 12, 14);
    textAlign(CENTER, CENTER);
    textFont(chineseFont, 27);
    text("Oh No! 一天結束了", x, y);
    y += lineHeight;
    text("該如何處理多餘的食物呢？", x, y);
    y += lineHeight + 70; // 調整文字和按鈕之間的間距

    // 顯示按鈕圖片及文字，兩列，每列兩個
    for (let i = 0; i < buttonImages.length; i++) {
        // 計算列和行的位置
        let col = i % 2; // 列：0 或 1
        let row = floor(i / 2); // 行：0 或 1

        // 計算按鈕的 X 和 Y 座標
        let buttonX = x - buttonWidth + col * (buttonWidth + 30) + 100; // 每列間隔20
        let buttonY = y + row * (buttonHeight + 20); // 每行間隔20

        // 顯示按鈕圖片
        image(buttonImages[i], buttonX, buttonY, buttonWidth, buttonHeight);


        // 顯示按鈕上的文字
        fill(245); // 按鈕文字顏色
        textFont(chineseFont, 27);
        text(labels[i], buttonX, buttonY); // 按鈕上的文字
    }
}


function drawSmallGame() {
    if (startMove === false) {
        background(smallGameImage);
        let x = width / 2;
        let y = height / 4 - 100;

        fill(69, 12, 14);
        textAlign(CENTER, CENTER);
        textFont(chineseFont, 27);
        text("把多餘的食物交給外送員吧！", x, y);

        // 將車輛放置到螢幕位置
        car.position.x = width / 2 + 400; 
        car.position.y = height / 2 + 200; 
        car.display();

        // 繪制所有食物精靈
        for (let food of foodItems) {
            food.display();
        } 
    } else if (startMove === true) {
        // 滑動畫布背景
        drawScrollingBackground();
        car.display(); // 車輛保持不動

    }
}

function drawScrollingBackground() {
    // 繪制兩張背景
    image(smallGameImage, backgroundX1, 0, width, height);
    if (isTramp){
        image(End1Image, backgroundX2, 0, width, height);
    }else if (isFertilizer){
        image(End2Image, backgroundX2, 0, width, height);
    }else if(isTransform){
        image(End3Image, backgroundX2, 0, width, height);
    }else if (isAbandon){
        image(End4Image, backgroundX2, 0, width, height);
    }
    

    // 更新背景 X 座標
    backgroundX1 += scrollSpeed;
    backgroundX2 += scrollSpeed;

    // 循環切換背景
    if (backgroundX1 < -width) {
        backgroundX1 = width;
    }
    if (backgroundX2 < -width - 400 ) {
        backgroundX2 = width;
    }
    if (backgroundX2 >= 0) {
        backgroundX2 = 0;
        imageMode(CENTER);

        if (isTramp){
            image(thankYouImage, width / 2 + 10, height / 2 - 110);
        }else if (isFertilizer){
            image(thankYouImage, width / 2 - 20, height / 2 - 80);
        }else if(isTransform){
            image(thankYouImage, width / 2 + 70, height / 2 - 170);
        }else if (isAbandon){
            image(cryImage, width / 2 + 80, height / 2 - 150);
        }
        // 顯示重新開始按鈕
        drawRestartButton();
    }
}

function drawRestartButton() {
    restartSituation = true;
    // 繪製按鈕圖片
    image(restartButtonImage, restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight);
}

function restartGame() {
    // 重置遊戲相關狀態
    console.log('restart!');
    backgroundX1 = 0;
    backgroundX2 = -width - 400; // 恢復初始位置
    isTramp = false;
    isFertilizer = false;
    isTransform = false;
    isAbandon = false;

    usedPositions = [];
    foodSprites.forEach(sprite => sprite.remove());
    foodSprites = [];

    car.remove();
    restartSituation = false;
    console.log(restartSituation = false)
    // sounds.end.pause();
    // sounds.yummy.elt.currentTime = 0;

    // 重置遊戲進度
    startMove = false;
    count = 3; // 假設初始食物數量

    gameState = "start";
}

function mousePressed() {
    sounds.press.play();
    sounds.press.elt.loop = false;

    if (gameState === "pressToStart"){
        sounds.yummy.play();
        sounds.yummy.elt.loop = true;
        yummyPlayed = true;
        gameState = "start";
    }else if (gameState === "start") {
        gameState = "start2"
    }else if(gameState === "start2"){
        gameState = "start3"
    }else if(gameState === "start3"){
        startGame();
    }else if (gameState === "playing") {
        handleMousePressDuringGame();
    } else if  (gameState === "choose") {
        let x = width / 2; 
        let y = height / 2 - 100 + 40 * 2 + 70;
    
        for (let i = 0; i < buttonImages.length; i++) {
            let col = i % 2;
            let row = floor(i / 2);
    
            let buttonX = x - buttonWidth + col * (buttonWidth + 30) + 100;
            let buttonY = y + row * (buttonHeight + 20);

            if (
                mouseX > buttonX - buttonWidth / 2 &&
                mouseX < buttonX + buttonWidth / 2 &&
                mouseY > buttonY - buttonHeight / 2 &&
                mouseY < buttonY + buttonHeight / 2
            ) {
                // 當按鈕被點擊
                if (i === 0){
                    isTramp = true;
                }else if (i === 1){
                    isFertilizer = true;
                }else if(i === 2){
                    isTransform = true;
                }else if (i === 3){
                    isAbandon = true;
                }
                console.log(`按鈕 ${labels[i]} 被點擊`);
                console.log(isTramp, isFertilizer, isTransform, isAbandon);
                startSmallGame();
                // gameState = "end1"
                // 在此處添加按鈕被點擊後的行為
            }
        }
    }else if(gameState === "smallGame"){
        if(restartSituation === false){
            smallGameHandleMousePressDuringGame();
        }else if(restartSituation === true){
            console.log("restartButtonPress!!")
            if (
                mouseX > restartButtonX - restartButtonWidth / 2 &&
                mouseX < restartButtonX + restartButtonWidth / 2 &&
                mouseY > restartButtonY - restartButtonHeight / 2 &&
                mouseY < restartButtonY + restartButtonHeight / 2
            ) {
                restartGame();
                console.log('restart!');
            }
        } 
    }
}

function startGame() {
    gameState = "playing";
    startTime = millis();

    foodcar = createSprite(1440 / 2, 778 / 9 * 5);
    foodcar.addImage('foodcar', foodcarImage);
    for (const pos of initialGatePositions) {
        createGate(pos.x, pos.y);
    }

    // 每隔一段時間生成食物
    foodInterval = setInterval(() => {
        // 檢查條件：所有位置都被使用，且所有食物動畫都停留在第七幀
        const allPositionsUsed = usedPositions.length === foodPositions.length;
        const allSpritesStopped = foodSprites.every(sprite => sprite.animation.getFrame() === 6);
    
        if (allPositionsUsed && allSpritesStopped) {
            clearInterval(foodInterval); // 停止生成
            gameState = "choose";
            console.log("所有位置已被使用，且所有食物都停留在第七幀，停止生成食物");
        } else if (usedPositions.length < foodPositions.length) {
            createFood(); // 呼叫 createFood
        }
    }, 1000);
}

function startSmallGame() {
    gameState = "smallGame";
    backgroundX2 = -width - 400;

    // 建立車輛
    // car = createSprite(windowWidth / 2, windowWidth / 2);
    car = createSprite(1440 / 2, 778 / 2);
    car.addImage(carImage);
    car.scale = 0.5; // 初始縮放比例

    // 建立食物物件
    for (let i = 0; i < foodImages.length; i++) {
        let food = createSprite(300 + i * random(250, 300), height / 4 + random(20, 200));
        food.addImage(foodImages[i]);
        food.scale = 0.2; // 初始縮放比例
        foodItems.push(food);
    }

}

// 隨機獲取一個位置
function getRandomPosition() {
    // 如果所有位置都被使用，重新打亂位置並清空已使用的位置
    if (usedPositions.length >= foodPositions.length) {
        shuffleArray(foodPositions);
        usedPositions = [];
    }

    // 選擇一個未使用的位置
    let position;
    do {
        const randomIndex = Math.floor(Math.random() * foodPositions.length);
        position = foodPositions[randomIndex];
    } while (usedPositions.includes(position));

    // 標記該位置為已使用
    usedPositions.push(position);
    return position;
}

// 在 createFood 函數中，記錄每個食物的初始位置
function createFood() {
    const position = getRandomPosition(); // 隨機位置
    const randomFoodIndex = Math.floor(Math.random() * foodChoice.length); // 隨機食物
    const chosenFood = foodChoice[randomFoodIndex];

    const sprite = createSprite(position.x, position.y);
    sprite.addAnimation(chosenFood.title, chosenFood.anima);
    // console.log(chosenFood.title)
    if(chosenFood.title === 'bento'){
        sprite.scale = 0.09;
    }else{
        sprite.scale = 0.068;
    }
    if (chosenFood.title === 'bento'){
        sprite.type = "bento";
    }else if(chosenFood.title === 'sushi'){
        sprite.type = "sushi";
    }else if(chosenFood.title === 'cake'){
        sprite.type = "cake";
    }
    sprite.animation.frameDelay = 30;
    console.log(sprite.type);
    // 初始位置
    sprite.originalX = position.x;
    sprite.originalY = position.y;

    foodSprites.push(sprite);
}

// 停止動畫在指定序列的函數
function stopAnimationAtFrame(sprite, frame) {
    if (sprite && sprite.animation) {
        if (sprite.animation.getFrame() >= frame - 1) {
            sprite.animation.stop();
            sprite.animation.changeFrame(frame - 1); // 停留在第七序列（編號為 6）
        }
    }
}

// 隨機打亂陣列的函數
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleMousePressDuringGame() {
    for (let sprite of foodSprites) {
        if (dist(mouseX, mouseY, sprite.position.x, sprite.position.y) < sprite.width / 2) {
            if (sprite.animation.getFrame() < 6) {
                isDragging = true;
                draggingSprite = sprite;
                dragOffsetX = sprite.position.x - mouseX;
                dragOffsetY = sprite.position.y - mouseY;
                break;
            }
        }
    }
}

function smallGameHandleMousePressDuringGame() {
    console.log("smallgame press");
    for (let food of foodItems) {
        if (dist(mouseX, mouseY, food.position.x, food.position.y) < food.width / 8) {
            draggedSprite = food; // 設置當前拖曳物
            dragOffsetX = mouseX - food.position.x;
            dragOffsetY = mouseY - food.position.y;
            isDragging = true;
            break;
        }
    }
}

function mouseDragged() {
    if (gameState === "playing") {
        if (isDragging && draggingSprite) {
            draggingSprite.position.x = mouseX + dragOffsetX;
            draggingSprite.position.y = mouseY + dragOffsetY;

            // 遍歷所有車輛 (Gate)，檢查條件
            let shouldEnlarge = false; // 是否放大標記
            gates.forEach(gate => {
                if (draggingSprite.overlap(gate.sprite) && draggingSprite.type === gate.sprite.type) {
                    shouldEnlarge = true;
                }
            });

            // 根據條件改變大小
            if(draggingSprite.type ==='bento'){
                draggingSprite.scale = shouldEnlarge ? 0.2 : 0.09;
            }else{
                draggingSprite.scale = shouldEnlarge ? 0.2 : 0.068;
            }
            
        }
    }else if (gameState === "smallGame"){
        smallGameMouseDragged();
    }
}

function smallGameMouseDragged() {
    // 如果正在拖拽某个精灵，更新其位置
    console.log("smallgame drag");
    if (isDragging && draggedSprite) {
        draggedSprite.position.x = mouseX - dragOffsetX;
        draggedSprite.position.y = mouseY - dragOffsetY;

        // 遍歷所有車輛 (Gate)，檢查條件
        let shouldEnlarge = false; // 是否放大標記

        if (draggedSprite.overlap(car)) {
            shouldEnlarge = true;
        }
        // 根據條件改變大小
        draggedSprite.scale = shouldEnlarge ? 0.4 : 0.2;

    }
}

function mouseReleased() {
    sounds.release.play();
    sounds.release.elt.loop = false;
    if (gameState === "playing") {
        if (isDragging && draggingSprite) {
            let matchedGate = null;

            // 檢查是否有符合條件的車輛
            gates.forEach(gate => {
                if (draggingSprite.overlap(gate.sprite) 
                    && draggingSprite.type === gate.sprite.type) {
                    matchedGate = gate;
                }
            });

            if (matchedGate) {
                // 如果符合條件，調用車輛處理邏輯
                matchedGate.checkBallCollision(draggingSprite);
                draggingSprite.remove();
                foodSprites = foodSprites.filter(sprite => sprite !== draggingSprite);
                // 將位置從已使用的位置中釋放
                usedPositions = usedPositions.filter(
                    pos => pos.x !== draggingSprite.originalX 
                    || pos.y !== draggingSprite.originalY
                );
            } else {
                // 如果不符合條件，恢復原位置
                draggingSprite.position.x = draggingSprite.originalX;
                draggingSprite.position.y = draggingSprite.originalY;
            }

            // 重置拖曳狀態
            isDragging = false;
            draggingSprite = null;
        }
    }else if (gameState === "smallGame"){
        if(restartSituation === false){
            smallGameMouseReleased();
        }else if(restartSituation === true){
            console.log("restartButtonRelease!!");
        }
        
    }
}

function smallGameMouseReleased() {
    console.log("smallgame release");
    if (isDragging && draggedSprite) {
        if (draggedSprite.overlap(car)) {
            // 移除食物
            foodItems = foodItems.filter(food => food !== draggedSprite);
            draggedSprite.remove();
            console.log(foodImages);
            count--;
            console.log(count);

            // 檢查是否所有食物都被移除
            if (count === 0) {
                console.log('count0!!!!!!');
                startMove = true;

            }
        } else {
            checkDropPosition(draggedSprite); // 檢查掉落地點
        }

        draggedSprite = null;
        isDragging = false;
    }
}

function checkDropPosition(sprite) {
    // 更新食物的位置到滑鼠释放的位置
    sprite.position.x = mouseX - dragOffsetX;
    sprite.position.y = mouseY - dragOffsetY;
}

function getRandom(x) {
    return Math.floor(Math.random() * x) + 1;
}

//餐車function
function createGate(x, y) {
    console.log("start gate!");

    // 檢查目前所有 gates，有沒有「很靠近同一位置」的
    // 如果有，刪掉舊的，避免重疊
    for (let i = gates.length - 1; i >= 0; i--) {
        if (gates[i].sprite && dist(gates[i].x, gates[i].y, x, y) < 5) {
            gates[i].sprite.remove(); // 刪除舊的 gate sprite
            gates.splice(i, 1); 
        }
    }

    const gateType = random(gateTypes); // 隨機分配 Gate 類型

    // 建立一個「餐車物件」
    const gate = {
        x: x,
        y: y,
        count: 0,
        foodDemand: getRandom(3),
        type: gateType,
        sprite: null,
        animationInterval: null,


        updateMsgPosition: function () {},

        init: function () {
            // 決定從哪裡進場
            const startX = this.x < width / 2 ? -150 : width + 150;
            this.sprite = createSprite(startX, this.y, 300, 300);

            const carImagesLeft = ['pic/car1.png', 'pic/car2.png', 'pic/car5.png'];
            const carImagesRight = ['pic/car3.png', 'pic/car4.png'];

            const carImages = this.x < width / 2 ? carImagesLeft : carImagesRight;
            const currentImage = random(carImages);

            this.sprite.addImage('car1', loadImage(currentImage));
            this.sprite.type = this.type;
            this.sprite.scale = 0.2;

            this.animateEntry(true);
            gates.push(this);
        },

        // 檢查食物球有沒有進來
        checkBallCollision: function (foodSprite) {
            if (this.sprite.overlap(foodSprite) && foodSprite.type === this.type) {
                this.onBallEnter(foodSprite);
                console.log("增加");
            }
        },

        // 食物進入餐車時
        onBallEnter: function (foodSprite) {
            this.count++; // 累計數量
            this.foodDemand--; // 剩餘需求減少


            if (this.foodDemand > 0) {
                this.sprite.changeImage('car2');
                setTimeout(() => {
                    this.sprite.changeImage('car1');
                }, 500);
            } else {
                console.log("餐車需求已完成，將更新餐車");

                sounds.cargo.volume(0.3);
                sounds.cargo.play();
                sounds.cargo.elt.loop = false;


                this.animateExit(() => {
                    this.sprite.remove();
                    gates.splice(gates.indexOf(this), 1);
                    createGate(this.x, this.y);
                });
            }
        },

        animateEntry: function (isFirst = false) {
            const targetX = this.x < width / 2 ? 150 : 1300;
            this.sprite.velocity.x = this.x < width / 2 ? 5 : -5;

            if (this.animationInterval) {
                clearInterval(this.animationInterval);
            }

            this.animationInterval = setInterval(() => {
                if (abs(this.sprite.position.x - targetX) < 10) {
                    this.sprite.velocity.x = 0;
                    this.sprite.position.x = targetX;
                    clearInterval(this.animationInterval);
                }
            }, 10);

            if (isFirst && abs(this.sprite.position.x - targetX) < 5) {
                this.sprite.velocity.x = 0;
                this.sprite.position.x = targetX;
                clearInterval(this.animationInterval);
            }
        },

        animateExit: function (callback) {
            this.sprite.velocity.x = this.x < width / 2 ? -5 : 5;

            if (this.animationInterval) {
                clearInterval(this.animationInterval);
            }

            this.animationInterval = setInterval(() => {
                if (
                    this.sprite.position.x < -150 ||
                    this.sprite.position.x > width + 150
                ) {
                    clearInterval(this.animationInterval);
                    if (callback) callback();
                }
            }, 20);
        }
    };

    gate.init(); // 初始化 gate
    return gate.sprite; // 返回 gate sprite
}