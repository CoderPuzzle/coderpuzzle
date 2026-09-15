# Solutions — RLE Iterator

The decoded sequence can hold up to 500 × 10⁹ elements, so the only workable
design never decodes it: everything is answered from the run structure alone.

## Cursor over the runs

The iterator keeps the encoding itself plus one cursor — the index of the run
currently being spent — and treats each run's count as a budget that shrinks
in place. `next(n)` walks forward while the current run's remaining count is
smaller than `n`, subtracting each exhausted run's remainder from `n` and
stepping the cursor two slots past it. The walk stops on the first run rich
enough to supply the `n`-th element: whatever is left of `n` is subtracted
from that run's count, and the run's value is the answer. Runs of length zero
never stop the walk — a count of `0` is smaller than any `n` — so empty runs
cost nothing but a cursor step.

Amortization comes from the cursor only ever moving forward: every run is
stepped past at most once over the object's whole lifetime, so a thousand
calls together traverse the thousand-slot encoding a single time, and each
call does `O(1)` amortized work even when it skips many runs at once.
Exhaustion falls out of the same walk: if the cursor runs off the end, the
`n`-th element does not exist, so the call returns `-1` — and since the
subtractions already consumed every remaining run on the way, every further
call re-discovers the empty iterator immediately and answers `-1` without
moving anything.

No intermediate value ever leaves a narrow range: each count and each `n` is
at most `10⁹`, the running `n` only shrinks (each subtraction removes a run
smaller than the `n` it exhausts), and the decremented count stays within
`[0, 10⁹]` — so plain 32-bit arithmetic carries the whole computation even
though the sequence it stands in for is billions of elements long.

**Complexity:** `O(1)` amortized per query, `O(1)` space.
