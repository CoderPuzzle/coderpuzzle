/**
 * @param {number[]} nums
 * @return {number}
 */
var reductionOperations = function (nums) {
    // Sorted ascending: crossing into a new (larger) distinct value
    // raises the level; element i costs its level = number of distinct
    // smaller values below it. Max total ~2.5e9, exact as a JS number.
    const s = [...nums].sort((a, b) => a - b);
    let ans = 0;
    let level = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i] !== s[i - 1]) {
            level++;
        }
        ans += level;
    }
    return ans;
};
