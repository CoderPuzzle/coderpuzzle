/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
    // fragment stack mirrors the parenthesis nesting; the base fragment is
    // the outermost level and ends up holding the answer
    const stack = [[]];
    for (const ch of s) {
        if (ch === "(") {
            // open a fresh fragment for the new nesting level
            stack.push([]);
        } else if (ch === ")") {
            // matching pair complete: reverse the finished fragment and fold
            // it into the level below — reversal composes with nesting
            const top = stack.pop();
            stack[stack.length - 1].push(...top.reverse());
        } else {
            // letters accumulate in the innermost current fragment
            stack[stack.length - 1].push(ch);
        }
    }
    return stack[0].join("");
};
