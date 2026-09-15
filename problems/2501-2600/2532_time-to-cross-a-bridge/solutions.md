# Solutions — Time to Cross a Bridge

The bridge serializes everything, so one clock variable — "the instant the
bridge becomes free again" — plus two ready queues is enough to replay the
whole schedule. Every worker's priority is fixed for the entire run: it is
its `left_i + right_i` sum, ties broken toward the larger index, so each
ready queue is a heap keyed by that static pair and "least efficient" is
just the heap's first element.

## Two-heap event simulation

Keep a heap of boxed workers waiting on the right bank, a heap of workers
waiting to be dispatched from the left bank, and a pending list of phase
completions keyed by ready time. Each round, mature every completion whose
ready time has passed by the current clock; then let exactly one crossing
happen: a right-bank worker whenever one exists (rule 2), otherwise the best
left-bank worker while fewer than `n` have been dispatched (rule 3). A left
dispatch schedules its pick completion at `clock + right + pick`; a leftward
crossing delivers its box at `clock + left`, recording that instant as the
answer so far, and schedules the put afterwards — except for the final box,
whose put changes nothing and is skipped. When nobody can cross the clock
jumps forward to the next ready time instead of ticking minute by minute.

Each of the `n` dispatches and `n` deliveries costs one heap operation, and
between them every worker re-enters a queue through the pending list at most
once per phase, so the simulation touches O(n + k) events with O(log k) work
apiece. All quantities stay below 4·10⁷, comfortably inside 32-bit range.

**Complexity:** `O((n + k) log k)` time, `O(k)` space.
