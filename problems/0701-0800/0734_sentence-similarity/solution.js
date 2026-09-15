/**
 * @param {string[]} sentence1
 * @param {string[]} sentence2
 * @param {string[][]} similarPairs
 * @return {boolean}
 */
var areSentencesSimilar = function (sentence1, sentence2, similarPairs) {
    // Different lengths can never be similar.
    if (sentence1.length !== sentence2.length) return false;

    // Words are bare English letters, so "|" cannot occur inside one: joining
    // with it is a collision-free key for the ordered pair. Both orientations
    // enter the set — the relation is symmetric — so one lookup answers "was
    // this pair declared?".
    const declared = new Set();
    for (const [x, y] of similarPairs) {
        declared.add(`${x}|${y}`);
        declared.add(`${y}|${x}`);
    }

    for (let i = 0; i < sentence1.length; i++) {
        const a = sentence1[i];
        const b = sentence2[i];
        // A word is always similar to itself; anything else must be a
        // declared pair. Nothing chains: big~large and large~huge never make
        // big~huge.
        if (a !== b && !declared.has(`${a}|${b}`)) return false;
    }
    return true;
};
