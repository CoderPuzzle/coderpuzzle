/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function (n, k) {
    // Fill from the end. At a position with i open slots before it,
    // reserve one unit per open slot and spend everything else here,
    // capped at z. The first time the cap stops binding, the reserve
    // drops to exactly the open count and every earlier slot is 'a'.
    const chars = new Array(n);
    let remaining = k;
    for (let i = n - 1; i >= 0; i--) {
        const value = Math.min(26, remaining - i);
        chars[i] = String.fromCharCode(97 + value - 1);
        remaining -= value;
    }
    return chars.join("");
};
