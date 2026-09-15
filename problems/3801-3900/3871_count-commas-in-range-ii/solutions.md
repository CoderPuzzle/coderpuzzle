# Solutions — Count Commas in Range II

Standard number formatting inserts a comma after every three digits counting
from the right, so a number with d digits carries `(d - 1) / 3` commas — one
for each completed group of three. The numbers therefore split into comma
groups by digit length: 4–6 digits carry one comma, 7–9 carry two, and so on,
with each group spanning `[10^(3k), 10^(3k+3) - 1)`.

## Comma-group walk

Start at 1000, the first number with a comma, and step through the groups one
at a time. For the group beginning at `lo`, every number up to `hi = lo * 1000

- 1`carries the same comma count, so the group contributes`commas * (hi - lo

* 1)`when the whole group fits below n, or`commas * (n - lo + 1)`when n
cuts the group short. Clamping`hi`to n before subtracting handles both cases
in one expression, and the next group starts at`hi + 1`.

The loop advances `lo` by a factor of 1000 each pass, so it runs at most six
times for `n <= 10¹⁵` — the final group holding 10¹⁵ itself, which has five
commas. The answer reaches about `4 * 10¹⁵`, beyond 32 bits, so the typed
languages use their 64-bit integer types throughout; in JavaScript the
answer stays far inside `Number`'s exact 2⁵³ range and the upper bound of a
group is clamped back to n before any arithmetic, keeping every computed
value exact.

**Complexity:** `O(log n)` time, `O(1)` space.
