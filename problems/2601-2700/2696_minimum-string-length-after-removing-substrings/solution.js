/**
 * @param {string} s
 * @return {number}
 */
var minLength = function (s) {
    const stack = [];
    for (const ch of s) {
        const pair = stack.length > 0 ? stack[stack.length - 1] + ch : "";
        if (pair === "AB" || pair === "CD") {
            stack.pop();
        } else {
            stack.push(ch);
        }
    }
    return stack.length;
};
