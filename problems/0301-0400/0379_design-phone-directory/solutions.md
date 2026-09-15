# Solutions — Design Phone Directory

## Used set, fresh counter, released min-heap

The directory keeps three small structures: a used set of the numbers
currently assigned, a `next` counter pointing at the smallest number never
yet handed out, and a min-heap of the numbers that were assigned and later
released. `get` pops the heap's minimum when one exists and only otherwise
mints `next`; since every released number is smaller than every fresh one,
that pop is exactly the pinned policy — the smallest available number — and
once both sources run dry, `get` answers `-1`. `check` is a single set
lookup, and the counter needs no bookkeeping of its own because fresh
numbers are minted in ascending order.

The used set also carries the correctness of `release`. A number is pushed
onto the heap only when `release` takes it out of the used set, so
releasing a number that is already available — a double release, or one
that was never assigned — is a no-op, and no number can ever sit in the
heap twice or be handed out twice. The example runs the discipline end to
end: `get` answers 0, then 1; `check(2)` is true until `get` takes the 2
and false after; `release(2)` puts it back, and the final `check(2)` is
true again.

**Complexity:** `O(log R)` per `get` and per `release`, with `R` the
released numbers waiting in the heap; `O(1)` per `check`; `O(n)` space for
`n` = `maxNumbers` slots.
