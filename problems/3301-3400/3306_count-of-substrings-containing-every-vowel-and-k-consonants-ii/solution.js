/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
    // Count windows with all five vowels and >= c consonants, for c = k and
    // c = k + 1; their difference is the number with exactly k consonants.
    // For each left end l, grow r until the window first qualifies; that
    // minimal right end never moves backwards, so every character enters and
    // leaves the window once — linear overall.
    const atLeast = (need) => {
        const n = word.length;
        const have = new Array(5).fill(0);
        let distinct = 0;
        let cons = 0;
        let total = 0;
        let r = 0;
        for (let l = 0; l < n; l++) {
            // Grow the window until it has every vowel and >= need consonants.
            while (r < n && (distinct < 5 || cons < need)) {
                const v = "aeiou".indexOf(word[r]);
                if (v >= 0) {
                    if (have[v]++ === 0) distinct++;
                } else {
                    cons++;
                }
                r++;
            }
            if (distinct < 5 || cons < need) {
                // No window starting at l (or any later l) can qualify.
                break;
            }
            total += n - (r - 1);
            // Drop word[l] before moving to the next left end.
            const v = "aeiou".indexOf(word[l]);
            if (v >= 0) {
                if (--have[v] === 0) distinct--;
            } else {
                cons--;
            }
        }
        return total;
    };
    return atLeast(k) - atLeast(k + 1);
};
