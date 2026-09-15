# Solutions — Design Ride Sharing System

Two FIFO queues — one for riders, one for drivers — carry the arrival
order, and a waiting set marks which riders are still eligible. A match
pairs the two queue fronts; cancellation only unmarks a rider, and the
next match lazily skips front riders that are no longer waiting.

## Two FIFO queues with lazy cancellation

`riders` and `drivers` are deques appended by `addRider`/`addDriver`, so
each queue orders its side purely by arrival. The `waiting` set holds the
ids of riders that have been added but neither matched nor canceled;
`cancelRider` is a single set removal and never touches the queues.
Because the statement guarantees each riderId is added at most once,
membership in `waiting` exactly distinguishes a rider who would be paired
from one who is matched, canceled, or never added — so canceling an
already-matched or unknown rider is naturally a no-op, and a canceled
rider can never re-enter to be matched later.

`matchDriverWithRider` first pops every front rider absent from
`waiting` — each canceled rider is popped at most once over the whole
run, so the skip loop costs amortized `O(1)` per added rider. If either
queue is then empty it returns `[-1, -1]` (no match is available);
otherwise it pops the front driver and the front rider, unmarks the
rider, and returns `[driverId, riderId]` — earliest driver first, exactly
the arrival-order pairing the statement asks for. Drivers have no cancel
method, so the driver queue needs no filtering at all.

Every operation is `O(1)` amortized: adds and cancels are one append or
one hash removal, and a match's skipping is paid for by earlier adds
(a single call is worst-case `O(k)` skipping `k` canceled riders, but
each is skipped once across all `n <= 1000` calls). The queues and the
set hold one entry per live participant, so the footprint is `O(n)`.

**Complexity:** `O(1)` amortized time per call, `O(n)` space.
