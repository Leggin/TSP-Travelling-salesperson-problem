function NNH(cities) {

    this.openSet = cities.slice();
    this.closedSet = [];
    this.starterCitys = cities.slice();
    this.getShortestPath = function() {
        var bestPath = [];
        var bestPathLength = Number.MAX_SAFE_INTEGER;
        while (this.starterCitys.length > 0) {
            var start = getNext(this.starterCitys);
            removeCity(this.starterCitys, start);
            this.closedSet.push(start);
            removeCity(this.openSet, start);

            while (this.openSet.length > 0) {
                var bestValue = Number.MAX_SAFE_INTEGER;
                var bestCity = undefined;
                for (var i = 0; i < this.openSet.length; i++) {
                    var d = dist(start.x, start.y, this.openSet[i].x, this.openSet[i].y);
                    if (d < bestValue) {
                        bestValue = d;
                        bestCity = this.openSet[i];
                    }
                }
                this.closedSet.push(bestCity);
                removeCity(this.openSet, bestCity);
                start = bestCity;
            }
            if (pathLength(this.closedSet) < bestPathLength) {
                bestPath = this.closedSet;
                bestPathLength = pathLength(this.closedSet);
            }
            this.closedSet = [];
            this.openSet = cities.slice();
        }
        return bestPath;
    }

    function getNext(array) {
        if (array.length > 0)
            return array[0];
        else
            return false;
    }

    function removeCity(array, obj) {
        array.splice(array.indexOf(obj), 1);
    }


}
