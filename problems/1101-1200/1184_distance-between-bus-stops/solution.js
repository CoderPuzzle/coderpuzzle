/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {
    // Order the stops: edge i leads from stop i to stop i+1, so the
    // clockwise arc between them uses exactly the entries in between.
    var lo = Math.min(start, destination);
    var hi = Math.max(start, destination);
    var total = 0;
    var clockwise = 0;
    for (var i = 0; i < distance.length; i++) {
        total += distance[i];
        if (i >= lo && i < hi) {
            clockwise += distance[i];
        }
    }
    var other = total - clockwise;
    return Math.min(clockwise, other);
};
