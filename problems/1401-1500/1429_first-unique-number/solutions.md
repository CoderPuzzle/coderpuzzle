# Solutions — First Unique Number

## Counts plus a queue with lazy eviction

Keep two structures: a count map saying how many times each value has
ever been enqueued, and a queue holding every value in arrival order.
`add` appends to the queue and increments the count — O(1), with no
bookkeeping about uniqueness at insertion time.

`showFirstUnique` then exploits a monotonicity the counts give for free:
once a value's count exceeds one it never returns to one, so the front of
the queue can never become unique again after being duplicated. The
query pops from the front while the head's count exceeds one (those
elements are permanently dead), then answers with the new head's value —
or `-1` when the queue empties. Each popped element leaves forever, so
across all calls the total popping work is bounded by the total number of
insertions: amortized `O(1)` per operation.

The constructor is just a loop of `add`s over the initial array, so a
large `nums` is processed once and every later call is constant time on
average. Values reach `10⁸`, which fits the 64-bit wire type and every
language's native integers comfortably.

**Complexity:** amortized `O(1)` per `add` and `showFirstUnique`,
`O(n)` space for the queue and counts.
