/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
    const n = position.length;
    // Cars cannot pass each other, so sweep from the car nearest
    // the target backward.
    const cars = Array.from({ length: n }, (_, i) => [position[i], speed[i]]);
    cars.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    let fleets = 0;
    let lastTime = 0.0;
    for (const [pos, spd] of cars) {
        // A car's fate is its alone-time to the target.
        const time = (target - pos) / spd;
        // Strictly later never catches the fleet ahead: a new
        // fleet lead. Otherwise it merges (equality at the target
        // merges), and lastTime — the current fleet's arrival
        // time — stays put.
        if (time > lastTime) {
            fleets++;
            lastTime = time;
        }
    }
    return fleets;
};
