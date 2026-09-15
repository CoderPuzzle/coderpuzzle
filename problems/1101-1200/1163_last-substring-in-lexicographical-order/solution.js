/**
 * @param {string} s
 * @return {string}
 */
var lastSubstring = function (s) {
    const n = s.length;
    // the answer is always a suffix: i = best start so far, j = challenger,
    // k = length of the prefix the two candidates agree on
    let i = 0,
        j = 1,
        k = 0;
    while (j + k < n) {
        if (s[i + k] === s[j + k]) {
            // characters agree: the shared prefix grows by one
            k++;
        } else if (s[i + k] < s[j + k]) {
            // s[i:] loses here, and so does every suffix starting in
            // (i, i+k] — each hits the same losing comparison shifted
            i = Math.max(i + k + 1, j);
            j = i + 1;
            k = 0;
        } else {
            // challenger loses: suffixes j..j+k are dominated, skip them
            j = j + k + 1;
            k = 0;
        }
    }
    return s.substring(i);
};
