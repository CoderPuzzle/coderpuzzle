# Solutions — Minimum Numbers of Function Calls to Make Target Array

## Bit-count and shared doubling

Run the process in reverse, from `nums` back down to all zeros. An odd
value can only have gotten its last bit from an increment, so undo it by
subtracting `1`; an even value's last bit came from a double, so undo it
by dividing by `2` — but a double touches every element of `arr` at
once, so it can only be undone when _every_ current value is even (or
already zero). Reading each element's binary representation from the
least significant bit up, the increments it needs are exactly the number
of `1` bits it has, and those increments have to land in between
whichever doublings sit between its bits — so the increment count for
one element is simply `popcount(nums[i])`, independent of the others.

The doublings, on the other hand, are shared: a double before an
element's leading bit costs it nothing (`0 * 2` stays `0`), so an
element only needs doublings for the bits below its own most-significant
one, and every element rides along on the same shared sequence of
doubles. The number of doublings the whole array needs is therefore
fixed by the element with the most bits: `bit_length(max(nums)) - 1`
(zero if the maximum is `0`, since an all-zero target needs no
operations at all). Summing the independent increment counts and adding
that one shared doubling term gives the minimum total:
`sum(popcount(nums[i])) + max(bit_length(max(nums)) - 1, 0)`.

**Complexity:** `O(n log M)` time, `O(1)` space, where `M` is the
largest value in `nums`.
