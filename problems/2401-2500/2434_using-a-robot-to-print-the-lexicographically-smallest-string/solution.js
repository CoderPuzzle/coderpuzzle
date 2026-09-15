/**
 * @param {string} s
 * @return {string}
 */
var robotWithString = function (s) {
    const n = s.length;
    // t behaves as a stack: characters enter in s's order and leave from
    // the end, so the paper receives some pop sequence.
    // suffixMin[i] = smallest char still to arrive from s[i:]; the
    // sentinel at n exceeds every letter and also serves the drain.
    const suffixMin = new Array(n + 1).fill(String.fromCharCode(127));
    for (let i = n - 1; i >= 0; i--) {
        suffixMin[i] = s[i] < suffixMin[i + 1] ? s[i] : suffixMin[i + 1];
    }
    const stack = [];
    const out = [];
    for (let i = 0; i < n; i++) {
        // Pop the top while nothing smaller remains unread: writing it
        // now is never wrong, since later arrivals are >= top. Ties pop
        // early too — safe and never a wasted hold.
        while (stack.length > 0 && stack[stack.length - 1] <= suffixMin[i]) {
            out.push(stack.pop());
        }
        stack.push(s[i]);
    }
    // Input exhausted: flush the rest (the sentinel makes this the same
    // condition as the main loop).
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join("");
};
