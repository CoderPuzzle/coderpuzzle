/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
    const a = nums.slice().sort((x, y) => x - y);
    let total = 0;
    for (const x of a) total += x;
    // Try candidate longest sides from the largest down; stop at i == 2 so
    // at least three sides remain. The first prefix that closes wins.
    for (let i = a.length - 1; i > 1; i--) {
        // A multiset forms a polygon iff the largest side is smaller than
        // the sum of all the others.
        if (total - a[i] > a[i]) return total;
        // This largest side is hopeless: the smaller sides can never
        // outweigh it, so discard it and try the next candidate.
        total -= a[i];
    }
    return -1;
};
