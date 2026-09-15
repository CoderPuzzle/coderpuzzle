/**
 * @param {number[]} buses
 * @param {number[]} passengers
 * @param {number} capacity
 * @return {number}
 */
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
    buses.sort((a, b) => a - b);
    passengers.sort((a, b) => a - b);
    let boarded = 0;
    let j = 0;
    for (const bus of buses) {
        boarded = 0;
        while (j < passengers.length && boarded < capacity && passengers[j] <= bus) {
            j++;
            boarded++;
        }
    }
    let answer = boarded < capacity ? buses[buses.length - 1] : passengers[j - 1] - 1;
    const taken = new Set(passengers);
    while (taken.has(answer)) {
        answer--;
    }
    return answer;
};
