# Solutions — Longest Subsequence With Non-Zero Bitwise XOR

## Whole-array XOR

XOR is self-inverse and commutative, so a subsequence's XOR depends only on
which values it keeps — order and position are irrelevant. That observation
collapses the exponentially many subsequences into three outcomes, all read
off a single pass over the array.

Compute `t`, the XOR of the entire array. If `t` is non-zero, the whole array
is itself a witness, so the answer is `n`; nothing can beat keeping every
element. If `t` is zero, dropping any single element with value `v` flips `v`
out of the total, leaving XOR `t XOR v = v`. So as long as some element is
non-zero, dropping it gives a non-zero XOR at length `n - 1` — and that is
optimal, because the only subsequence longer than `n - 1` is the whole array,
whose XOR is zero by assumption. Note the count parity consequence: an
all-equal array of even length lands in this branch, odd length in the first.

The last case is an array of all zeros: every subsequence then XORs to zero
and no valid subsequence exists, so the statement's sentinel `0` is returned.
One pass tracking just `t` and whether any non-zero element was seen covers
everything, using constant extra space.

**Complexity:** `O(n)` time, `O(1)` space.
