var inputx = [];
var inputy = [];
var textCities = [];
var textTravel = [];
var travelInput = [];
var startButton, randomButton, sel;
var textP, textX, textY, err, timeWarning;
var numberOfCities;
var started = false;

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
    }
    travelInput[0] = createInput(50);
    travelInput[1] = createInput(50);
    travelInput[2] = createInput();
    travelInput[3] = createInput();

    travelInput[0].position(width + 162, 395);
    travelInput[1].position(width + 40, 434);
    travelInput[2].position(width + 40, 460);
    travelInput[3].position(width + 40, 482);

    travelInput[0].size(50, 20);
    travelInput[1].size(50, 20);

    travelInput[0].changed(inputChangedEvent);
    travelInput[1].changed(inputChangedEvent);

    travelInput[0].hide();
    travelInput[1].hide();
    travelInput[2].hide();
    travelInput[3].hide();
    mySelectEvent();
    setupButtons();
}

function setupButtons() {
    startButton = createButton("start");
    startButton.position(width + 40, 360);
    startButton.mousePressed(startButtonclickEvent);
    randomButton = createButton("Zufallszahlen");
    randomButton.position(width + 100, 360);
    randomButton.mouseReleased(randomButtonClicked);
}

function setupText() {
    textP = createP("Anzahl St&auml;dte: ");
    textX = createP("x-Pixel");
    textY = createP("y-Pixel");
    err = createP("Boxen sind nicht vollst&auml;ndig");
    timeWarning = createP("Dies kann einige Minuten dauern.");
    textTravel[0] = createP("Wenn 1 Kilometer ");
    textTravel[1] = createP(" Pixeln entspricht, befindet sich der Handlungsreisende bei einer geschwindigkeit von ");
    textTravel[2] = createP("Km/h fuer die Strecke: ");

    textP.position(width + 20, 0)
    textX.position(width + 90, 40)
    textY.position(width + 150, 40)
    err.position(width + 40, 370);
    timeWarning.position(width + 160, 0);
    textTravel[0].position(width + 40, 380);
    textTravel[1].position(width + 220, 380);
    textTravel[2].position(width +100, 420);

    err.style("color", "#ff0000");

    err.hide();
    timeWarning.hide();
    textTravel[0].hide();
    textTravel[1].hide();
    textTravel[2].hide();
}

function inputChangedEvent() {
    calculateRoute();
}

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

function randomButtonClicked() {
    for (var i = 0; i < numberOfCities; i++) {
        inputx[i].value(floor(random(20, width - 20)));
        inputy[i].value(floor(random(20, height - 20)));
    }
}

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

function calculateRoute() {
    textTravel[0].show();
    textTravel[1].show();
    textTravel[2].show();
    travelInput[0].show();
    travelInput[1].show();
    travelInput[2].show();
    travelInput[3].show();
    var dis = (pathlength / parseInt(travelInput[0].value()));

    var time = int(60 * ((dis / parseInt(travelInput[1].value()))));

    travelInput[2].value(int(dis) + " Km");
    travelInput[3].value(time + " Minuten");
}

function mySelectEvent() {
    var item = Number(sel.value());
    numberOfCities = item;
    timeWarning.hide();
    if (numberOfCities == 10)
        timeWarning.show();
    for (var i = 0; i < 10; i++) {
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
