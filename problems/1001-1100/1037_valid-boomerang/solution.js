/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function (points) {
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    const [x3, y3] = points[2];
    // Cross product of (p2 - p1) and (p3 - p1); zero exactly when the two
    // edge vectors are parallel, which also covers any duplicate point (a
    // zero vector is parallel to everything).
    const cross = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
    return cross !== 0;
};
