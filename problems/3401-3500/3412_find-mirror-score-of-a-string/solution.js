/**
 * @param {string} s
 * @return {number}
 */
var calculateScore = function (s) {
    // One stack of unmarked indices per letter: the closest unmarked
    // mirror candidate is always the most recently pushed one.
    const stacks = Array.from({ length: 26 }, () => []);
    let score = 0;
    for (let i = 0; i < s.length; ++i) {
        const c = s.charCodeAt(i) - 97;
        const mirror = stacks[25 - c];
        if (mirror.length > 0) {
            // Match with the nearest unmarked mirror and mark both.
            score += i - mirror.pop();
        } else {
            stacks[c].push(i);
        }
    }
    return score;
};
