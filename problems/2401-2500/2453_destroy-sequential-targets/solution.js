/**
 * @param {number[]} nums
 * @param {number} space
 * @return {number}
 */
var destroyTargets = function (nums, space) {
    // Two targets are destroyed by one seed exactly when their values
    // share a residue modulo space (their difference is a multiple of
    // space), so group nums by nums[i] % space. The smallest value of
    // the largest group seeds the machine and wipes the whole group.
    const counts = new Map();
    const mins = new Map();
    for (const value of nums) {
        const r = value % space;
        counts.set(r, (counts.get(r) || 0) + 1);
        const current = mins.get(r);
        if (current === undefined || value < current) {
            mins.set(r, value);
        }
    }
    const best = Math.max(...counts.values());
    let answer = Infinity;
    for (const [r, count] of counts) {
        if (count === best) {
            answer = Math.min(answer, mins.get(r));
        }
    }
    return answer;
};
