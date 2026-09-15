/**
 * @param {number} radius
 * @param {number} xCenter
 * @param {number} yCenter
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @return {boolean}
 */
var checkOverlap = function (radius, xCenter, yCenter, x1, y1, x2, y2) {
    // The nearest point of an axis-aligned box to any point is found
    // coordinate-wise: clamp each coordinate into the box's interval.
    const nearestX = Math.max(x1, Math.min(xCenter, x2));
    const nearestY = Math.max(y1, Math.min(yCenter, y2));
    const dx = xCenter - nearestX;
    const dy = yCenter - nearestY;
    return dx * dx + dy * dy <= radius * radius;
};
