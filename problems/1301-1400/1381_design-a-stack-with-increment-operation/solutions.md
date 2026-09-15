# Solutions — Design a Stack With Increment Operation

## Lazy Increment Array

`push` and `pop` on an array-backed stack are constant time, so the whole
problem hides inside `increment(k, val)`: its literal meaning — add `val` to
the bottom `min(k, depth)` elements — costs `O(k)` if done immediately. The
`CustomStack` class instead defers that work to the moment each element
leaves.

Alongside the values it keeps a parallel `pending` array with the same depth:
`pending[i]` is the accumulated increment that every element at depth `i` or
below has already earned but not yet had applied. `increment(k, val)` then
becomes a single write — `pending[min(k, depth) - 1] += val` — marking the
deepest slot the increment reaches. `pop` closes the loop: the popped element
receives its `pending` add on the way out, and because every element that was
pushed _before_ it also deserved the same increments (they were aimed at the
bottom of the stack), the slot's pending value is folded into the new deepest
slot before being discarded.

Why is the fold correct? Increments always target a _prefix_ of the stack, so
at any moment the pending values are non-decreasing from top to bottom in what
they cover; the element being popped absorbed exactly the increments recorded
against its own depth and everything below it, which is precisely what the
next element down still owes.

Both the Python and Java canonical solutions implement this scheme with two
parallel arrays (the Java version preallocates `maxSize` slots and tracks a
`size` counter). Every operation touches a constant number of cells,
satisfying the follow-up even when `k` equals the stack size.

**Complexity:** `O(1)` time per `push`/`pop`/`increment`, `O(maxSize)` space.
