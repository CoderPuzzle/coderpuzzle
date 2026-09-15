/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
    // Every box spends one truck slot regardless of type, so each slot
    // should hold the richest box still available: sort by units per box
    // descending and fill the truck front-to-back.
    boxTypes.sort((a, b) => b[1] - a[1]);
    let unitsTotal = 0;
    let remaining = truckSize;
    for (const [count, units] of boxTypes) {
        if (remaining === 0) {
            break;
        }
        const take = Math.min(count, remaining);
        // the total tops out at 10^9, far below Number's 2^53 ceiling for
        // exact integers, so plain number arithmetic stays exact throughout
        unitsTotal += take * units;
        remaining -= take;
    }
    return unitsTotal;
};
