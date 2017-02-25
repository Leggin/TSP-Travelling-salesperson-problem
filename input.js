var inputx = [];
var inputy = [];
var textCities = [];
var textTravel = [];
var travelInput = [];
var cityTimeStamp = [];
var output;
var startButton, randomButton, sel;
var textP, textX, textY, err, timeWarning;
var numberOfCities;
var started = false;

//sets up the html input for the cities
function setUpInput() {
    setupSelector();
    setupText();
    for (var i = 0; i < 10; i++) {
        textCities[i] = createP("Stadt " + (i + 1) + " :");
        textCities[i].position(width + 20, 64 + i * 25);
        inputx[i] = createInput();
        inputx[i].position(width + 90, 80 + i * 25);
        inputx[i].size(50, 20);
        inputy[i] = createInput();
        inputy[i].position(width + 145, 80 + i * 25);
        inputy[i].size(50, 20);
        cityTimeStamp[i] = createSpan("hallo");
        cityTimeStamp[i].position(width + 210, 78 + i * 25)
        cityTimeStamp[i].hide()
    }
    travelInput[0] = createInput(20);
    travelInput[1] = createInput(30);

    travelInput[0].parent(textTravel[0]);
    travelInput[1].parent(textTravel[1]);


    travelInput[0].size(50, 20);
    travelInput[1].size(50, 20);


    travelInput[0].changed(inputChangedEvent);
    travelInput[1].changed(inputChangedEvent);

    travelInput[0].hide();
    travelInput[1].hide();

    mySelectEvent();
    setupButtons();
}
//sets up the buttons for the html input
function setupButtons() {
    startButton = createButton("start");
    startButton.position(width + 40, 360);
    startButton.mousePressed(startButtonclickEvent);
    randomButton = createButton("Zufallszahlen");
    randomButton.position(width + 100, 360);
    randomButton.mouseReleased(randomButtonClicked);
}
//sets up the text for the html page
function setupText() {
    output = createP("");
    textP = createP("Anzahl St&auml;dte: ");
    textX = createP("x-Pixel");
    textY = createP("y-Pixel");
    err = createP("Boxen sind nicht vollst&auml;ndig");
    timeWarning = createP("Dies kann einige Minuten dauern.");
    textTravel[0] = createSpan("Wenn 1 Kilometer ");
    textTravel[1] = createSpan("Pixeln entspricht, mit durchschnittlich");
    textTravel[2] = createSpan("Km/h, ergibt sich: ");
    textTravel[3] = createSpan("Gesamt Streckenl&auml;nge = ");
    textTravel[4] = createSpan("");
    textTravel[5] = createSpan("Gesamt Fahrzeit = ");
    textTravel[6] = createSpan("");

    textTravel[0].parent(output);
    textTravel[1].parent(output);
    textTravel[2].parent(output);
    textTravel[3].parent(output);
    textTravel[4].parent(textTravel[3]);
    textTravel[5].parent(output);
    textTravel[6].parent(textTravel[5]);

    output.position(width + 40, 400)
    textP.position(width + 20, 0)
    textX.position(width + 90, 40)
    textY.position(width + 150, 40)
    err.position(width + 40, 370);
    timeWarning.position(width + 160, 0);
    // textTravel[0].position(width + 40, 380);
    textTravel[3].position(0, 110);
    textTravel[4].position(160, 0);
    textTravel[5].position(0, 140);
    textTravel[6].position(120, 0);


    err.style("color", "#ff0000");
    timeWarning.style("color", "#ff0000");
    err.hide();
    timeWarning.hide();
    textTravel[0].hide();
    textTravel[1].hide();
    textTravel[2].hide();
    textTravel[3].hide();
    textTravel[4].hide();
    textTravel[5].hide();
    textTravel[6].hide();
}
//is called when a changedEvent happened in an input box
function inputChangedEvent() {
    calculateRoute();
}
//sets up the drop down slector
function setupSelector() {
    sel = createSelect();
    sel.position(width + 120, 16);
    sel.option('4');
    sel.option('5');
    sel.option('6');
    sel.option('7');
    sel.option('8');
    sel.option('9');
    sel.option('10');
    sel.changed(mySelectEvent);
}
//fills the input boxes with random values when clicked
function randomButtonClicked() {
    for (var i = 0; i < numberOfCities; i++) {
        inputx[i].value(floor(random(20, width - 20)));
        inputy[i].value(floor(random(20, height - 20)));
    }
}
//checks if the input is numerical, sets the start boolean to true
function startButtonclickEvent() {
    for (var i = 0; i < numberOfCities; i++) {
        if (inputx[i].value().match(/^[0-9]+$/) && inputy[i].value().match(/^[0-9]+$/)) {
            err.hide();
            started = true;

        } else {
            started = false;
            err.show();
            timeWarning.hide();
            return;
        }

    }
}
//calculates the length, time, and citystamps from the given input boxes
function calculateRoute() {
    for (var i = 0; i < textTravel.length; i++) {
        textTravel[i].show();
    }
    travelInput[0].show();
    travelInput[1].show();
    var scale = parseInt(travelInput[0].value());
    var speed = parseInt(travelInput[1].value())
    var disSum = (pathlength / scale);
    var time = int(60 * (disSum / speed));
    textTravel[4].html(int(disSum) + "Km");
    textTravel[6].html(time + "Minuten");
    var dis = 0;
    for (var i = 0; i < numberOfCities; i++) {
        var cityTime = floor(60 * (dis / scale) / speed);
        cityTimeStamp[getCityIndexOf(i)].html("Minute " + cityTime);
        if (i < numberOfCities - 1)
            dis +=getDistanceOfCities(shortestPath,i, i + 1);
        cityTimeStamp[i].show();
    }
}
//sets up the select event for the drop down selector. Shows only as many citiy inputs as selected
function mySelectEvent() {
    var item = Number(sel.value());
    numberOfCities = item;
    timeWarning.hide();
    if (numberOfCities == 10)
        timeWarning.show();
    for (var i = 0; i < 10; i++) {
        cityTimeStamp[i].hide();
        if (i < item) {
            textCities[i].show();
            inputx[i].show();
            inputy[i].show();

        } else {
            textCities[i].hide();
            inputx[i].hide();
            inputy[i].hide();
        }
    }
}
