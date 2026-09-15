/**
 * @param {number[]} plants
 * @param {number} capacity
 * @return {number}
 */
var wateringPlants = function (plants, capacity) {
    let steps = plants.length;
    let remaining = capacity;
    for (let index = 0; index < plants.length; index++) {
        if (remaining < plants[index]) {
            steps += 2 * index;
            remaining = capacity;
        }
        remaining -= plants[index];
    }
    return steps;
};
