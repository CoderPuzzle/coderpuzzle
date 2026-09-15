# Solutions — Sum of Unique Elements

An element contributes to the answer only when it appears exactly once
in `nums`; anything repeated — twice or more — is excluded entirely.
With values bounded to `1..100`, a fixed 101-slot frequency table
settles every element's fate in one pass, and a second pass adds up
the survivors.

## Count, then sum the singletons

First sweep: increment `count[nums[i]]` for each element. Second sweep:
add up every value whose count is exactly 1. An all-duplicate array
naturally yields 0 — no value survives the count filter, so the sum
stays at its seed. The sum is bounded by `100 * 100 = 10^4`, well
inside 32 bits, and the table is a constant-size array rather than a
hash map, so both sweeps are simple index arithmetic.

On `[1,2,3,2]` the counts come out as `1 -> 1, 2 -> 2, 3 -> 1`; only 1
and 3 survive, summing to 4. On `[1,1,1,1,1]` the single occupied slot
holds 5, nothing passes the filter, and the answer is 0.

**Complexity:** `O(n)` time, `O(1)` extra space (101-slot table).
