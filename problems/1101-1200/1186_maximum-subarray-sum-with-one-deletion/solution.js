/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumSum = function (arr) {
    const n = arr.length;
    if (n === 1) {
        return arr[0];
    }
    // noDel: max subarray sum ending at i with no deletion
    // oneDel: max subarray sum ending at i with exactly one deletion
    let noDel = arr[0];
    let oneDel = -Infinity;
    let best = arr[0];
    for (let i = 1; i < n; i++) {
        // two origins: deletion already used earlier and the subarray
        // extends through arr[i], or the deletion happens exactly now
        // (drop arr[i] from the previous noDel) — oneDel must be
        // computed first so it reads the pre-update noDel
        oneDel = Math.max(oneDel + arr[i], noDel);
        noDel = Math.max(noDel + arr[i], arr[i]);
        best = Math.max(best, noDel, oneDel);
    }
    return best;
};
