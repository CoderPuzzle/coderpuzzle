# Solutions — Construct Uniform Parity Array II

A parity-only analysis: every element can keep its value or subtract a
smaller element, and the only question is whether one target parity can be
reached everywhere.

## Parity feasibility by extremes

Subtraction can change an element's parity, but only in a controlled way.
The difference `nums1[i] - nums1[j]` has the same parity as the sum
`nums1[i] + nums1[j]`, so it is even exactly when `nums1[j]` shares
`nums1[i]`'s parity, and odd exactly when the two parities differ. Since a
subtraction is only allowed when `nums1[j] < nums1[i]`, an element can only
be changed with the help of a strictly smaller element.

For the all-even target, an odd element must subtract a smaller odd element.
The minimum odd element has no smaller odd element, so it can never be made
even; all-even is therefore achievable if and only if the array contains no
odd element at all. For the all-odd target, an even element must subtract a
smaller odd element. If the array's minimum element is odd, every even
element is larger than it and can subtract it, so all-odd is achievable; if
the minimum element is even, that minimum cannot become odd and all-odd
fails. Odd elements need no help under the all-odd target — they keep their
value.

Both conditions are decided in a single scan: check whether the minimum
element is odd, and if it is not, verify that every element is even. The
whole construction question therefore reduces to two linear checks with no
search, sorting, or map needed.

**Complexity:** `O(n)` time, `O(1)` space.
