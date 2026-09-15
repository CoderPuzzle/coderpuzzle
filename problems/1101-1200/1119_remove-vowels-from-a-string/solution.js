/**
 * @param {string} s
 * @return {string}
 */
var removeVowels = function (s) {
    let kept = "";
    for (const c of s) {
        if (c !== "a" && c !== "e" && c !== "i" && c !== "o" && c !== "u") kept += c;
    }
    return kept;
};
