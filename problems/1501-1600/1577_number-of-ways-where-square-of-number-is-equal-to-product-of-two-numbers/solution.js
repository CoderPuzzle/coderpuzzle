/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var numTriplets = function (nums1, nums2) {
    // Counts index pairs (j, k), j < k, in b whose product equals some
    // a[i]^2, summed over every i in a. Squares reach up to (1e5)^2 = 1e10,
    // well within JS's safe-integer range, so plain numbers suffice.
    function countType(a, b) {
        const freq = new Map();
        for (const v of b) {
            freq.set(v, (freq.get(v) ?? 0) + 1);
        }
        const distinct = Array.from(freq.keys()).sort((x, y) => x - y);

        let total = 0;
        for (const x of a) {
            const target = x * x;
            for (const v of distinct) {
                if (v * v > target) {
                    break;
                }
                if (target % v !== 0) {
                    continue;
                }
                const other = target / v;
                if (other === v) {
                    const c = freq.get(v);
                    total += (c * (c - 1)) / 2;
                } else if (freq.has(other)) {
                    total += freq.get(v) * freq.get(other);
                }
            }
        }
        return total;
    }

    return countType(nums1, nums2) + countType(nums2, nums1);
};
