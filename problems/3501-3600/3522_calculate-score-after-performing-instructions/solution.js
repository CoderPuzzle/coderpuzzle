/**
 * @param {string[]} instructions
 * @param {number[]} values
 * @return {number}
 */
var calculateScore = function (instructions, values) {
    // Each index executes at most once, so a linear walk with a visited
    // flag per index suffices: "add" contributes values[i] and steps to
    // i + 1, "jump" moves to i + values[i], and the process ends on any
    // out-of-bounds target or on an already-executed target (which is not
    // executed again). The score is exact in a Number: with n up to 1e5
    // adds of magnitude up to 1e5, |score| <= 1e10, far below 2^53.
    const n = instructions.length;
    const executed = new Uint8Array(n);
    let score = 0;
    let i = 0;
    while (i >= 0 && i < n && !executed[i]) {
        executed[i] = 1;
        if (instructions[i] === "add") {
            score += values[i];
            i += 1;
        } else {
            i += values[i];
        }
    }
    return score;
};
