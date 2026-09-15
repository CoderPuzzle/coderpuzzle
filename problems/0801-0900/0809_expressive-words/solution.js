/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var expressiveWords = function (s, words) {
    // Run-length encode s once: its letter spine is what every stretchy
    // word must reproduce, group by group.
    const sLetters = [];
    const sCounts = [];
    let i = 0;
    while (i < s.length) {
        let j = i;
        while (j < s.length && s[j] === s[i]) {
            j++;
        }
        sLetters.push(s[i]);
        sCounts.push(j - i);
        i = j;
    }
    let count = 0;
    for (const w of words) {
        // Walk w's own groups against s's: same letters, same group
        // count, and per group either equal counts or an s-side count
        // of 3 or more strictly above the word's.
        let gi = 0;
        let k = 0;
        let ok = true;
        while (k < w.length) {
            let j = k;
            while (j < w.length && w[j] === w[k]) {
                j++;
            }
            if (gi === sLetters.length || sLetters[gi] !== w[k]) {
                ok = false;
                break;
            }
            const sCount = sCounts[gi];
            const wCount = j - k;
            if (sCount !== wCount && !(sCount >= 3 && sCount > wCount)) {
                ok = false;
                break;
            }
            gi++;
            k = j;
        }
        // The walk must end in lockstep with s's spine.
        if (ok && gi === sLetters.length) {
            count++;
        }
    }
    return count;
};
