/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function (coordinates) {
    const x1 = coordinates[0][0],
        y1 = coordinates[0][1];
    const x2 = coordinates[1][0],
        y2 = coordinates[1][1];
    // Cross product against the first two points: zero means the vector is
    // parallel to the fixed direction, vertical lines included.
    for (let i = 2; i < coordinates.length; ++i) {
        const x = coordinates[i][0],
            y = coordinates[i][1];
        if ((x - x1) * (y2 - y1) !== (y - y1) * (x2 - x1)) return false;
    }
    return true;
};
