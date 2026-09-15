/**
 * @param {number} n
 * @param {number} k
 * @return {string[]}
 */
var generateValidStrings = function (n, k) {
    // Left-to-right backtracking. At index i a '0' is always allowed; a '1'
    // is allowed only when it does not follow another '1' and its index i
    // keeps the running cost <= k. Trying '0' before '1' emits every valid
    // string in lexicographic order. Recursion depth <= 12.
    const out = [];
    const chars = [];
    const build = (index, prevOne, cost) => {
        if (index === n) {
            out.push(chars.join(""));
            return;
        }
        chars[index] = "0";
        build(index + 1, false, cost);
        if (!prevOne && cost + index <= k) {
            chars[index] = "1";
            build(index + 1, true, cost + index);
        }
    };
    build(0, false, 0);
    return out;
};
