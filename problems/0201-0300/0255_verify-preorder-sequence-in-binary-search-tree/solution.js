/**
 * @param {number[]} preorder
 * @return {boolean}
 */
var verifyPreorder = function (preorder) {
    // The stack holds the values still open for a left descendant — the
    // current left spine, strictly decreasing. low is the closest ancestor
    // already closed by a larger value; everything after that close
    // descends to its right, so every later value must clear it.
    const stack = [];
    let low = -Infinity;
    for (const value of preorder) {
        // A value below low would have to sit in a closed ancestor's left
        // subtree, which is already finished.
        if (value < low) return false;
        // A larger value ends the left subtree of every popped ancestor
        // and takes its place to the right; the deepest popped ancestor is
        // the new bound.
        while (stack.length > 0 && stack[stack.length - 1] < value) {
            low = stack.pop();
        }
        stack.push(value);
    }
    return true;
};
