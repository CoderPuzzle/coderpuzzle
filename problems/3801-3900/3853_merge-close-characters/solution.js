/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var mergeCharacters = function (s, k) {
    // The stack holds the settled prefix: survivors with no close pair
    // among them. A merge always deletes the right member, so the incoming
    // char — the rightmost — either finds an equal survivor within distance
    // k (its position is stack.length, so the window is the last k
    // survivors) and vanishes, or it settles on top. One sweep replays
    // the rule.
    const stack = [];
    for (const c of s) {
        if (stack.slice(-k).includes(c)) {
            continue;
        }
        stack.push(c);
    }
    return stack.join("");
};
