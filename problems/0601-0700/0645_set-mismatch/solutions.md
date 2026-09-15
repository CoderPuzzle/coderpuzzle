# Solutions — Set Mismatch

## Count array

The values in `nums` are exactly the numbers `1..n` after one value got
doubled and another got lost, so counting how many times each value occurs
settles both questions at once. A count array indexed by value gives every
number its own slot: the duplicated value's slot ends at `2`, the missing
value's slot ends at `0`, and every correctly-presented value's slot ends at
`1`, carrying no information. Presence, not position, is what the error
changes.

The method allocates `n + 1` counters — slot `0` sits unused so that value
`v` indexes directly — and makes two linear sweeps. The first walks `nums`
and increments `counts[v]`; the second walks the value range `1..n` and
reads the counts back, recording the slot holding `2` as the duplicate and
the slot holding `0` as the missing number. The statement guarantees exactly
one of each kind, so no tie-breaking is ever needed, and the pair returns as
`[duplicate, missing]` — the order both examples pin.

Neither sweep looks at the ordering of `nums`, so a shuffled input costs the
same as a sorted one, and the one auxiliary array is the entire space cost.

**Complexity:** `O(n)` time, `O(n)` space.
