/**
 * @param {number[]} nums
 * @return {number}
 */
var unequalTriplets = function (nums) {
    // Three distinct positions with three distinct values order uniquely
    // by index, so for each value v the valid triplets using v as the
    // value-sorted middle are left * freq[v] * right. Values lie in
    // [1, 1000], so a fixed table indexed by value replaces the map.
    const count = new Array(1001).fill(0);
    for (const value of nums) {
        count[value]++;
    }
    const total = nums.length;
    let left = 0;
    let answer = 0;
    for (let value = 1; value <= 1000; value++) {
        const freq = count[value];
        if (freq !== 0) {
            answer += left * freq * (total - left - freq);
            left += freq;
        }
    }
    return answer;
};
