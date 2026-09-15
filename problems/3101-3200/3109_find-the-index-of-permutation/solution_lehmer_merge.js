/**
 * @param {number[]} perm
 * @return {number}
 */
var getPermutationIndex = function (perm) {
    const MOD = 1000000007;
    const n = perm.length;
    // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
    const fact = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        fact[i] = Number((BigInt(fact[i - 1]) * BigInt(i)) % BigInt(MOD));
    }

    // Lehmer digit re-read: the values still unused at slot i are exactly
    // the values in later slots, so digit i counts later slots holding
    // smaller values -- a per-position smaller-to-the-right inversion count.
    const smallerAfter = new Array(n).fill(0);
    // merge-sort workspace of (value, original index) pairs, sorted by value
    const order = perm.map((value, i) => [value, i]);

    const mergeSort = (lo, hi) => {
        if (hi - lo < 2) {
            return;
        }
        const mid = (lo + hi) >> 1;
        mergeSort(lo, mid);
        mergeSort(mid, hi);
        const left = order.slice(lo, mid);
        let i = 0;
        let j = mid;
        let k = lo;
        while (i < left.length && j < hi) {
            if (left[i][0] < order[j][0]) {
                smallerAfter[left[i][1]] += j - mid; // right-half values already placed below it
                order[k] = left[i];
                i++;
            } else {
                order[k] = order[j];
                j++;
            }
            k++;
        }
        while (i < left.length) {
            smallerAfter[left[i][1]] += j - mid; // the whole right half sits below it
            order[k] = left[i];
            i++;
            k++;
        }
    };

    mergeSort(0, n);

    let ans = 0;
    for (let i = 0; i < n; i++) {
        const smaller = smallerAfter[i];
        // each later smaller value placed at slot i leads (n - 1 - i)! earlier permutations
        ans = Number((BigInt(ans) + BigInt(smaller) * BigInt(fact[n - 1 - i])) % BigInt(MOD));
    }
    return ans;
};
