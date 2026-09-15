/**
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function (expression) {
    // Iterative stack machine. cur holds the words of the concatenation so
    // far; a '{' pushes it as a saved prefix and starts a group whose
    // comma-separated alternatives accumulate in a union slot (null marks
    // "no alternatives yet"); a '}' closes the group and concatenates its
    // union onto the saved prefix.
    const stack = [];
    let cur = new Set([""]);
    for (const c of expression) {
        if (c === "{") {
            stack.push(cur);
            stack.push(null); // group union slot
            cur = new Set([""]);
        } else if (c === ",") {
            const top = stack[stack.length - 1];
            if (top === null) {
                stack[stack.length - 1] = cur;
            } else {
                for (const w of cur) top.add(w);
            }
            cur = new Set([""]);
        } else if (c === "}") {
            let group = stack.pop();
            if (group === null) {
                group = cur;
            } else {
                for (const w of cur) group.add(w);
            }
            const prev = stack.pop();
            const next = new Set();
            for (const a of prev) {
                for (const b of group) next.add(a + b);
            }
            cur = next;
        } else {
            const next = new Set();
            for (const w of cur) next.add(w + c);
            cur = next;
        }
    }
    return [...cur].sort();
};
