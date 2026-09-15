/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOrAfterOperations = function (nums, k) {
    const n = nums.length;
    let total = 0;
    for (const value of nums) total |= value;

    const groupsFor = function (forbidden) {
        let groups = 0;
        let running = -1;
        for (const value of nums) {
            running &= value;
            if ((running & forbidden) === 0) {
                ++groups;
                running = -1;
            }
        }
        if (running !== -1 && groups === 0) return -1;
        return groups;
    };

    let forbidden = 0;
    for (let bit = 29; bit >= 0; --bit) {
        const candidate = forbidden | (1 << bit);
        const groups = groupsFor(candidate);
        if (groups !== -1 && n - groups <= k) forbidden = candidate;
    }
    return total & ~forbidden;
};
