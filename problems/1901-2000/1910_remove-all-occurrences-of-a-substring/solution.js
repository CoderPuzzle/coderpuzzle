/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
var removeOccurrences = function (s, part) {
    // Stream s through a survivor stack. A removal can only expose
    // characters at the top, so after each push the last part.length
    // chars are checked and popped when they spell out part — the
    // freshly exposed top then gets its own chance on a later push.
    const m = part.length;
    const stack = [];
    for (const ch of s) {
        stack.push(ch);
        if (stack.length >= m && stack.slice(-m).join("") === part) {
            stack.length -= m;
        }
    }
    return stack.join("");
};
