/**
 * @param {string} s
 * @return {number}
 */
var minDeletions = function (s) {
    // Count how often each letter occurs, then process the frequencies
    // from largest to smallest. Whenever a frequency repeats a value we
    // have already committed to, shrink it by one deletion at a time
    // until it lands on an unused value (or hits zero, meaning that
    // letter is deleted away entirely).
    const counts = new Map();
    for (const c of s) {
        counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    const freqs = Array.from(counts.values()).sort((a, b) => b - a);

    const used = new Set();
    let deletions = 0;
    for (let freq of freqs) {
        while (freq > 0 && used.has(freq)) {
            freq--;
            deletions++;
        }
        if (freq > 0) {
            used.add(freq);
        }
    }
    return deletions;
};
