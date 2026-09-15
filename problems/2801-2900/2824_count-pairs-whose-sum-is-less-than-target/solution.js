/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countPairs = function (nums, target) {
    // Unordered index pairs are unaffected by order, so sorting a copy is
    // safe. Values lie in [-50, 50] and n <= 50, so every sum and the count
    // stay far inside Number's exact range.
    const values = [...nums].sort((a, b) => a - b);
    let answer = 0;
    let lo = 0;
    let hi = values.length - 1;
    while (lo < hi) {
        if (values[lo] + values[hi] < target) {
            answer += hi - lo;
            lo++;
        } else {
            hi--;
        }
    }
    return answer;
};
