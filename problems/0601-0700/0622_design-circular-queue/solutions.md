# Solutions — Design Circular Queue

## Fixed array with head and count

The queue is one preallocated array of `k` slots plus two integers: `head`,
the index of the oldest element, and `count`, how many slots are occupied.
The tail index is never stored — it is always derivable — because the pair
`head`/`count` pins both ends of the live region at once: `enQueue` writes
at `(head + count) % k` and `deQueue` advances `head` by one modulo `k`,
each moving a single index and leaving every other slot untouched. That
derivation is also why `count` beats the head/tail arithmetic as the third
field: with only `head` and `tail` the all-slots-used state has `tail`
collide with `head`, which is indistinguishable from empty, so a plain
two-index ring must either waste one slot or carry a flag to tell full from
empty. `count` says it outright — `isEmpty` is `count == 0`, `isFull` is
`count == k` — and lets every one of the `k` slots hold data.

The reads follow the same two anchors. `Front` is `buf[head]`; `Rear` is
`buf[(head + count - 1) % k]` — the subtraction-and-modulo that makes `Rear`
the classic off-by-one trap, since after the ring wraps, the newest element
sits _before_ `head` in array order, exactly what the example shows: with
`k = 3`, after `enQueue(1..3)`, `deQueue`, and `enQueue(4)`, the 4 lives in
slot 0 while `head` points at the 2 in slot 1, and `Rear` must answer 4.
Failed operations change nothing — `enQueue` on a full ring and `deQueue`
on an empty one return `false` before any index moves — and `Front`/`Rear`
on an empty ring answer `-1`. Nothing is ever shifted or reallocated; an
evicted value is simply overwritten when the ring next wraps onto its slot.

**Complexity:** `O(1)` per operation; `O(k)` space.
