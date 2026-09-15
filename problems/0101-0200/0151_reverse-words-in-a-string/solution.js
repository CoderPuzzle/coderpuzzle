/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    // JS strings are immutable, so the sweep runs on a char array — the
    // honest equivalent of the in-place algorithm.
    const chars = s.split("");
    // Flip the whole text once: word order reverses, and every word's
    // letters come out backwards. The sweep below puts the letters back.
    chars.reverse();
    const n = chars.length;
    let write = 0;
    let read = 0;
    while (read < n) {
        // Skip the run of spaces before the next word.
        while (read < n && chars[read] === " ") read++;
        if (read === n) break;
        // One separating space between words, none before the first.
        if (write > 0) chars[write++] = " ";
        const start = write;
        while (read < n && chars[read] !== " ") chars[write++] = chars[read++];
        // The word just copied still has its letters flipped; restore them.
        reverseRange(chars, start, write - 1);
    }
    return chars.slice(0, write).join("");
};

// Flip a range of the array in place, endpoints included.
function reverseRange(chars, lo, hi) {
    while (lo < hi) {
        [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
        lo++;
        hi--;
    }
}
