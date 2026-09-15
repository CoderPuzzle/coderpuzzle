# Solutions — Booking Concert Tickets in Groups

## Max-plus-Sum Segment Tree over Remaining Seats

Because every allocation in a row takes the next contiguous block from the
left, a row's whole state is a single number — its remaining seats — and a
`gather` landing in row `r` starts at seat `m - remaining[r]`. The hall is
then just an integer array, and the two operations become array queries over
the prefix `[0, maxRow]`:

- `gather(k, maxRow)` needs the first index whose value is at least `k`
  (a contiguous block of `k` free seats exists there and nowhere earlier),
- `scatter(k, maxRow)` first needs to know whether the prefix sums to at
  least `k`.

A segment tree storing **both** the sum and the max of every range answers
each in logarithmic time, with point updates whenever seats are taken. The
first-index query is a root descent that prefers the left child whenever it
intersects the query prefix and its max reaches `k`, falling back to the
right child when the left dead-ends — a valid row can never be skipped
because a dead end means every index of that subtree below `maxRow` (or all
of it) is under `k`.

`scatter`'s fill phase walks positive rows from the front, draining each
fully before moving on. Failed `gather`/`scatter` calls touch nothing — the
sum check rejects before any update — so state only ever changes on success.
Since seats are never freed, each row is emptied at most once over the whole
run, making the fill phase amortized logarithmic per call. Sums use 64 bits
(`n * m` reaches `5 * 10¹³`).

Both the Python and Java canonical solutions implement exactly this
structure; the time limit is raised because the Python tree recurses through
`5 * 10⁴` mixed calls.

**Complexity:** `O(log n)` per `gather`, `O(log n)` amortized per `scatter`
(fill-phase row drains are amortized against `n`), `O(n)` space.
