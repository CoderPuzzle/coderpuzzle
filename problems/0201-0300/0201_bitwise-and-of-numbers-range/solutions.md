# Solutions — Bitwise AND of Numbers Range

Both variants recover the same quantity — the common binary prefix of the
two endpoints — without ever walking the range; one aligns the endpoints by
shifting, the other carves the suffix off the larger endpoint bit by bit.

## common_prefix

The AND of every number in `[left, right]` keeps a bit set only if _all_ of them have that bit set. Any bit below the common binary prefix of `left` and `right` is guaranteed to differ somewhere in the range — as the counter walks from `left` to `right`, every suffix bit flips through 0 — so those bits all vanish. What survives is exactly the shared prefix of the two endpoints, padded with zeros.

The implementation extracts that prefix by repeatedly shifting both endpoints right until they become equal, counting the shifts. At that point the numbers agree on every remaining bit, and shifting the value back left by the counted amount restores the common prefix in its original position. The loop runs at most 31 times for 32-bit inputs, so the work is proportional to the bit length rather than to the size of the range — even `[1, 2147483647]` is answered after ~31 iterations with 0, because the endpoints share no prefix bit.

The degenerate case `left == right` never enters the loop and simply returns the number itself, which is correct since a one-element range ANDs to itself.

**Complexity:** `O(log right)` time, `O(1)` space.

## brian_kernighan

The same conclusion, reached from the `right` end alone. `right & (right - 1)` — Brian Kernighan's bit-clearing identity — knocks out `right`'s lowest set bit, and repeating that while `right > left` strips exactly the suffix in which the endpoints disagree: each cleared bit is one that flips somewhere inside `[left, right]` (either it differs between the endpoints already, or the clearing walk crosses a multiple of its place value), so it could not have survived the AND anyway. What cannot be cleared is a bit where every number from `left` to `right` agrees — precisely the common prefix.

The loop stops after at most 31 clearings (`right` runs out of disagreeing set bits, or drops to `left`), leaving the prefix in place as the answer; `left == right` skips it entirely. One comparison and one AND per iteration makes this the tighter of the two loops, at the cost of an argument (the prefix invariant) that is slightly less immediate than shift-until-equal.

**Complexity:** `O(log right)` time, `O(1)` space.
