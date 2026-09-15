/**
 * @param {number[][]} units
 * @return {number}
 */
var maxRatings = function (units) {
    if (units[0].length === 1) {
        return units.reduce((sum, device) => sum + device[0], 0);
    }

    let globalMinimum = Infinity;
    let smallestSecond = Infinity;
    let secondSum = 0;
    for (const device of units) {
        let first = Infinity;
        let second = Infinity;
        for (const capacity of device) {
            if (capacity < first) {
                second = first;
                first = capacity;
            } else if (capacity < second) {
                second = capacity;
            }
        }
        globalMinimum = Math.min(globalMinimum, first);
        smallestSecond = Math.min(smallestSecond, second);
        secondSum += second;
    }
    return secondSum - smallestSecond + globalMinimum;
};
