/**
 * @param {number[]} arr
 * @return {string}
 */
var largestTimeFromDigits = function (arr) {
    // Four slots H1 H2 M1 M2 and four digits admit exactly 4! = 24
    // deals. A deal is a real time when the hour stays below 24 and
    // the minute below 60, and comparing survivors as minutes past
    // midnight picks the latest outright. The sentinel -1 means no
    // deal survived, so nothing beats it and the empty string is
    // returned.
    let best = -1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j === i) {
                continue;
            }
            for (let k = 0; k < 4; k++) {
                if (k === i || k === j) {
                    continue;
                }
                const l = 6 - i - j - k;
                const hour = arr[i] * 10 + arr[j];
                const minute = arr[k] * 10 + arr[l];
                if (hour < 24 && minute < 60) {
                    best = Math.max(best, hour * 60 + minute);
                }
            }
        }
    }
    if (best < 0) {
        return "";
    }
    const hh = String(Math.floor(best / 60)).padStart(2, "0");
    const mm = String(best % 60).padStart(2, "0");
    return hh + ":" + mm;
};
