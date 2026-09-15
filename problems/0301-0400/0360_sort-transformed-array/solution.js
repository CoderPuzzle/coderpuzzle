/**
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
var sortTransformedArray = function (nums, a, b, c) {
    // f(x) = ax^2 + bx + c is a parabola, so its extreme transformed
    // values sit at the two ends of the sorted nums, not in the middle.
    // When a >= 0 the curve opens upward (a == 0 leaves a monotone line,
    // where the same discipline still holds): the largest values wait at
    // the ends, so the result fills from the back, each step consuming
    // the larger of f(nums[lo]) and f(nums[hi]). When a < 0 the parabola
    // is inverted, the smallest values sit at the ends, and the fill runs
    // from the front taking the smaller. |f(x)| <= 100*100^2 + 100*100 +
    // 100 = 1,010,100, well inside the safe integer range.
    const f = (x) => (a * x + b) * x + c;
    const result = new Array(nums.length).fill(0);
    let lo = 0;
    let hi = nums.length - 1;
    let index = a >= 0 ? nums.length - 1 : 0;
    while (lo <= hi) {
        const left = f(nums[lo]);
        const right = f(nums[hi]);
        const takeLeft = a >= 0 ? left >= right : left <= right;
        result[index] = takeLeft ? left : right;
        if (takeLeft) {
            ++lo;
        } else {
            --hi;
        }
        index += a >= 0 ? -1 : 1;
    }
    return result;
};
