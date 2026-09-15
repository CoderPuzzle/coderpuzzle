// Consistency depends only on which letters a word uses, so fold allowed
// into one 26-bit mask: bit i means 'a' + i may appear.
function countConsistentStrings(allowed: string, words: string[]): number {
    let allowedMask = 0;
    for (let index = 0; index < allowed.length; ++index) {
        allowedMask |= 1 << (allowed.charCodeAt(index) - 97);
    }
    let count = 0;
    for (const word of words) {
        let mask = 0;
        for (let index = 0; index < word.length; ++index) {
            mask |= 1 << (word.charCodeAt(index) - 97);
        }
        // the word is consistent exactly when its mask holds no bit
        // outside allowedMask — one AND answers the subset question
        if ((mask & ~allowedMask) === 0) {
            ++count;
        }
    }
    return count;
}
