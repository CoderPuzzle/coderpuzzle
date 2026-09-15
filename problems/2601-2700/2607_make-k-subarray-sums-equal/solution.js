/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var makeSubKSumEqual = function (arr, k) {
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    const n = arr.length;
    // Adjacent windows of length k must agree, forcing arr[(i+k) mod n] =
    // arr[i]: stepping by k around the cycle visits exactly one residue class
    // mod g = gcd(n, k), and each class being constant is also sufficient —
    // any window then picks up each class k/g times.
    const g = gcd(n, k);
    let total = 0;
    for (let r = 0; r < g; r++) {
        const group = [];
        for (let i = r; i < n; i += g) group.push(arr[i]);
        group.sort((a, b) => a - b);
        // Unit steps are cheapest around a median; classes are independent,
        // so costs simply add up.
        const median = group[Math.floor(group.length / 2)];
        for (const v of group) total += Math.abs(v - median);
    }
    return total;
};
