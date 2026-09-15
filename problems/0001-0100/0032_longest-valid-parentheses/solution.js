/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    // Stack of indices seeded with -1: a sentinel base marking the position
    // just before the current candidate stretch.
    const stack = [-1];
    let best = 0;
    for (let i = 0; i < s.length; i++) {
        // Every '(' index is pushed, so the stack holds the still-unmatched
        // openers in order, with the base beneath them.
        if (s[i] === "(") {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                // The pop emptied the stack: this ')' is unmatched and can
                // never sit inside a valid substring, so its index becomes
                // the new base, fencing off everything to its left.
                stack.push(i);
            } else {
                // The popped index was the '(' matching this ')'. The top now
                // names the closest barrier before the stretch ending here,
                // so i - top is its full length; barriers only disappear by
                // being matched, so "()()" measures 4, not 2.
                if (i - stack[stack.length - 1] > best) {
                    best = i - stack[stack.length - 1];
                }
            }
        }
    }
    return best;
};
