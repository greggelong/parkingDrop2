let img;
let cvn;
let inst;
let msg;
let gotit = false;
let img2;
let osc; // off screen canvas
let wrn;
let vScale;
// Load the imacnvet
let tiles = [];
let tilesst = [];
let board = [];
let col = 20;
let row = 10; // but they are twice as big
let output;
let cnv;
let lasttouch = 0;
let mix = false;
let startimg;
let img3;

function preload() {
  img3 = loadImage("jin2.png");
}

function setup() {
  print("behi", img);
  cvn = createCanvas(800, 840);
  cvn.parent("sketch-holder");
  let cx = windowWidth / 2 - cvn.width / 2;
  let cy = windowHeight / 2 - cvn.height / 2;
  //cvn.position(cx,cy)
  wrn = select("#out");
  wrn.html("Drag and Drop an Image");
  background(255);
  //inst = createP("Click and hold the mouse button to sort!")
  wrn.style("color", "red");
  pixelDensity(1);

  cvn.drop(handleFile, handleDrop);
  vScale = 40;
  //img2 = createImage(400,400)

  // Resize the image
  // at this level each pixel is two by two to screen
  //img.resize(400,400);
  img3.resize(800, 840);

  // start make list
  makeliststart();

  doit();

  noSmooth(); // keeps it crisp
  //image(img, 0, 0, width, height);
  print("hi");
}
async function handleFile(file) {
  // Remove the current image, if any.
  if (img) {
    img.remove();
    print("this is it", img);

    //osc.clear()
  }
  // is the problem a-sync******
  // Create an  element with the
  // dropped file.
  img = await createImg(file.data, "");
  //img.hide();
  if (img.width > 0 || img.height > 0) {
    osc = createGraphics(img.width, img.height);

    osc.drawingContext.drawImage(img.elt, 0, 0);
    //img.hide();

    img2 = osc.get(0, 0, osc.width, osc.height);
    img2.resize(800, 840);

    // Draw the image.
    img.hide();
    makelist();
    doit();
    //image(img2,width/2,height/2)
    gotit = true;
    print(gotit);
    sort = false; // so it doest start sorting right away
    wrn.html("Clicking the Mouse toggles sorting");
  } else {
    img.hide();
    gotit = false;
    print("try again");
    wrn.html("SORRY: Try to place the image AGAIN");
    sort = false;
  }
}

function handleDrop(event) {
  gotit = false;
  // Remove current paragraph, if any.
  //if (msg) {
  //  msg.remove();
  //}

  // Use event to get the drop
  // target's id.
  let id = event.target.id;

  // Write the canvas' id
  // beneath it.
  // msg = createP(id);
  // msg.position(0, 100);

  // // Set the font color
  // // randomly for each drop.
  // let c = random(['red', 'green', 'blue']);
  // msg.style('color', c);
  // msg.style('font-size', '12px');
}

function doit() {
  let newmap = "Mapping: ";

  if (mix === false) {
    background(55);
    // show simple board
    s2();

    for (let i = 0; i < board.length; i++) {
      newmap += i + " : " + i + " / ";
    }
  } else {
    // shuffle and show board
    background(55);
    //shuffle(board, true);
    partialShuffleInPlace(board, 20);
    s3();

    for (let i = 0; i < board.length; i++) {
      newmap += i + " : " + board[i] + " / ";
    }
  }

  //output.html(newmap);
}

function makelist() {
  tiles = [];
  board = []; // needed to clear board and indexes were repeated
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two becassue its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);
      if (x % 2 == 0) {
        let imgpt = img2.get(x * vScale, y * vScale, vScale, vScale * 2);
        board.push(index);
        let tile = new Tile(index, imgpt);
        tiles.push(tile);
      } else {
        let imgpt = img2.get(x * vScale, (y + 1) * vScale, vScale, vScale * 2);
        board.push(index);
        let tile = new Tile(index, imgpt);
        tiles.push(tile);
      }
      index++;
    }
  }
}

function makeliststart() {
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two becassue its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);
      if (x % 2 == 0) {
        let imgpt = img3.get(x * vScale, y * vScale, vScale, vScale * 2);
        board.push(index);
        let tile = new Tile(index, imgpt);
        tiles.push(tile);
      } else {
        let imgpt = img3.get(x * vScale, (y + 1) * vScale, vScale, vScale * 2);
        board.push(index);
        let tile = new Tile(index, imgpt);
        tiles.push(tile);
      }
      index++;
    }
  }
}

function s2() {
  // shows the tile index
  background(55);
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two because its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);

      if (x % 2 == 0) {
        image(
          tiles[index].img,
          x * vScale,
          y * vScale,
          vScale - 4,
          vScale * 2 - 4
        );
      } else {
        image(
          tiles[index].img,
          x * vScale,
          (y + 1) * vScale,
          vScale - 4,
          vScale * 2 - 4
        );
      }
      index++;
    }
  }
}

function s3() {
  background(55);
  let index = 0;
  for (let y = 0; y < row * 2; y += 2) {
    // goes up by two because its twice as big
    // for each y there are some x's
    for (let x = 0; x < 20; x++) {
      noFill();
      stroke(0);

      let tileIndex = board[index];
      let imgpt = tiles[tileIndex].img;

      if (x % 2 == 0) {
        image(imgpt, x * vScale, y * vScale, vScale - 4, vScale * 2 - 4);
      } else {
        image(imgpt, x * vScale, (y + 1) * vScale, vScale - 4, vScale * 2 - 4);
      }
      index++;
    }
  }
}

function touchStarted() {
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    /// toggle mix
    if (!mix) {
      mix = true;
      doit();
    } else {
      mix = false;
      doit();
    }
  }

  lasttouch = currenttime;
}

function mouseClicked() {
  touchStarted();
}

function keyPressed() {
  // this will download the first 25 seconds of the animation!
  //if (key === 'g') {
  //  saveGif('reflection.gif', 15);
  // }
  if (key === "s") {
    saveCanvas("parkingDrop", "jpg");
  }
}

function partialShuffleInPlace(array, numToShuffle) {
  // Limit the number to shuffle to the array's length
  numToShuffle = Math.min(numToShuffle, array.length);

  // Shuffle only the first `numToShuffle` items
  for (let i = 0; i < numToShuffle; i++) {
    let pick = floor(random(array.length - 1));
    let randomIndex = Math.floor(Math.random() * numToShuffle);
    [array[pick], array[randomIndex]] = [array[randomIndex], array[pick]];
  }
  print(board);
}
