/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    // Sorted copy leaves the caller's array untouched; sorting makes every
    // emitted combination ascending and the left-to-right growth
    // lexicographic.
    const arr = [...candidates].sort((a, b) => a - b);
    const combinations = [];
    const current = [];
    // start moves past each picked index, so every candidate number is used
    // at most once.
    const backtrack = (start, remaining) => {
        if (remaining === 0) {
            // Hit the target exactly: snapshot the current path.
            combinations.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            // A value equal to the one just abandoned at this depth would
            // rebuild the same combination, so skip runs of equal values.
            if (i > start && arr[i] === arr[i - 1]) continue;
            // Sorted order means the first value too large to fit ends the
            // loop: every later value is at least as large.
            if (arr[i] > remaining) break;
            current.push(arr[i]);
            // i + 1, not i: every candidate number may be used only once.
            backtrack(i + 1, remaining - arr[i]);
            current.pop();
        }
    };
    backtrack(0, target);
    return combinations;
};
