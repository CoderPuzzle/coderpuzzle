/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function (s) {
    const rev = s.split("").reverse().join("");
    // A prefix of s is a palindrome exactly when it equals a suffix of rev,
    // so the KMP prefix function over s + "#" + rev finds it. The separator
    // character (absent from s) keeps the border from stretching across the
    // join and exceeding s.length.
    const combined = s + "#" + rev;
    const n = combined.length;
    const lps = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        // j is the border length of the previous position: shrink through
        // lps[j-1] on mismatch, extend by one on match — linear overall.
        let j = lps[i - 1];
        while (j > 0 && combined[i] !== combined[j]) {
            j = lps[j - 1];
        }
        if (combined[i] === combined[j]) {
            j += 1;
        }
        lps[i] = j;
    }
    // The last entry is the longest proper border: the palindromic prefix
    // length.
    const palLen = n > 0 ? lps[n - 1] : 0;
    // Mirror only the non-palindromic tail onto the front.
    return rev.slice(0, s.length - palLen) + s;
};
