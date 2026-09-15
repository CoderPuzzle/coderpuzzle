/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function (words, pattern) {
    // Index each letter by its first appearance: "abb" -> [0, 1, 1].
    const signature = (s) => {
        const first = new Map();
        const sig = [];
        for (const ch of s) {
            let index = first.get(ch);
            if (index === undefined) {
                index = first.size;
                first.set(ch, index);
            }
            sig.push(index);
        }
        return sig;
    };
    const same = (a, b) => {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    // Equal signatures are exactly bijective matchability for
    // equal-length strings, so no letter-to-letter maps are needed.
    const target = signature(pattern);
    return words.filter((w) => same(signature(w), target));
};
