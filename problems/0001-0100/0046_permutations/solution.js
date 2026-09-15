/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    // Sorted copy leaves the caller's array untouched; trying candidates in
    // ascending order makes the walk emit lexicographic order directly.
    const values = [...nums].sort((a, b) => a - b);
    const permutations = [];
    const current = [];
    const used = new Array(values.length).fill(false);
    // A leaf has one chosen element per position: a full permutation.
    const walk = () => {
        if (current.length === values.length) {
            // Copy: current is the shared buffer for the next branch.
            permutations.push([...current]);
            return;
        }
        for (let index = 0; index < values.length; ++index) {
            // Marks replace an O(n) membership scan; skip taken elements.
            if (used[index]) continue;
            used[index] = true;
            current.push(values[index]);
            walk();
            current.pop();
            used[index] = false;
        }
    };
    walk();
    return permutations;
};
