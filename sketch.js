var cities = [];
var citySize = 20;
var shortestPath = [];
var order = [];
var inputCities = [];
var bf;
var pathlength = 0;

//setup canvas
function setup() {
    createCanvas(600, 600)
    strokeWeight(3);
    setUpInput();
    var order = [];
    bf = new bruteForce();
}

//is called every 1/60 s, draws the canvas elements
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
//setup city values when start button is pushed
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
//returns from the given order-index the citys index from the input cities array
function getCityIndexOf(index) {
    for (var i = 0; i < shortestPath.length; i++) {
      if(shortestPath[index] == cities[i])
        return i;
    }
}
//returns the euclidean length of a given path
function pathLength(path) {
    var distance = 0;
    for (var i = 0; i < path.length; i++) {
        distance += dist(path[i].x, path[i].y, path[(i + 1) % path.length].x, path[(i + 1) % path.length].y);
    }
    return distance;
}
//draws the citites according to their x and y position
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
//draws a given path as vertices, iterating the indeces from 0
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
//returns the euclidean distance between two given city indeces from an array
function getDistanceOfCities(ary,indexA, indexB) {
    return dist(ary[indexA].x, ary[indexA].y, ary[indexB].x, ary[indexB].y);
}
//draws the orientation vector from first city to second city 
function drawOrientationVector(path) {
    var v = createVector((path[1].x + citySize / 2) - (path[0].x + citySize / 2), (path[1].y + citySize / 2) - (path[0].y + citySize / 2));
    v.setMag(0.5 * v.mag());
    stroke(0, 0, 255, 150);
    strokeWeight(2);
    applyMatrix();
    translate(path[0].x + citySize / 2, path[0].y + citySize / 2);
    line(0, 0, v.x, v.y);
    resetMatrix();
    strokeWeight(3);
    stroke(255, 160, 0, 150);
}
