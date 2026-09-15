# Solutions — Design Circular Deque

## Fixed array with head and count

The deque is one preallocated array of `k` slots plus two integers: `head`,
the index of the front element, and `count`, how many slots are occupied.
Neither end needs a stored index of its own, because the pair pins both
ends of the live region at once: the rear element sits at
`(head + count - 1) % k`, a rear insert writes one past it at
`(head + count) % k`, and a front insert claims the slot `head` steps back
to. `count` (rather than a head/tail index pair) is what lets every one of
the `k` slots hold data: with only two indices the all-slots-used state
has `tail` collide with `head`, indistinguishable from empty, so a plain
two-index ring must waste a slot or carry a flag. `count` says it
outright — `isEmpty` is `count == 0`, `isFull` is `count == k`.

Every mutating method is a mirror of its opposite across the ring.
`insertLast` writes at `(head + count) % k` and grows the live region
rightward; `insertFront` steps `head` back one modulo `k` and writes
there, growing it leftward. `deleteFront` advances `head`; `deleteLast`
is the cheapest of the eight, because the rear slot is derivable —
retiring it is nothing but `count -= 1`, no index moves at all. Failed
operations change nothing: both inserts return `false` on a full ring and
both deletes on an empty one before anything moves, and both gets answer
`-1` on an empty ring. Nothing is ever shifted or reallocated; an evicted
value is simply overwritten when the ring next wraps onto its slot.

**Complexity:** `O(1)` per operation; `O(k)` space.
