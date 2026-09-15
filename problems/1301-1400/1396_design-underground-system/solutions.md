# Solutions — Design Underground System

## Two Hash Tables: Pending Check-ins and Pair Totals

A trip lives in two phases, and each phase wants its own map. While a
customer is traveling, the only facts are where and when they checked in —
`checkins` holds exactly that, keyed by customer id. Once they check out, the
trip collapses into one number, its duration, and the interesting key is no
longer the customer but the ordered station pair.

`checkOut` therefore pops the pending check-in and folds `t - t_in` into a
per-pair bucket holding just a running sum and a count. Nothing else is
retained: `getAverageTime` divides the two and returns, in constant time,
without ever storing a list of trip durations. Consuming the check-in entry
on checkout also means a customer id is free to travel again immediately.

Stations are alphanumeric, so the Java canonical solution packs each ordered
pair into the composite key `start + "->" + end` with `long` accumulators
(sum of durations up to `2 * 10⁴` trips of `10⁶` time units each); the Python
one keys on the tuple `(start, end)` directly. Both return the exact IEEE-754
quotient `total / count`, which the tolerance-based checker accepts.

**Complexity:** `O(1)` average time per call, `O(p + s²)` space for `p`
pending check-ins and the distinct station pairs seen (`s²` in theory, at
most `2 * 10⁴` pairs in practice).
