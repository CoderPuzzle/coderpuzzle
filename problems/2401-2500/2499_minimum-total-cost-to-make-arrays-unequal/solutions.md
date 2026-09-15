# Solutions — Minimum Total Cost to Make Arrays Unequal

A column where `nums1[i] == nums2[i]` is broken from birth, and swaps can
only shuffle values around — so every such column must participate in some
swap cycle, while any swap plan realizes a permutation of exactly the
columns it touches. Two facts drive the whole solution: a rotation over
the chosen set exists precisely when no single value claims half or more
of it, and every extra column recruited into that set makes its new index
unavoidable cost.

## Equal-column histogram plus cheapest donors

Pay for all equal indices up front — their sum is a hard floor, because a
feasible plan must touch each one at least once — and count how often each
value sits among them. If some value `x` occupies more than half of the
chosen set, every column carrying a different value on both sides (and
itself unequal) can be drafted into the rotation to dilute `x`; scanning
candidate columns in ascending order buys exactly the cheapest dilution
each step until `x` holds at most half. If the pool runs dry first, the
dominance cannot be broken by any plan, and the answer is `-1`.

Costs reach `n(n-1)/2 ≈ 5·10⁹` at the constraint maximum, past 32-bit
range, so accumulators widen to 64 bits throughout. Everything runs in a
constant number of linear passes: one histogram sweep, one donor scan,
plus hash-map updates — comfortably inside limits at `n = 10⁵`.

**Complexity:** `O(n)` time, `O(n)` space.
