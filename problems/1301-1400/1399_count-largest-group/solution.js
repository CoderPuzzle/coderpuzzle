/**
 * @param {number} n
 * @return {number}
 */
var countLargestGroup = function (n) {
    // Digit sums stay below 37 for n <= 10^4, so a fixed array replaces a
    // hash map: bucket every value by its digit sum, then count the buckets
    // reaching the maximum.
    const counts = new Array(37).fill(0);
    let best = 0;
    for (let value = 1; value <= n; ++value) {
        let digitSum = 0;
        for (let rest = value; rest > 0; rest = Math.floor(rest / 10)) {
            digitSum += rest % 10;
        }
        ++counts[digitSum];
        if (counts[digitSum] > best) {
            best = counts[digitSum];
        }
    }
    let result = 0;
    for (const count of counts) {
        if (count === best) {
            ++result;
        }
    }
    return result;
};
