function City(x, y) {
    this.x = x;
    this.y = y;

    this.show = function() {
        stroke(255, 100, 0, 100);
        fill(20, 200, 0);
        ellipse(this.x + citySize / 2, this.y + citySize / 2, citySize, citySize);
    }

}
