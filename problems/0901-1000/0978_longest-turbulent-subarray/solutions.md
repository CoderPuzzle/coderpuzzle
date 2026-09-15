# Solutions — Longest Turbulent Subarray

## Single sweep with a running sign state

Turbulence is a property of consecutive pairs, so a turbulent subarray is
exactly a stretch of the array where the comparison sign alternates —
greater, then less, then greater — between each pair of neighbours. Such
stretches partition the array the way increasing runs do: every position
closes exactly one maximal alternating stretch, the one ending at it, and
the answer is the longest one. One left-to-right pass sees them all with
two counters — `run`, the alternating stretch under the cursor, and
`best`, the longest one so far — plus one extra piece of state an
increasing-run counter does not need: the sign of the previous comparison,
because a step continues the run only by flipping that sign.

Each comparison of `arr[i]` against `arr[i - 1]` is classified as rising,
falling, or equal, and the three cases map cleanly. A flip of the previous
sign extends `run` by one. A repeat of it — two rises or two falls in a
row — ends the stretch, and `run` restarts at 2 on the fresh pair
`arr[i - 1], arr[i]`, which alternates against nothing yet. An equal pair
restarts at 1: a lone turbulent element is a subarray of length 1, and two
equal neighbours can never sit inside any turbulent window. Both counters
start at 1, which is why a one-element array answers 1 without the loop
ever running, and `best` is updated while the run grows — a stretch
reaches its full length exactly at its closing element, right where the
next comparison fails or the array ends, so updating only on a break would
miss a stretch that closes at the last element.

Example 1 walks the traps: `[9,4,2,10,7,8,8,1,9]` alternates through
`[4,2,10,7,8]` for a run of 5, the equal 8s cut back to 1, and the tail
`[8,1,9]` climbs back to 3, so the answer is 5. Example 2's `[4,8,12,16]`
never flips a sign, so no run outgrows the opening pair and the answer is
2 — also what any two unequal elements give. The elements are only ever
compared, never combined, so the constraint's 10⁹ extreme needs no wider
arithmetic.

**Complexity:** `O(n)` time, `O(1)` space.
