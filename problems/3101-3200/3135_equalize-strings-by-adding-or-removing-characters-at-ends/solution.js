/**
 * @param {string} initial
 * @param {string} target
 * @return {number}
 */
var minOperations = function (initial, target) {
    // Characters that survive form a contiguous window of initial and a
    // contiguous window of target, i.e. a common substring; every other
    // character costs exactly one operation, so the answer is
    // m + n - 2 * (longest common substring).
    let best = 0;
    let prev = new Array(target.length + 1).fill(0);
    for (const a of initial) {
        const cur = new Array(target.length + 1).fill(0);
        for (let j = 0; j < target.length; j++) {
            if (a === target[j]) {
                cur[j + 1] = prev[j] + 1;
                if (cur[j + 1] > best) best = cur[j + 1];
            }
        }
        prev = cur;
    }
    return initial.length + target.length - 2 * best;
};
