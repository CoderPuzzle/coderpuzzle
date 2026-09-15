# Solutions — Calculate Parking Fees and Duration

## Seconds per stay, then three grouped views joined per car

Everything the answer needs reduces to one derived column: each transaction's
parked seconds. `stay` measures it once with
`strftime('%s', exit_time) - strftime('%s', entry_time)` so no later step has
to re-parse timestamps. On top of that single CTE, `totals` groups by car to
sum fees and — dividing by the same car's summed seconds scaled
`* 3600.0` (float, not integer, so fractional hours survive) — rounds the
quotient with `ROUND(..., 2)`, and `per_lot` groups by car and lot to sum
durations.

Picking `most_time_lot` is a top-1-per-group problem: `ranked` orders every
car's lots by summed duration descending and `lot_id` ascending, so the
smallest lot id owns row number 1 exactly on ties, as required; keeping
`rn = 1` rows via the join closes the result. The whole query is then one
join of two aggregations of the same base scan followed by an
`ORDER BY t.car_id`.

**Complexity:** `O(n log n)` time, `O(n)` space — `n` transactions are
scanned once per aggregate window after sorting, with linear-size
intermediates.
