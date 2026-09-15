/**
 * @param {string[]} words
 * @return {boolean}
 */
var differByOne = function (words) {
    const n = words.length;
    if (n < 2) return false;
    const length = words[0].length;
    // Fix one position at a time; within that position, hash every word
    // with that single character masked out.
    for (let pos = 0; pos < length; ++pos) {
        const seen = new Set();
        for (const word of words) {
            const masked = word.slice(0, pos) + "*" + word.slice(pos + 1);
            // A repeat means two words agree everywhere except pos; since
            // every word is unique, they must differ there and nowhere else.
            if (seen.has(masked)) return true;
            seen.add(masked);
        }
    }
    return false;
};
