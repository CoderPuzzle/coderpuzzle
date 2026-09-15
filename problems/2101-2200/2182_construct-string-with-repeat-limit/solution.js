/**
 * @param {string} s
 * @param {number} repeatLimit
 * @return {string}
 */
var repeatLimitedString = function (s, repeatLimit) {
    // Greedy: always emit the largest letter still available; when it
    // exhausts its allowed run, spend one unit of the next largest as a
    // separator, then resume.
    const counts = new Array(26).fill(0);
    for (const ch of s) {
        ++counts[ch.charCodeAt(0) - 97];
    }
    let out = "";
    let i = 25;
    while (true) {
        while (i >= 0 && counts[i] === 0) {
            --i;
        }
        if (i < 0) {
            break;
        }
        const run = Math.min(repeatLimit, counts[i]);
        out += String.fromCharCode(97 + i).repeat(run);
        counts[i] -= run;
        if (counts[i] === 0) {
            continue;
        }
        let j = i - 1;
        while (j >= 0 && counts[j] === 0) {
            --j;
        }
        if (j < 0) {
            break;
        }
        out += String.fromCharCode(97 + j);
        --counts[j];
    }
    return out;
};
