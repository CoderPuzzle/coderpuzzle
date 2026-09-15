/**
 * @param {string} s
 * @return {string}
 */
var freqAlphabets = function (s) {
    // A '#' disambiguates backwards, so scan from the right: at each position
    // either a '#' sits two places ahead (three-char token) or the digit
    // stands alone as a single letter.
    const out = [];
    let i = s.length - 1;
    while (i >= 0) {
        let value;
        if (s[i] === "#") {
            value = Number(s.slice(i - 2, i));
            i -= 3;
        } else {
            value = Number(s[i]);
            i -= 1;
        }
        out.push(String.fromCharCode(97 + value - 1));
    }
    return out.reverse().join("");
};
