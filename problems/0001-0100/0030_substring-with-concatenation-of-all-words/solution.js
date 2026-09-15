/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    const wordLength = words[0].length;
    // Required multiset of words; a window matches when its counts equal it.
    const target = new Map();
    for (const word of words) target.set(word, (target.get(word) || 0) + 1);
    const result = [];
    // One sliding window per alignment offset: a match can only start at a
    // position congruent to some r in 0..wordLength-1 modulo wordLength.
    for (let offset = 0; offset < wordLength; offset++) {
        const window = new Map();
        let count = 0; // Words currently inside the window.
        let left = offset;
        for (let right = offset; right + wordLength <= s.length; right += wordLength) {
            const word = s.slice(right, right + wordLength);
            if (!target.has(word)) {
                // A non-word block can never appear in a match, so the
                // window empties and resumes after it.
                window.clear();
                count = 0;
                left = right + wordLength;
                continue;
            }
            window.set(word, (window.get(word) || 0) + 1);
            count++;
            // Too many copies of word: release blocks from the left end
            // until the surplus is gone.
            while (window.get(word) > target.get(word)) {
                const leaving = s.slice(left, left + wordLength);
                window.set(leaving, window.get(leaving) - 1);
                count--;
                left += wordLength;
            }
            if (count === words.length) {
                result.push(left);
                // Release the leftmost block so the window can keep sliding
                // toward the next (possibly adjacent) match.
                const leaving = s.slice(left, left + wordLength);
                window.set(leaving, window.get(leaving) - 1);
                count--;
                left += wordLength;
            }
        }
    }
    // Each offset emits ascending indices within its residue class; one
    // sort merges the classes into the pinned ascending order.
    return result.sort((a, b) => a - b);
};
