# Solutions — Pancake Sorting

A pancake flip can only reverse a prefix, and the two things it does well
are moving any chosen value to the front and then moving the front value
to any index it can reach. The pinned answer chains exactly those two
moves: repeatedly take the largest value still out of place, flip it to
the front, then flip the whole unsorted prefix to carry it to the prefix's
end. Everything behind that point is done, so the array fills in from the
back, largest value first.

## Largest to the bottom, two flips at a time

Work sizes `s = n, n-1, ..., 2` in order. The not-yet-sorted prefix
`arr[0..s-1]` always holds exactly the values `1..s` — every larger value
was already parked at its final index — so the value to place is `s`, the
largest one present. Locate it; if it already sits at index `s-1`, the
round is free and nothing is recorded. Otherwise flip with `k` equal to
its index plus one to bring it to the front (skipped when it is already
at index `0`, the only case the first flip would be a no-op — and `k = 1`
itself never appears in the sequence), then flip with `k = s` to carry it
to index `s-1`.

Each later round reverses a strictly shorter prefix, so a value parked at
index `s-1` is never touched again, and by induction the suffix
`arr[s-1..n-1]` is sorted and frozen from the moment size `s` finishes.
An already-sorted input therefore emits no flips at all, and every other
round records at most two, making the sequence at most `2 * (n - 1)`
entries long — comfortably inside the `10 * arr.length` acceptance bound.

Locating the value dominates each round: a linear scan of the prefix,
which is `O(n)` per size and `O(n^2)` summed over all sizes, matching the
cost of the flips themselves. The working copy of `arr` plus the recorded
sequence never exceeds a constant multiple of the input length.

**Complexity:** `O(n²)` time, `O(n)` space.
