/**
 * @param {number[][]} towers
 * @param {number} radius
 * @return {number[]}
 */
var bestCoordinate = function (towers, radius) {
    let bestX = 0;
    let bestY = 0;
    let bestQuality = -1;

    for (let x = 0; x <= 50; x++) {
        for (let y = 0; y <= 50; y++) {
            let total = 0;
            for (const [tx, ty, tq] of towers) {
                const dx = tx - x;
                const dy = ty - y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d <= radius) {
                    total += Math.floor(tq / (1 + d));
                }
            }
            if (total > bestQuality) {
                bestQuality = total;
                bestX = x;
                bestY = y;
            }
        }
    }

    return [bestX, bestY];
};
