/**
 * @param {number} num
 * @return {number}
 */
var maxDiff = function (num) {
    const s = String(num);

    // Maximum: rewrite the first non-9 digit (and its duplicates) to 9.
    let big = s;
    for (const digit of s) {
        if (digit !== "9") {
            big = s.split(digit).join("9");
            break;
        }
    }

    // Minimum: the leading digit goes to 1 when it can, otherwise the
    // first digit > 1 anywhere after goes to 0.
    let small = s;
    if (s[0] !== "1") {
        small = s.split(s[0]).join("1");
    } else {
        for (const digit of s) {
            if (digit !== "0" && digit !== "1") {
                small = s.split(digit).join("0");
                break;
            }
        }
    }

    return Number(big) - Number(small);
};
