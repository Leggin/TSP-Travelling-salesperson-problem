var cities = [];
var citySize = 20;
var shortestPath = [];
var order = [];
var inputCities = [];
var bf;
var pathlength=0;
function setup() {
    createCanvas(600, 600)
    strokeWeight(3);
    setUpInput();
    var order = [];
    bf = new bruteForce();
}

function draw() {
    background(51);
    stroke(100, 100, 100);
    drawCities();
    if (started) {
        setupPreconditions();
        shortestPath = bf.getShortestPath(order, cities);
        pathlength = pathLength(shortestPath);
        started = false;
        calculateRoute();
    }
    if (shortestPath != false)
        drawPath(shortestPath);

}

function setupPreconditions() {
    cities = [];
    order = [];
    for (var i = 0; i < numberOfCities; i++) {
        var xPos = parseInt(inputx[i].value());
        var yPos = parseInt(inputy[i].value());
        cities.push(new City(xPos, yPos));
        order[i] = i;
    }
}

function pathLength(path) {
    var distance = 0;
    for (var i = 0; i < path.length; i++) {
        distance += dist(path[i].x, path[i].y, path[(i + 1)%path.length].x, path[(i + 1)%path.length].y);
   }
    return distance;
}

function drawCities() {
    inputCities = [];
    for (var i = 0; i < numberOfCities; i++) {
        var xPos = parseInt(inputx[i].value());
        var yPos = parseInt(inputy[i].value());
        inputCities.push(new City(xPos, yPos));
    }
    for (var i = 0; i < inputCities.length; i++) {
        inputCities[i].show();
    }
}

function drawPath(path) {
    noFill();
    ellipse(path[0].x + citySize / 2, path[0].y + citySize / 2, 10, 10);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x + citySize / 2, path[i].y + citySize / 2);
    }
    vertex(path[0].x + citySize / 2, path[0].y + citySize / 2);
    endShape();

    fill(255, 255, 0);
    drawOrientationVector(path);
}

function drawOrientationVector(path){
  var v = createVector((path[1].x + citySize / 2) - (path[0].x + citySize / 2), (path[1].y + citySize / 2) - (path[0].y + citySize / 2));
  v.setMag(0.5 * v.mag());
  applyMatrix();
  translate(path[0].x + citySize / 2, path[0].y + citySize / 2);
  stroke(255, 0, 0, 150);
  line(0, 0, v.x, v.y);
  stroke(255, 160, 0, 150);
  resetMatrix();
}
