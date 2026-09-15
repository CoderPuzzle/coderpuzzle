/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
    const arr = row.slice();
    const n = arr.length;
    const pos = new Array(n);
    for (let i = 0; i < n; i++) pos[arr[i]] = i;

    let swaps = 0;
    for (let i = 0; i < n; i += 2) {
        const first = arr[i];
        const partner = first ^ 1; // couples are (0,1), (2,3), ...
        if (arr[i + 1] === partner) continue;
        const j = pos[partner];
        const other = arr[i + 1];
        arr[i + 1] = partner;
        arr[j] = other;
        pos[partner] = i + 1;
        pos[other] = j;
        swaps += 1;
    }
    return swaps;
};
