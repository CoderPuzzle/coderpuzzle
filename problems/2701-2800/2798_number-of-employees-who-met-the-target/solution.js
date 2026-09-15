/**
 * @param {number[]} hours
 * @param {number} target
 * @return {number}
 */
var numberOfEmployeesWhoMetTarget = function (hours, target) {
    // One pass bumps a counter whenever hours[i] >= target; "at least"
    // makes equal-to-target count, which is what Example 1 pins down.
    let met = 0;
    for (const worked of hours) {
        if (worked >= target) ++met;
    }
    return met;
};
