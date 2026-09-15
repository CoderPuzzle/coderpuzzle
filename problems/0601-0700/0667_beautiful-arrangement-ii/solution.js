/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var constructArray = function (n, k) {
    // The first k+1 slots alternate between the two ends of 1..k+1 —
    // 1, k+1, 2, k, 3, k-1, ... — so their adjacent differences walk
    // down k, k-1, ..., 1, each distinct value exactly once. The values
    // k+2..n then follow in ascending order: the junction difference
    // falls back inside 1..k and every later difference is 1, so the
    // k values already seen are the final count.
    const answer = [];
    let low = 1;
    let high = k + 1;
    for (let i = 0; i <= k; ++i) {
        if (i % 2 === 0) {
            answer.push(low);
            low += 1;
        } else {
            answer.push(high);
            high -= 1;
        }
    }
    for (let v = k + 2; v <= n; ++v) {
        answer.push(v);
    }
    return answer;
};
