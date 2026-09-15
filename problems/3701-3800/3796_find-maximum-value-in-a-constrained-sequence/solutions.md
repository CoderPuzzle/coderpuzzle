# Solutions — Find Maximum Value in a Constrained Sequence

## Two-pass bound propagation

Every position's value has a hard upper bound, and the bounds are exactly
what a greedy construction can attain. Seeding position 0 with the anchor
`cap[0] = 0`, a left sweep tightens each `cap[i]` to the smallest of the
restrictions placed on it and one step past the previous cap:
`cap[i] = min(cap[i], restriction[i], cap[i - 1] + diff[i - 1])`. A single
left-to-right pass suffices because any restriction further left reaches
position i only through its neighbor — chained caps arrive already folded
into `cap[i - 1]`. A right-to-left sweep mirrors this for restrictions that
bind from the right. The final answer is the largest cap: setting each
`a[i]` to its own cap is itself a feasible sequence (each cap differs from
its neighbor by at most `diff[i]` after both sweeps), so no larger maximum
is achievable anywhere.

Sorting the restrictions by index first lets each one land on its position
in a linear merge with the sweep, giving `O(n + r log r)` time overall for
`r` restrictions — the propagation passes themselves are linear.

All arithmetic stays comfortably inside 32 bits in the fixed-width
languages: with `a[0] = 0` and `diff[i] <= 10`, no value can ever exceed
`10 * (n - 1) <= 10⁶`, far below any overflow concern.

**Complexity:** `O(n + r log r)` time, `O(n)` space.
