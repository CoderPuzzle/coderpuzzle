/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean[]}
 */
var subsequenceSumAfterCapping = function (nums, k) {
    const n = nums.length;
    const mask = (1n << BigInt(k + 1)) - 1n;
    const counts = new Array(n + 1).fill(0);
    for (const value of nums) {
        counts[value] += 1;
    }
    let reach = 1n;
    let leq = 0;
    const answer = new Array(n).fill(false);
    for (let x = 1; x <= n; x++) {
        for (let c = 0; c < counts[x]; c++) {
            reach |= (reach << BigInt(x)) & mask;
        }
        leq += counts[x];
        const above = n - leq;
        let found = false;
        for (let m = 0, r = k; m <= above && r >= 0; m++, r -= x) {
            if ((reach >> BigInt(r)) & 1n) {
                found = true;
                break;
            }
        }
        answer[x - 1] = found;
    }
    return answer;
};
