/**
 * @param {string} s
 * @param {string[]} words
 * @return {string}
 */
var addBoldTag = function (s, words) {
    // Every occurrence of every word paints its half-open interval onto a
    // boolean mask. Painting overlapping AND adjacent intervals onto one mask
    // merges them exactly as the two tag rules demand, so no interval
    // bookkeeping is needed. Each word is located by find-restart — search
    // again from one past every hit — because a single non-restarting search
    // would consume the overlapping occurrences ("aa" inside "aaa" at both
    // 0 and 1).
    const n = s.length;
    const bold = new Array(n).fill(false);
    for (const word of words) {
        for (let start = s.indexOf(word); start !== -1; start = s.indexOf(word, start + 1)) {
            for (let j = start; j < start + word.length; ++j) {
                bold[j] = true;
            }
        }
    }
    let result = "";
    for (let i = 0; i < n; ++i) {
        if (bold[i] && (i === 0 || !bold[i - 1])) {
            result += "<b>";
        }
        result += s[i];
        if (bold[i] && (i === n - 1 || !bold[i + 1])) {
            result += "</b>";
        }
    }
    return result;
};
