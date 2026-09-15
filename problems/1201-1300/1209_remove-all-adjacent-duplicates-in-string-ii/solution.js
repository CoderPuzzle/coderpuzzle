/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
    const stack = []; // entries: [char, count]
    for (const ch of s) {
        if (stack.length > 0 && stack[stack.length - 1][0] === ch) {
            stack[stack.length - 1][1] += 1;
            if (stack[stack.length - 1][1] === k) {
                stack.pop();
            }
        } else {
            stack.push([ch, 1]);
        }
    }
    let out = "";
    for (const [ch, count] of stack) {
        out += ch.repeat(count);
    }
    return out;
};
