/**
 * @param {string} s
 * @return {string}
 */
var smallestString = function (s) {
    // Decrementing a letter helps only when it is not 'a', so the win
    // starts at the first non-'a' letter: shrink that entire run of
    // non-'a' letters and stop at the next 'a' or the end (turning an
    // 'a' into 'z' would only hurt). An all-'a' string has no helpful
    // edit at all, so the mandatory operation wraps just the last
    // letter to 'z'.
    const chars = s.split("");
    const n = chars.length;
    let i = 0;
    while (i < n && chars[i] === "a") {
        i++;
    }
    if (i === n) {
        chars[n - 1] = "z";
        return chars.join("");
    }
    while (i < n && chars[i] !== "a") {
        chars[i] = String.fromCharCode(chars[i].charCodeAt(0) - 1);
        i++;
    }
    return chars.join("");
};
