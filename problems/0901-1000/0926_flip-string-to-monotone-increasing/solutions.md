# Solutions — Flip String to Monotone Increasing

A monotone increasing string is a run of 0's closed off by a run of 1's, so
the target the flips must produce is picked by a single decision: where the
0-run ends. Left of that boundary every character must read '0', right of it
every character must read '1', and each character already facing the wrong
way costs exactly one flip — boundary `j` costs the 1's before it plus the
0's after it, and the answer is the cheapest of the `n + 1` boundaries on
offer. That minimum can be carried through `s` in one sweep without ever
naming a boundary.

## The boundary sweep

Walk `s` once holding two numbers: `ones`, how many 1's have appeared, and
`flips`, the cheapest way to make the prefix read so far monotone increasing.
A '1' never has to move — appending an unflipped 1 to any monotone prefix
leaves it monotone — so it only raises `ones`. A '0' is the only character
that can break monotonicity, and there are exactly two ways to absorb it:
flip it to '1' and append, at cost `flips + 1`, or keep it, which is legal
only once the prefix's 1's have all been flipped away, at cost `ones`. The
cheaper of the two is the new `flips`.

The two options are the boundary choice in miniature: keeping the '0' extends
the 0-run with every earlier 1 already paid for, flipping it moves the
boundary past this position. So `flips` is exactly the minimum, over
boundaries inside the prefix, of 1's before the boundary plus 0's after it —
and once the sweep ends, that is the full minimum. For `s = "00110"` the
trailing '0' meets `ones = 2` with `flips = 0` and settles at 1, flipping the
last digit into the example's `00111`; `"010110"` ends the same race at 2,
buying either `011111` or `000111`; and `"00011000"` prefers `00000000`,
again for 2. The answer never exceeds `s.length`, so a 32-bit integer
carries it everywhere.

**Complexity:** `O(n)` time, `O(1)` space.
