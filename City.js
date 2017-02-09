function City(x, y) {
    this.x = x;
    this.y = y;

    this.show = function() {
        stroke(255, 160, 0, 150);
        fill(230, 110, 0,200);
        ellipse(this.x + citySize / 2, this.y + citySize / 2, citySize, citySize);
    }

}
