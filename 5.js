img = "";
status = "";
objects = [];
function preload() {
  img = loadImage("5.jfif");
}
function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function draw() {
  image(img, 0, 0, 640, 420);
  if (status != "") {
    document.getElementById("status").innerHTML = objects.length +" objects detected"   
    for (let i = 0; i < objects.length; i++) {
      percentage = floor(objects[i].confidence *100)
        fill("#FF0000");
      text(objects[i].label + " "+ percentage + "%", objects[i].x + 15 ,objects[i].y + 12);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
     
    }
  }
}
function modelLoaded() {
  console.log("model loaded");
  status = true;
  objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
  if (error) {
    console.log("error");
  } else {
    console.log(results);
    objects = results;
  }
}
