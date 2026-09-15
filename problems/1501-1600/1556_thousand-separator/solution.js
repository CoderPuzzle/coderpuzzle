/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
    // Reverse the digit string, cut it into runs of three, join with '.',
    // then reverse back — the chunk boundaries land exactly on multiples
    // of three counted from the units digit.
    const reversed = String(n).split("").reverse().join("");
    const groups = [];
    for (let i = 0; i < reversed.length; i += 3) {
        groups.push(reversed.slice(i, i + 3));
    }
    return groups.join(".").split("").reverse().join("");
};
