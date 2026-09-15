/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
    let zerosLeft = 0;
    let onesRight = 0;
    for (const c of s) {
        if (c === "1") {
            onesRight++;
        }
    }
    let best = -1;
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === "0") {
            zerosLeft++;
        } else {
            onesRight--;
        }
        const score = zerosLeft + onesRight;
        if (score > best) {
            best = score;
        }
    }
    return best;
};
