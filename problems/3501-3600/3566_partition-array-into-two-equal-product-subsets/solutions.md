# Solutions — Partition Array into Two Equal Product Subsets

## Bitmask enumeration with early-exit products

With at most 12 elements there are only `2¹²` subsets, so the direct
enumeration the hints suggest is already the clean answer: treat every
proper subset mask as one side of the partition and its complement as the
other. Accumulating a side's product element by element makes an early exit
possible — all values are at least 1, so the product never shrinks, and the
moment it exceeds `target` that side (and every superset of it) is dead. A
side can only ever be accepted when its product equals `target` exactly, and
the same test runs on the complement; requiring `0 < popcount(mask) < n`
keeps both sides non-empty.

One shortcut removes most candidates before any enumeration: every element
belongs to one of the two sides, and an element of a side whose product is
`target` must divide `target`, so any indivisible element answers false
immediately. The divisibility check is cheap (`target % x`) and prunes whole
families of random inputs.

The numeric law is safe in every language. In 64-bit terms the running
product is abandoned as soon as it passes `target`, so the largest value
ever materialized is below `target × 100 ≤ 10¹⁷` — far inside the signed
64-bit range. JavaScript numbers are exact integers up to `2⁵³ ≈ 9 × 10¹⁵`,
which covers `target ≤ 10¹⁵` itself; any product that rounds imprecisely has
already crossed `2⁵³` and therefore also crossed `target`, so the early exit
still fires on a value that is decisively too large and the exact equality
`product === target` is only ever evaluated on exact integers.

**Complexity:** `O(2ⁿ · n)` time, `O(1)` extra space.
