/**
 * @param {string} word
 * @return {string[]}
 */
var generateAbbreviations = function (word) {
    // Each position doubles the possibilities: fold the character into the
    // running count, or keep the letter and flush the count first. The
    // abbreviate branch is tried first, so the results come out in the
    // canonical order the statement pins.
    const results = [];
    const walk = (pos, prefix, count) => {
        if (pos === word.length) {
            // The end of the word flushes whatever count is still pending.
            results.push(count > 0 ? prefix + count : prefix);
            return;
        }
        // Abbreviate: extend the running count.
        walk(pos + 1, prefix, count + 1);
        // Keep: flush the pending count, then the letter.
        const kept = count > 0 ? prefix + count : prefix;
        walk(pos + 1, kept + word[pos], 0);
    };
    walk(0, "", 0);
    return results;
};
