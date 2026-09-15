/**
 * @param {string} s
 * @return {string}
 */
var toLowerCase = function (s) {
    // ASCII puts every uppercase letter in 65..90 and its lowercase
    // twin 32 codes higher, so one pass decides each code unit:
    // inside the range, add 32; outside it, copy untouched. The range
    // check is what keeps the +32 from reaching digits, punctuation,
    // or already-lowercase letters.
    const out = [];
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            out.push(String.fromCharCode(code + 32));
        } else {
            out.push(String.fromCharCode(code));
        }
    }
    return out.join("");
};
