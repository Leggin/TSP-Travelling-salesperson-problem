function bruteForce(lexOrder, cities) {
    this.order = [];
    this.cities = [];
    this.bestLex = [];
    this.distance;
    this.getShortestPath = function(lexOrder, cities) {
        this.order = lexOrder.slice();
        this.cities = cities.slice();
        this.bestLex = lexOrder.slice();
        this.distance = calcDistance(this.cities, this.order);

        while (this.nextOrder()) {
            var d = calcDistance(this.cities, this.order);
            if (d < this.distance) {
                this.distance = d;
                this.bestLex = this.order.slice();
            }
        }
        var bestCityOrder = [];
        for (var i = 0; i < this.bestLex.length; i++) {
            var n = this.bestLex[i];
            bestCityOrder.push(cities[n]);
        }
        return bestCityOrder;
    }

    this.nextOrder = function() {
        var largestX = -1;
        for (var i = 0; i < this.order.length - 1; i++) {
            if (this.order[i] < this.order[i + 1]) {
                largestX = i;
            }
        }
        if (largestX == -1) {
            return false;
        }
        var largestY = -1;
        for (var j = 0; j < this.order.length; j++) {
            if (this.order[largestX] < this.order[j]) {
                largestY = j;
            }
        }
        swap(this.order, largestX, largestY);
        var endArray = this.order.splice(largestX + 1);
        endArray.reverse();
        this.order = this.order.concat(endArray);
        return true;
    }

    function calcDistance(points, order) {
        var sum = 0;
        for (var i = 0; i < order.length; i++) {
            sum += dist(points[order[i]].x, points[order[i]].y, points[order[(i + 1) % order.length]].x, points[order[(i + 1) % order.length]].y)
        }
        return sum;
    }

    function swap(a, i, j) {
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

}
