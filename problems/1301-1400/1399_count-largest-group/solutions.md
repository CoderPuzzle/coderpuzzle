# Solutions — Count Largest Group

## Bucket by digit sum over a fixed array

The digit sum of any value up to 10⁴ is at most 36, so the groups fit in a 37-slot array rather than a hash map. Walking the values 1 through `n`, each value's decimal digits are peeled off with divide-by-ten remainders to form its key, its bucket grows by one, and the running maximum tracks the largest group seen so far.

Once the buckets are filled, the answer is a plain count of buckets equal to that maximum — groups keyed by digit sums that never appeared hold zero members and can never match a maximum of at least one.

Each of the `n` values contributes a constant digit-count amount of work (at most five digits), and the tally array is a fixed 37 slots regardless of `n`.

**Complexity:** `O(n log n)` time — effectively `O(n)` digit operations — `O(1)` extra space.
