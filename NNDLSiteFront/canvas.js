var canvas;
var ctx;
window.addEventListener("load", () => {
  canvas = document.getElementsByClassName("canvas")[0];
  ctx = canvas.getContext("2d");
  resize();
  document.addEventListener("mousedown", startPaint);
  document.addEventListener("mouseup", stopPaint);
  document.addEventListener("mousemove", draw);
  window.addEventListener("resize", resize);
});
function resize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

let pos = { x: 0, y: 0 };

let isPainting = false;

function getPosition(event) {
  pos.x = event.clientX - canvas.offsetLeft;
  pos.y = event.clientY - canvas.offsetTop;
}

function startPaint(event) {
  isPainting = true;
  getPosition(event);
}
function stopPaint() {
  isPainting = false;
}

function draw(event) {
  if (!isPainting) return;

  ctx.beginPath();

  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";

  ctx.moveTo(pos.x, pos.y);
  getPosition(event);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();
}

function getData() {
  const data = ctx.getImageData(0, 0, 392, 392);
  console.log(data);
  return data;
}
function testRect() {
  const canvas = document.getElementsByClassName("canvas")[0];
  const ctx = canvas.getContext("2d");
  console.log("width", canvas.width);
  console.log("height", canvas.height);

  const imgdata = ctx.getImageData(0, 0, 392, 392);
  for (let i = 0; i < 100; i += 4) {
    console.log(imgdata.data[i + 3]);
  }
  console.log(imgdata.data.length);
}

async function putData() {
  const canvas = document.getElementsByClassName("canvas")[0];
  const ctx = canvas.getContext("2d");
  //ctx.webkitImageSmoothingEnabled = false;
  //ctx.mozImageSmoothingEnabled = false;
  //ctx.imageSmoothingEnabled = false;
  const imageData = getData();
  const ibm = await window.createImageBitmap(imageData);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(0.0714, 0.0714);

  ctx.drawImage(ibm, 0, 0);
  ctx.scale(14, 14);
  const smallData = ctx.getImageData(0, 0, 28, 28);
  console.log(smallData.data.length);
  for (let i = 0; i < 100; i += 4) {
    console.log(smallData.data[i + 3]);
  }

  const ibmsmall = await window.createImageBitmap(smallData);
  //ctx.scale(14, 14);
  //ctx.drawImage(ibmsmall, 0, 0,ibmsmall.width,ibmsmall.height);

  //ctx.putImageData(getData(), 10, 0);
  //console.log(data);
}

async function testGet() {
  fetch("http://localhost:3000/")
    .then((response) => response.text())
    .then((data) => console.log(data));
}

async function testTF() {
  var canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, 392, 392);
  var tfImage = tf.browser.fromPixels(imageData, 1);

  //Resizing
  var tfResizedImage = tf.image.resizeBilinear(tfImage, [28, 28]);
  //White is 255, black is 0
  tfResizedImage = tf.cast(tfResizedImage, "float32");
  tfResizedImage = tf
    .abs(tfResizedImage.sub(tf.scalar(255)))
    .div(tf.scalar(255))
    .flatten();
  
  tfResizedImage = tfResizedImage.reshape([1, 784]);
  console.log(tfResizedImage.print());
}
