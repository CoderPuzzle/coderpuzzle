/**
 * @param {number} n
 * @return {number}
 */
var monotoneIncreasingDigits = function (n) {
    // Keep the non-decreasing prefix, then repair at the first position
    // where a digit exceeds its right neighbor: slide left across the
    // plateau of equals around that digit, decrement its first member,
    // and fill the rest with nines. No break means n already qualifies.
    const s = String(n).split("");
    const d = s.length;
    let i = 0;
    while (i + 1 < d && s[i] <= s[i + 1]) {
        i++;
    }
    if (i + 1 === d) {
        return n;
    }
    while (i > 0 && s[i - 1] === s[i]) {
        i--;
    }
    s[i] = String(Number(s[i]) - 1);
    for (let k = i + 1; k < d; k++) {
        s[k] = "9";
    }
    return Number(s.join(""));
};
