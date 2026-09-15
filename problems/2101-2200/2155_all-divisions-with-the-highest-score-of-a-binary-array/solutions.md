# Solutions — All Divisions With the Highest Score of a Binary Array

There are `n + 1` division points and each asks for two counts: the
zeros left of the cut and the ones right of it. Evaluated independently
that is `O(n²)` work, but neighbouring division points differ by a
single element moving across the cut — so both counts can be carried
from one index to the next instead of recomputed.

## One sweep with running counters

Count `total_ones` first. Then walk the cut from `i = 0` to `n`,
maintaining `zeros_left` (zeros seen so far) and `ones_left` (ones seen
so far); the ones on the right are always `total_ones - ones_left`, so
`score(i) = zeros_left + total_ones - ones_left` before absorbing
`nums[i]` into the left counters. The best score and its index list are
updated in the same pass — a strictly better score resets the list, a
tie appends — and because `i` climbs monotonically the answer comes out
in ascending order, which the statement accepts alongside any
permutation.

Every score is bounded by `n = 10⁵`, far inside 32-bit integers and, for
JavaScript, far below the `2^53` point where `Number` loses exactness —
no widening anywhere. The worst shape is an alternating array, where
about half of all indices share the top score: the returned list then
holds roughly `n / 2 + 1` indices, still a single `O(n)` allocation.

**Complexity:** `O(n)` time, `O(n)` space (output).
