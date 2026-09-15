# Solutions — Sum of Numbers With Units Digit K

## Smallest count by units-digit arithmetic

Every usable integer is `base`, `base + 10`, `base + 20`, ... where `base` is
`k` itself — except when `k` is 0: zero is not positive, so there the smallest
usable number is 10 instead. A set of `count` numbers therefore always sums to
`count * base + 10 * t` for some `t >= 0` (each element contributes its base
plus a multiple of ten), so such a set hits `num` exactly when
`num >= count * base` and `num - count * base` is divisible by 10 — and any
`count` passing both checks is achievable, by taking `count - 1` copies of
`base` plus one final element carrying the whole remaining multiple of ten.

So after the `num == 0` shortcut (the empty set), scan `count` upward while
`count * base <= num` and return the first count whose remainder is a multiple
of ten; if no count fits before the bound runs out, return -1. The scan is
constant in practice: remainders repeat with period dividing ten, and for
`k == 0` the very first count already decides.

**Complexity:** `O(1)` time and `O(1)` space.
