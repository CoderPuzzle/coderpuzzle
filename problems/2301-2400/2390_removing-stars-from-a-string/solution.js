/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
    // A star deletes the most recently kept character, so keep a stack
    // of survivors: push letters, pop on stars.
    const kept = [];
    for (const c of s) {
        if (c === "*") {
            kept.pop();
        } else {
            kept.push(c);
        }
    }
    return kept.join("");
};
