/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var canBeEqual = function (s1, s2) {
    // A legal swap joins indices exactly 2 apart, so it exchanges only
    // the slots {0, 2} or only the slots {1, 3}: no letter can ever
    // cross between the two pairs, and repeating a swap just undoes it.
    // Both strings are therefore stuck reshuffling inside their own two
    // pairs, and they can be made equal exactly when each pair already
    // carries the same two letters in either order — compare unordered.
    for (const a of [0, 1]) {
        const p = [s1[a], s1[a + 2]].sort().join("");
        const q = [s2[a], s2[a + 2]].sort().join("");
        if (p !== q) {
            return false;
        }
    }
    return true;
};
