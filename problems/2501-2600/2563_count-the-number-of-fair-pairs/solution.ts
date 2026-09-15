// Sorting discards index identity, but fairness only depends on values:
// counting ordered positions i < j in the sorted array counts each original
// pair exactly once. Sums touch +-2*10^9 and answers reach C(n,2) ~=
// 5*10^9 — both well inside the exact-Number window < 2^53.
function countFairPairs(nums: number[], lower: number, upper: number): number {
    const arr = [...nums].sort((a, b) => a - b);
    const countAtMost = (limit: number): number => {
        // Sliding window: once arr[lo] + arr[hi] <= limit, every index
        // between lo and hi pairs with lo as well, worth hi - lo pairs.
        let total = 0;
        let lo = 0;
        let hi = arr.length - 1;
        while (lo < hi) {
            if (arr[lo] + arr[hi] <= limit) {
                total += hi - lo;
                lo++;
            } else {
                hi--;
            }
        }
        return total;
    };
    return countAtMost(upper) - countAtMost(lower - 1);
}
