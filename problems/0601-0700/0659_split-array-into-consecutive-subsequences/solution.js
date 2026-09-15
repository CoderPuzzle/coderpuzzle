/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function (nums) {
    // One walk over the sorted array with two counter maps: left[v] is the
    // copies of v not yet placed, need[v] the subsequences whose next
    // wanted value is v. Placing x always prefers extending an existing
    // subsequence over starting a new one.
    const left = new Map();
    const need = new Map();
    for (const x of nums) {
        left.set(x, (left.get(x) || 0) + 1);
    }
    for (const x of nums) {
        if ((left.get(x) || 0) === 0) {
            // consumed by a run started earlier as its x+1/x+2
            continue;
        }
        if ((need.get(x) || 0) > 0) {
            // extend: the run that wanted x now wants x + 1
            left.set(x, left.get(x) - 1);
            need.set(x, need.get(x) - 1);
            need.set(x + 1, (need.get(x + 1) || 0) + 1);
        } else if ((left.get(x + 1) || 0) > 0 && (left.get(x + 2) || 0) > 0) {
            // start a run of three: it eats the next two values ahead of
            // the walk and then wants x + 3
            left.set(x, left.get(x) - 1);
            left.set(x + 1, left.get(x + 1) - 1);
            left.set(x + 2, left.get(x + 2) - 1);
            need.set(x + 3, (need.get(x + 3) || 0) + 1);
        } else {
            // x can neither extend a run nor seed a legal new one
            return false;
        }
    }
    return true;
};
