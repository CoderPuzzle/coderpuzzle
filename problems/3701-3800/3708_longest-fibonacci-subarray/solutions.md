# Solutions — Longest Fibonacci Subarray

## Single-pass run scan

Whether the subarray ending at index `i` can be long depends only on the
local triple: a run continues through `i` exactly when `nums[i]` equals
`nums[i - 1] + nums[i - 2]`, and any two adjacent elements already form a
valid run. So the whole question collapses to one sweep that carries a
single counter: start it at 2 for the pair before the scan, and at each
index from 2 onward either grow it by one when the triple holds or snap it
back to 2 when the triple breaks. The answer is the largest value the
counter ever reaches.

The reset is what makes one pass sufficient. When a triple fails at `i`, no
valid subarray of length 3 or more can still end at `i`, so the best run
ending there is exactly the pair `[i - 1, i]` — which is precisely the
counter's reset value, and it also seeds the next candidate correctly since
the following comparison looks at the same last two elements. Nothing about
a break invalidates runs further left; they were already measured on the way
past.

Two details keep the arithmetic safe in fixed-width languages. The sum of
two elements reaches 2 × 10⁹, which grazes the signed 32-bit ceiling, and
any implementation that extends terms instead of only comparing them leaves
32 bits behind immediately — so the sum is computed in a 64-bit type (or an
arbitrary-precision integer) even though every element itself fits in 32
bits. Runs are short by nature — positive terms grow at least like the
Fibonacci sequence, so no valid run survives past roughly 44 elements under
the 10⁹ bound — but that costs nothing here: the sweep touches each element
once regardless.

**Complexity:** `O(n)` time, `O(1)` space.
