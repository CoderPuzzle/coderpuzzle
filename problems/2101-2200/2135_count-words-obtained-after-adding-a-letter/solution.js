/**
 * @param {string[]} startWords
 * @param {string[]} targetWords
 * @return {number}
 */
var wordCount = function (startWords, targetWords) {
    const mask = (w) => {
        // No letter repeats, so a word is fully described by the 26-bit
        // mask of letters it contains.
        let m = 0;
        for (let i = 0; i < w.length; i++) {
            m |= 1 << (w.charCodeAt(i) - 97);
        }
        return m;
    };

    const starts = new Set(startWords.map(mask));
    let count = 0;
    for (const t of targetWords) {
        const m = mask(t);
        // A target is obtainable iff its mask is a start mask plus one
        // extra bit; clearing each set bit tests exactly that inverse.
        // Same-mask words never count — exactly one letter is appended.
        for (let bit = 0; bit < 26; bit++) {
            if (m & (1 << bit) && starts.has(m ^ (1 << bit))) {
                count++;
                break;
            }
        }
    }
    return count;
};
