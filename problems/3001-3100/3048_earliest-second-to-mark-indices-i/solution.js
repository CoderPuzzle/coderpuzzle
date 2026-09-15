/**
 * @param {number[]} nums
 * @param {number[]} changeIndices
 * @return {number}
 */
var earliestSecondToMarkIndices = function (nums, changeIndices) {
    const canMark = (t) => {
        const last = new Array(nums.length).fill(0);
        for (let s = 1; s <= t; s++) last[changeIndices[s - 1] - 1] = s;
        let need = 0;
        let marked = 0;
        for (let s = 1; s <= t; s++) {
            const i = changeIndices[s - 1] - 1;
            if (last[i] === s) {
                need += nums[i];
                marked++;
                if (need > s - marked) return false;
            }
        }
        return marked === nums.length;
    };
    let lo = 1;
    let hi = changeIndices.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (canMark(mid)) hi = mid;
        else lo = mid + 1;
    }
    return canMark(lo) ? lo : -1;
};
