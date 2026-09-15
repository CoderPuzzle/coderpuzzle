/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
    const isValid = (str) => {
        // Balance scan: fail as soon as a ')' has no '(' to match,
        // and require the counter to end back at zero.
        let count = 0;
        for (const ch of str) {
            if (ch === "(") count++;
            else if (ch === ")") {
                count--;
                if (count < 0) return false;
            }
        }
        return count === 0;
    };
    // BFS over removal counts: every string in a level has had the same
    // number of characters deleted, so the first level holding any valid
    // string is exactly the minimum-removal answer.
    let level = new Set([s]);
    while (true) {
        // Sorted for deterministic output.
        const valid = [...level].filter(isValid).sort();
        if (valid.length > 0) return valid;
        // Expand one more deletion; only parentheses are removed and
        // the set dedups deletions that produce the same string.
        const next = new Set();
        for (const item of level) {
            for (let i = 0; i < item.length; i++) {
                const ch = item[i];
                if (ch === "(" || ch === ")") {
                    next.add(item.slice(0, i) + item.slice(i + 1));
                }
            }
        }
        level = next;
    }
};
