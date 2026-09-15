# Solutions — Largest Number After Mutating Substring

## Greedy scan anchored at the first improving digit

A mutated digit helps exactly when `change[d] > d`, hurts when
`change[d] < d`, and is a no-op on equality. Since the answer keeps the same
length as `num`, comparing two candidates is a walk from the most
significant digit; the earliest position at which they differ decides the
larger number. That makes the best substring start obvious: the leftmost
digit that `change` strictly improves. Improving any earlier position would
dominate a later start, and no earlier position can be improved without
making the number smaller.

With the start fixed, the substring should extend as far right as possible
while every digit in it is non-hurting (`change[d] >= d`) — replacing a
neutral digit leaves the number unchanged and replacing a helpful one grows
it, while the first hurting digit would shrink the number and must end the
substring, because the mutated segment is contiguous and cannot skip it. A
single left-to-right pass therefore records `started` at the first improving
digit and keeps writing replacements until a hurting digit is seen while
`started`; after that, the remaining digits stay original.

The whole scan touches each character once, mutating the string in place
(an indexable character buffer in the languages that need one), so the pass
is linear regardless of whether the mutation range covers one digit or the
entire string.

**Complexity:** `O(n)` time, `O(n)` space for the mutable copy of the
string.
