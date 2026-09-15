/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number[]} arr3
 * @return {number[]}
 */
var arraysIntersection = function (arr1, arr2, arr3) {
    // One index per sorted array; the smallest current values can never
    // reappear ahead, so they are safe to step past.
    let i = 0,
        j = 0,
        k = 0;
    const out = [];
    while (i < arr1.length && j < arr2.length && k < arr3.length) {
        const a = arr1[i],
            b = arr2[j],
            c = arr3[k];
        if (a === b && b === c) {
            out.push(a);
            ++i;
            ++j;
            ++k;
            continue;
        }
        const smallest = Math.min(a, b, c);
        if (a === smallest) ++i;
        if (b === smallest) ++j;
        if (c === smallest) ++k;
    }
    return out;
};
