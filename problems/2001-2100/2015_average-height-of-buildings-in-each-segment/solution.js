/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var averageHeightOfBuildings = function (buildings) {
    const events = new Map();
    for (const [start, end, height] of buildings) {
        const startEvent = events.get(start) ?? [0, 0];
        startEvent[0] += height;
        startEvent[1] += 1;
        events.set(start, startEvent);
        const endEvent = events.get(end) ?? [0, 0];
        endEvent[0] -= height;
        endEvent[1] -= 1;
        events.set(end, endEvent);
    }

    const coordinates = [...events.keys()].sort((a, b) => a - b);
    const street = [];
    let heightSum = 0;
    let count = 0;
    for (let index = 0; index + 1 < coordinates.length; ++index) {
        const left = coordinates[index];
        const event = events.get(left);
        heightSum += event[0];
        count += event[1];
        const right = coordinates[index + 1];
        if (count === 0) {
            continue;
        }
        const average = Math.floor(heightSum / count);
        const last = street[street.length - 1];
        if (last !== undefined && last[1] === left && last[2] === average) {
            last[1] = right;
        } else {
            street.push([left, right, average]);
        }
    }
    return street;
};
