# Solutions — Construct Uniform Parity Array I

## Parity counting

Only the parity of the choices matters. `nums2[i]` is either `nums1[i]` or
`nums1[i] - nums1[j]`, and a difference is even exactly when its two
operands share a parity, odd exactly when they differ. Let `o` be the number
of odd elements in `nums1`.

For an all-even array, an odd element can only become even by subtracting
another odd element, so a single lone odd element defeats the all-even
option; it works when there are no odd elements at all, or at least two of
them. For an all-odd array, every even element can be turned odd by
subtracting any odd element, so a single odd element suffices. One of the
two options always holds — an array has zero odds (all-even works), exactly
one odd (all-odd works), or at least two odds (both work) — so the answer is
always `true`.

The only quantity needed is the count of odd elements, found in one scan;
no construction is ever required.

**Complexity:** `O(n)` time, `O(1)` space.
