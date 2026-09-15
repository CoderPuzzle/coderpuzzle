/**
 * @param {number[]} pref
 * @return {number[]}
 */
var findArray = function (pref) {
    // arr[i] = pref[i] ^ pref[i-1] for every i (arr[0] = pref[0]), and xor
    // is its own inverse, so the original array falls out of one linear
    // difference pass. Written into a fresh output so the caller's pref is
    // never disturbed.
    const arr = [pref[0]];
    for (let i = 1; i < pref.length; ++i) {
        arr.push(pref[i] ^ pref[i - 1]);
    }
    return arr;
};
