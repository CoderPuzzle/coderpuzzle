/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    let total = 0;
    let tank = 0;
    let start = 0;
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        // total witnesses whether the whole circuit is feasible at all.
        total += diff;
        // tank is the running surplus measured from the candidate start.
        tank += diff;
        if (tank < 0) {
            // Restarting anywhere in [start, i] forfeits a non-negative
            // surplus, so an intermediate start reaches i with even less
            // fuel: the whole stretch is disqualified in one stroke.
            start = i + 1;
            tank = 0;
        }
    }
    // total >= 0 certifies the final candidate can finish the circuit.
    return total >= 0 ? start : -1;
};
