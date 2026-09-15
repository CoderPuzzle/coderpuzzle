# Solutions — Largest Number At Least Twice of Others

The largest element clears the bar for every other number or for none of
them: every other element is at most the runner-up, so the one comparison
against that runner-up decides the whole array. A single pass that tracks the
top two values and the leader's index therefore answers the question
outright — no second scan, no auxiliary structure.

## Track the top two values in one pass

The scan carries two values: `best`, the index of the largest element seen so
far, and `second`, the largest value seen anywhere else. Each incoming element
either beats the leader — the old leader steps down into `second` while the
newcomer takes `best` — or it does not, and it only needs comparing against
`second`. At the end `second` is exactly the maximum over all indices other
than `best`, which the uniqueness of the largest element keeps unambiguous,
and the leader's own value is `nums[best]`.

The verdict is the single comparison `nums[best] >= 2 * second`. The boundary
is inclusive — "at least twice" keeps a leader whose value is exactly double
the runner-up — while any runner-up above half the leader forces `-1`, which
is Example 2's story: 4 falls short of twice 3, so no index is returned. A
runner-up of 0 can never fail the test, so a leader standing over nothing but
zeros and small values always wins, as 6 does in Example 1.

The values live in `0..100`, so `2 * second` never exceeds 200 and every
arithmetic step fits comfortably in the native 32-bit integers the signature
already uses — no wider intermediates are needed in any language.

**Complexity:** `O(n)` time, `O(1)` space.
