# Solutions — Total Waviness of Numbers in Range II

Both solutions replace the impossible enumeration of almost `10¹⁵` numbers
with a prefix function `f(N)` — the total waviness of `[1, N]` — so the
answer is `f(num2) − f(num1 − 1)`. They differ in how `f(N)` is computed.
The slot-counting decomposition asks, for every interior position
separately, how many numbers up to `N` turn at that position; complete
digit-length blocks below the top one close by pure multiplication, no scan
at all. The digit walk instead sweeps N's digits once, carrying the last two
placed digits so each turn is scored the moment its right neighbor lands.

## Slot Counting

A number's waviness is a sum over its interior positions, and totals can be
reordered: `f(N)` equals the sum, over every interior position `i`, of how
many numbers in `[1, N]` have a peak or a valley at `i`. Fix the number's
length `L` (numbers with fewer than three digits contribute nothing) and pin
a specific wavy triple `(a, m, b)` — `m` strictly above or below both
neighbors — onto the three consecutive slots ending at position `i`.
Counting numbers of length exactly `L`, bounded by `N`, carrying that triple
at that spot, needs no search: compare against N's digits position by
position. While the prefix still matches N's prefix, a free position offers
`N[i]` choices below it (nine at the leading position), a pinned position
either allows its one value or blocks the branch; once the prefix drops
strictly below, everything after is unconstrained except for other pins; if
a pinned position disagrees before the drop happens, this break point is
dead. Adding the count for `N` itself closes the enumeration.

The triples are only 570 (each middle digit pairs with 285 peak shapes and
285 valley shapes), and a leading zero is excluded when the triple touches
position 0. Whole blocks `[10^(L−1), 10^L)` fully below N's length collapse
to a formula: per interior slot, 570-or-525 triples times the freedom of the
remaining `L − 3` digits (`9·10^(L−4)` when the leading digit is not part of
the triple, `10^(L−3)` when it is). Every quantity stays inside int64.

**Complexity:** `O(log²₁₀ N · D)` time per prefix evaluation with `D = 570`
triples — about `log₁₀³ N` elementary steps — and `O(1)` space.

## Digit Walk

One left-to-right sweep over N's digits computes the whole prefix total.
Live prefixes fall into two groups: _tight_ ones still equal to N's prefix,
and _free_ ones already strictly below it. Each group is a table indexed by
`(started, last digit, second-last digit)` — started marks whether a nonzero
leading digit has been placed, so leading zeros never masquerade as digits
of the number — holding both a count of completions and the waviness those
prefixes have banked so far. Digit 10 plays "no digit yet".

Advancing one position branches over the next digit `x`: a tight prefix may
use any digit up to N's own (choosing it keeps the prefix tight; anything
smaller falls into the free group), while a free prefix may use all ten. A
turn is scored exactly when the right neighbor arrives — the middle digit's
peak or valley status is decided by comparing it with its two neighbors, and
the gain multiplies the completion count because every suffix inherits the
event. The started flag routes the bookkeeping: unstarted prefixes placing
zero stay unstarted, placing nonzero records their first digit. At the end
every number from 1 to N sits somewhere in the tables, so their waviness
sums add up to `f(N)`.

The sweep runs at most 16 rounds over tables of `2 · 11 · 11` entries, and
all arithmetic is additions and comparisons. The largest achievable answer
is `f(10¹⁵) ≈ 7.4 × 10¹⁵`, which needs 64-bit accumulation in fixed-width
languages yet stays exact even under JavaScript's `2⁵³` integer ceiling.

**Complexity:** `O(11² · 10 · log₁₀ N)` time — at most sixteen rounds over
tables of `2 · 11²` entries with ten transitions each — and `O(11²)` space.
