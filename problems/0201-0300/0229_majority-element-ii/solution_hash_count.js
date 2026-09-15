/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
    // A hash map counts every occurrence directly: one sweep tallies each
    // value into a table keyed by the value itself, and the map ends up
    // holding each distinct value's exact frequency.
    const counts = new Map();
    for (const value of nums) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    // At most two values can clear the n/3 bar, so one selection pass over
    // the entries finds the only two tallies that can matter: a strictly
    // greater tally takes the top slot, demoting the leader, and ties keep
    // the earlier entry — harmless, since equal tallies qualify or fail
    // together.
    const threshold = Math.floor(nums.length / 3);
    let bestValue = 0;
    let bestCount = 0;
    let secondValue = 0;
    let secondCount = 0;
    for (const [value, count] of counts) {
        if (count > bestCount) {
            secondValue = bestValue;
            secondCount = bestCount;
            bestValue = value;
            bestCount = count;
        } else if (count > secondCount) {
            secondValue = value;
            secondCount = count;
        }
    }
    // Selection only nominates; the threshold check is where an exactly-n/3
    // value is excluded and an unfilled slot — a tally of zero — fails. Map
    // keys are distinct, so the slots cannot collide.
    const result = [];
    if (bestCount > threshold) result.push(bestValue);
    if (secondCount > threshold) result.push(secondValue);
    // At most two answers survive; sorting pins the ascending order the
    // examples show.
    return result.sort((a, b) => a - b);
};
