/**
 * @param {string} s
 * @return {string}
 */
var lastNonEmptyString = function (s) {
    const counts = new Array(26).fill(0);
    for (let index = 0; index < s.length; index++) {
        counts[s.charCodeAt(index) - 97]++;
    }
    const top = Math.max(...counts);
    const taken = new Array(26).fill(false);
    const kept = [];
    for (let index = s.length - 1; index >= 0; index--) {
        const slot = s.charCodeAt(index) - 97;
        if (counts[slot] === top && !taken[slot]) {
            taken[slot] = true;
            kept.push(s[index]);
        }
    }
    return kept.reverse().join("");
};
