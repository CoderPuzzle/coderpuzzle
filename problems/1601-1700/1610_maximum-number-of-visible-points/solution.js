/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
var visiblePoints = function (points, angle, location) {
    const [posx, posy] = location;
    let same = 0;
    const degrees = [];
    for (const [x, y] of points) {
        if (x === posx && y === posy) {
            same++;
        } else {
            let deg = (Math.atan2(y - posy, x - posx) * 180) / Math.PI;
            if (deg < 0) deg += 360;
            degrees.push(deg);
        }
    }

    degrees.sort((a, b) => a - b);
    const n = degrees.length;
    const doubled = degrees.concat(degrees.map((d) => d + 360));

    const eps = 1e-9;
    let best = 0;
    let left = 0;
    for (let right = 0; right < doubled.length; right++) {
        while (doubled[right] - doubled[left] > angle + eps) left++;
        best = Math.max(best, Math.min(right - left + 1, n));
    }

    return same + best;
};
