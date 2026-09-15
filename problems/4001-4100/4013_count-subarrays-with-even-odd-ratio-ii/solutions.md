# Solutions — Count Subarrays With Even Odd Ratio II

## Coordinate-compressed Fenwick sweep

Replace every even element with `b` and every odd element with `-a`. A subarray's transformed sum is `b * x - a * y`, so once both sides of the ratio condition are multiplied by the positive quantity `b * y`, "valid" becomes exactly "transformed sum at most 0". The `y > 0` requirement then takes care of itself: a subarray with no odd element consists only of `+b` terms and has a strictly positive sum, so it never passes the `<= 0` test — every counted subarray automatically contains an odd element. With `pref[0] = 0` and `pref[i] = pref[i - 1] + t[i - 1]`, the sum over `[l, r]` telescopes to `pref[r + 1] - pref[l]`, so the task is to count pairs `l < m` with `pref[m] <= pref[l]`.

A Fenwick tree (binary indexed tree) over the sorted distinct prefix values answers that in logarithmic time. Scanning `m` from `1` to `n`, each step queries how many already-inserted prefixes are `>= pref[m]` — everything inserted so far minus those ranked strictly below — adds that to the answer, and only then inserts `pref[m]`; inserting after querying is what enforces the ordering `l < m`. Coordinate compression is required because prefix values reach `±10^14`: they cannot index a raw array, but their ranks can. Duplicates share one compressed slot, so the `>=` comparison counts equal prefixes as well — exactly the boundary case where the subarray ratio equals `a / b` precisely.

Both the transformed sums and the answer overflow 32 bits (`|pref|` up to `10^5 * 10^9 = 10^14`, answer up to `n * (n + 1) / 2 = 5000050000`), so coordinates, tree cells, and the return value are all 64-bit.

**Complexity:** `O(n log n)` time, `O(n)` space.
