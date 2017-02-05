var cities = [];
var citySize = 20;
var openSet = [];
var closedSet = [];
var countSet = [];
var current;
var currentBestPath = [new City(-100, -100), new City(-100000, -100000)];
var startx, starty, endx, endy;
var first = true;
var index = 0;
var bestValue = 1000000;
var best = undefined;

function setup() {
    createCanvas(600, 600)
    strokeWeight(3);
    for (var i = 0; i < 10; i++) {
        cities.push(new City(floor(random(width - citySize)), floor(random(height - citySize))));
    }
    for (var i = 0; i < 10; i++) {
        openSet.push(cities[i]);
    }
    countSet = openSet.slice();
    closedSet.push(openSet[0]);
    current = openSet[0];
    rem(openSet, openSet[0]);
}

function draw() {
    background(51);
    stroke(100, 100, 100);
    drawPath(currentBestPath);
    stroke(255, 0, 100);
    drawPath(closedSet);
    drawCities();

    findNearestNeighbor();
}

function findNearestNeighbor() {
    if (countSet.length > 0) {
        if (openSet.length > 0) {
            //for (var i = 0; i < openSet.length; i++) {
            if (index < openSet.length) {
                var d = dist(current.x, current.y, openSet[index].x, openSet[index].y);
                if (d < bestValue) {
                    bestValue = d;
                    best = openSet[index];
                }
                index++;
                return;
            }
            addCity(best);
            index = 0;
            best = undefined;
            bestValue = 10000000;
            if (openSet.length == 0) {
                checkCurrentBest();
            }
        }
    }
}

function addCity(best) {
    text(dist(current.x, current.y, best.x, best.y), best.x, best.y);
    current = best;
    closedSet.push(best);
    rem(openSet, best);
}

function checkCurrentBest() {
    if (pathLength(currentBestPath) > pathLength(closedSet)) {
        currentBestPath = closedSet.slice();
    }
    openSet = closedSet.slice();
    closedSet = [];
    if (countSet.length > 0) {
        closedSet.push(countSet[0]);
        rem(openSet, countSet[0]);
        rem(countSet, countSet[0]);
    }
}

function drawCities() {
    for (var i = 0; i < cities.length; i++) {
        cities[i].show();
    }
}

function pathLength(path) {
    var distance = 0;
    for (var i = 0; i < path.length - 1; i++) {
        distance += dist(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
    }
    return distance;
}

function drawPath(path) {
    noFill();
    ellipse(path[0].x + citySize / 2, path[0].y + citySize / 2, 10, 10);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x + citySize / 2, path[i].y + citySize / 2);
    }
    endShape();
    fill(255, 255, 0);
}

function rem(array, item) {
    array.splice(array.indexOf(item), 1);
}
