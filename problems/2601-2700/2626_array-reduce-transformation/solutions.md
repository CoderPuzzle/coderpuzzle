# Solutions — Array Reduce Transformation

The reduction is a single accumulator driven left to right across nums.
`init` seeds it, every element updates it through `fn`, and the final
value is the answer — the empty array just never starts the loop.

## Accumulator Loop

A plain forward loop is the entire algorithm. `res` starts at `init`; on
step i it becomes `fn(res, nums[i])`, which is exactly the operation
sequence the statement spells out (`val = fn(init, nums[0])`, then
`val = fn(val, nums[1])`, and so on): the return value of each call feeds
the next one as its accumulator argument. When nums has length 0 the loop
body never runs and `res` is returned untouched, so the init-only case
falls out of the same code path without a special branch. The built-in
`Array.reduce` stays off-limits per the statement — the loop here IS the
reduction, with no library call standing in for it.

Every value in play is bounded by the constraints (1000 elements whose
values plus the initial accumulator cap at 1000), so a JavaScript number
holds any reachable intermediate exactly: even the square-sum reducer at
the boundary peaks at 1,000,001,000, far inside exact integer range, and
each step does constant work regardless of the reducer's own cost.

**Complexity:** `O(n)` time, `O(1)` space.
