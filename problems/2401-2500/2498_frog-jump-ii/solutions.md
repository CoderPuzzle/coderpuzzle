# Solutions — Frog Jump II

The round trip uses each river stone at most once, but both directions
must share the first and last stones. That sharing is what pins the cost:
any strategy partitions the interior stones between an outbound set and a
return set, and the paid price is the largest adjacent-position hop
inside either set, read in sorted order.

## Interleaved route pairing

Give the outbound leg the even-indexed stones and let the return leg
sweep up the odd-indexed ones — both legs begin at `stones[0]` and end at
`stones[n-1]`. Inside one such route, consecutive visited positions are
second neighbors in `stones`, so no single hop can be smaller than the
largest second-neighbor difference; meanwhile this pairing achieves
exactly that bound, since every one of its hops spans precisely two array
steps (plus the forced opening pair `stones[1] - stones[0]`, which sits on
the same route as index 0's immediate successor). One linear scan taking
the maximum over those differences therefore returns the exact optimum.

Positions reach `10⁹`, so each difference fits a native 32-bit integer,
and with `n <= 10⁵` the scan stays comfortably within the limits.

**Complexity:** `O(n)` time, `O(1)` space.
