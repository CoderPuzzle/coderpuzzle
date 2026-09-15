# Solutions — Distribute Money to Maximum Children

## Greedy eights with residual feasibility check

First give every child the mandatory 1 dollar; this costs `children` and
reduces the problem to distributing the change, where a child ends up with
exactly 8 dollars precisely when it absorbs exactly 7 extra. Any number of
children can be turned into eights as long as the remaining change can be
absorbed by whoever is left. Absorption is almost unconditionally
flexible — a leftover of 3 is the one trap, because it would force a lone
survivor up by 3 dollars onto exactly 4.

So take as many whole children into eights as the change allows (at most
`rest / 7`, and never more than all children), then walk that count down
while the residue is infeasible: either nobody remains to absorb a nonzero
residue, or exactly one child remains and would be pushed onto 4. The scan
always terminates at a valid answer because with at least two non-eight
children any residue splits harmlessly, and money below children is the
only -1 case. All quantities are bounded by 200, comfortably inside every
language's native integer range.

**Complexity:** `O(1)` time (the scan covers at most 30 counts), `O(1)`
space.
