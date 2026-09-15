# Solutions — Count Subarrays With Median K

## Prefix Balance Hash Count

Replace every value with a sign: `+1` if it is strictly greater than `k`, `-1` if strictly smaller, and `0` for `k` itself. A subarray containing `k` has median `k` exactly when the greater and smaller elements balance, which happens precisely when this transformed sum is 0 (odd length) or 1 (even length, where the left-middle convention tolerates one extra greater element). So the task becomes: count subarrays that contain the position of `k` and whose transformed sum is 0 or 1.

Sweep once over the array, maintaining `current`, the transformed sum of the prefix. Record in the hash map `balance` the frequencies of prefix sums for indices _strictly before_ the position of `k` (seeded with `{0: 1}` for the empty prefix). Once index `i` is at or past `pos`, every subarray ending at `i` and starting before `pos` corresponds to a previously stored prefix: its sum is `current - stored`, so it qualifies when that difference is 0 or 1, i.e. when `stored` equals `current` or `current - 1`. Add both lookup counts to the answer.

Restricting insertion to indices before `pos` is what enforces the "must contain `k`" requirement — a subarray with balance 0 or 1 that misses `k` entirely has some other median and must not be counted. Because all values are distinct, `nums.index(k)` locates the pivot unambiguously, and the balance map holds at most `n` entries. Both accepted balances (0 and 1) must be looked up, since even-length subarrays with one extra greater element still have median `k` under the left-middle definition.

**Complexity:** `O(n)` time, `O(n)` space.
