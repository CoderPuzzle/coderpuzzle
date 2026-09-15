/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
    const remainders = nums.map((value) => value % k);
    let answer = Number.MAX_SAFE_INTEGER;
    for (let x = 0; x < k; x++) {
        for (let y = 0; y < k; y++) {
            if (x === y) continue;
            let total = 0;
            for (let i = 0; i < remainders.length; i++) {
                const target = i % 2 === 0 ? x : y;
                const current = remainders[i];
                total += Math.min((target - current + k) % k, (current - target + k) % k);
            }
            answer = Math.min(answer, total);
        }
    }
    return answer;
};
