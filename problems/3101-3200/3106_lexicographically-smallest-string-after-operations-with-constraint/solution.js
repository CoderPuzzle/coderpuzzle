/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function (s, k) {
    // Greedy per position: the smallest feasible letter is 'a' when its
    // cyclic distance still fits the budget; otherwise every smaller
    // letter is out of reach and exactly `budget` steps down from s[i]
    // is the first affordable letter.
    const result = [];
    let budget = k;
    for (const ch of s) {
        const step = ch.charCodeAt(0) - 97;
        const toA = Math.min(step, 26 - step);
        if (toA <= budget) {
            result.push("a");
            budget -= toA;
        } else {
            result.push(String.fromCharCode(ch.charCodeAt(0) - budget));
            budget = 0;
        }
    }
    return result.join("");
};
