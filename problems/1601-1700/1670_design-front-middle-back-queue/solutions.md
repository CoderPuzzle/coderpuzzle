# Solutions — Design Front Middle Back Queue

## Two Halves, Rebalanced After Every Mutation

The queue lives in two deques split at the seam: `front` holds the first
`ceil(n/2)` elements, `back` the rest. Every mutating call ends by
restoring that split — moving at most one element across the seam — so
both the middle and its neighbors always sit at an end of one deque, and
all six operations are end operations.

The frontmost-middle convention falls out of the split. With `ceil(n/2)`
elements up front, the frontmost of the two middle positions is the back
of `front` at every length, so `popMiddle` is one `pop_back` whether the
queue is odd or even. `pushMiddle` must instead drop the new value one
slot before that: when `front` is the bigger half, its last element
moves to `back` first, and the value is appended to `front` — landing
exactly at the frontmost middle of the result. `popBack` empties `back`
before touching `front`, and every pop returns `-1` only when both
halves are empty.

No operation ever walks the queue: pushes and pops touch a constant
number of deque ends, and the rebalance is a single element moving
across the seam, so the two deques carry the whole `n`-element state in
linear space.

**Complexity:** `O(1)` amortized per operation, `O(n)` space.
