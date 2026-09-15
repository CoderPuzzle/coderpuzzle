/**
 * @param {string} num
 * @param {number} k
 * @return {number}
 */
var getMinSwaps = function (num, k) {
    // Apply next-permutation k times to get the target digits, then the
    // minimum adjacent swaps to rearrange num into it is the inversion
    // count of the order-preserving digit matching.
    const n = num.length;
    const arr = Array.from(num, (c) => c.charCodeAt(0) - 48);
    for (let t = 0; t < k; t++) {
        nextPermutation(arr);
    }
    const slots = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < n; i++) {
        slots[num.charCodeAt(i) - 48].push(i);
    }
    const perm = arr.map((d) => slots[d].shift());

    // inversion count via a Fenwick tree over original indices
    const tree = new Array(n + 1).fill(0);
    let inv = 0;
    for (let i = 0; i < n; i++) {
        let lessEq = 0;
        for (let x = perm[i]; x > 0; x -= x & -x) {
            lessEq += tree[x];
        }
        inv += i - lessEq;
        for (let x = perm[i] + 1; x <= n; x += x & -x) {
            tree[x]++;
        }
    }
    return inv;
};

function nextPermutation(a) {
    const n = a.length;
    let i = n - 2;
    while (i >= 0 && a[i] >= a[i + 1]) {
        i--;
    }
    let j = n - 1;
    while (a[j] <= a[i]) {
        j--;
    }
    [a[i], a[j]] = [a[j], a[i]];
    for (let l = i + 1, r = n - 1; l < r; l++, r--) {
        [a[l], a[r]] = [a[r], a[l]];
    }
}
