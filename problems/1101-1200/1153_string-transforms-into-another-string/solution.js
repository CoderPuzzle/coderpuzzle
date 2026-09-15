/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canConvert = function (str1, str2) {
    if (str1 === str2) {
        // Zero conversions needed; cycles in the mapping never fire.
        return true;
    }
    const mapping = new Map();
    const targets = new Set();
    for (let i = 0; i < str1.length; ++i) {
        const a = str1[i],
            b = str2[i];
        if (mapping.has(a) && mapping.get(a) !== b) {
            // One source letter would need two different targets.
            return false;
        }
        mapping.set(a, b);
        targets.add(b);
    }
    // A cycle needs a spare letter to break it, and a spare is any letter
    // that never appears as a target.
    return targets.size < 26;
};
