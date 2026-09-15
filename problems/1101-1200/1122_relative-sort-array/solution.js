/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
    // Rank in arr2 for present values; absent ones share the sentinel rank
    // arr2.length and then compare by value (ascending at the end).
    const rank = new Map();
    for (let i = 0; i < arr2.length; ++i) rank.set(arr2[i], i);
    const tail = arr2.length;
    const key = (value) => {
        const r = rank.has(value) ? rank.get(value) : tail;
        return r * 2000 + value;
    };
    const out = [...arr1];
    out.sort((a, b) => key(a) - key(b));
    return out;
};
