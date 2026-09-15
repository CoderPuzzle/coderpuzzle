# Solutions — Zigzag Iterator

## Two indices and a turn flag

The iterator keeps the two vectors exactly as they were handed in and adds
only three integers: `i1` and `i2`, how far each vector has been served, and
`turn`, which vector owes the next element. `hasNext` is a pure query — an
element remains exactly when either index still sits inside its vector — so
it touches nothing, and any run of `hasNext` calls between `next`s is
harmless.

`next` carries the whole policy. The vector whose turn it is may have run
dry, because it was the shorter one or because its last element was just
served, and in that case the turn passes to the other vector before anything
is read; that single skip is what lets `v1 = [1,2]` against
`v2 = [3,4,5,6]` finish `5,6` straight from the second vector. The current
vector's element is then returned, its index steps forward, and the turn
flips unconditionally, so the two vectors alternate strictly for exactly as
long as both still hold elements. For the follow-up's `k` vectors the same
alternation extends by replacing the flag with a queue of the vectors cycled
in turn.

**Complexity:** `O(1)` construction; `next` and `hasNext` `O(1)` per call;
`O(1)` extra space beyond the input.
