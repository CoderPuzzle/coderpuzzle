/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numberOfPairs = function (nums) {
    const counts = new Map();
    for (const num of nums) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }
    let pairs = 0;
    let leftovers = 0;
    for (const count of counts.values()) {
        pairs += Math.floor(count / 2);
        leftovers += count % 2;
    }
    return [pairs, leftovers];
};
