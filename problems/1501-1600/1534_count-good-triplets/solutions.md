# Solutions — Count Good Triplets

## Triple loop over every index pair and third index

`arr.length` is capped at 100, so even the naive enumeration of every
ordered triple of indices only ever examines at most 100 choose 3
triples — well within budget. The code walks `i` from `0` to
`arr.length - 1`, `j` from `i + 1`, and `k` from `j + 1`, checking the
three absolute-difference bounds against `a`, `b`, and `c` in order and
short-circuiting to the next `k` as soon as one bound fails.

Because the loops enforce `i < j < k` directly there is no risk of
double-counting a triplet or comparing an index against itself; every
combination is visited exactly once, and a running counter is
incremented whenever all three conditions hold together.

**Complexity:** `O(n^3)` time, `O(1)` space.
