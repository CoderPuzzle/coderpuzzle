/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
    // A valid string never contains "00", so the choice at each position
    // depends only on the previous character: after a 0 the next char is
    // forced to be 1, after a 1 either character may follow. Appending 0
    // right after a 0 is the only move that can ever go wrong, so pruning
    // exactly that branch keeps every surviving path valid. Trying 0
    // before 1 makes the depth-first walk emit the strings already in
    // ascending lexicographic order — no final sort needed.
    const current = [];
    const results = [];
    const backtrack = () => {
        if (current.length === n) {
            results.push(current.join(""));
            return;
        }
        for (const ch of ["0", "1"]) {
            if (ch === "0" && current[current.length - 1] === "0") {
                continue; // would create "00" — prune this branch
            }
            current.push(ch);
            backtrack();
            current.pop();
        }
    };
    backtrack();
    return results;
};
