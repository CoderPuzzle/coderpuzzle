# Solutions — Kth Missing Positive Number

Both approaches work the same terrain: `arr` is strictly increasing, so
the positive integers that fail to appear sit in the gaps between
consecutive values, and the task is to report the kth of them. The
linear scan walks the array once, spending each gap's absent positives
against `k` as it passes — the first gap deep enough to cover the
remaining count surrenders the answer, and a walk that outlasts every
gap leaves the rest running consecutively past the last element. The
binary search brings an argument instead: the count of absent positives
up through `arr[i]` never decreases, so bisection finds where it first
reaches `k` and places the answer from that position alone — strictly
better at these bounds, so the search closes the file as the reference.

## Linear Scan on Gaps

The scan takes the statement at its word: list the positive integers
that fail to appear, in order, and read off the one in position `k`.
With `arr` strictly increasing, that listing is made of the stretches
between consecutive present values — every integer strictly between two
of them is absent — plus everything past the last element. Starting
`prev` at `0` folds the stretch below the first element into one more
gap like the rest.

The walk keeps `prev`, the last present value consumed, and at each step
asks a single question of the gap just reached: it holds
`v - prev - 1` absent positives, and if that already covers the `k`
still owed, the answer is the kth integer past `prev`, namely
`prev + k`. Otherwise the gap is spent whole — `k` drops by its size
and `prev` advances to `v` — and the walk moves on. Reaching the end
with `k` still positive means every absent positive up to the last
element has been spent and the survivors run consecutively: the answer
sits `k` past the final value.

**Complexity:** `O(n)` time, `O(1)` space.

## Binary Search on Missing Count

If `arr` had no gaps it would read `1, 2, 3, ...`, so `arr[i]` would equal
`i + 1`. The difference `missing(i) = arr[i] - (i + 1)` therefore counts
exactly how many positive integers are missing among `1..arr[i]`, and
because `arr` is strictly increasing this count never decreases as `i`
grows — which is what makes binary search applicable.

The code searches `[0, n]` for the smallest index `lo` whose missing
count is at least `k` (treating the position just past the end as having
an unbounded count, so the search always terminates). Every index before
`lo` still has fewer than `k` numbers missing, so the `k`th missing
positive integer is exactly `k` past those accounted-for slots: it sits
at `lo + k`. This single formula covers both cases at once — when `lo`
lands inside the array the answer falls in a gap between two present
values, and when `lo` reaches `n` (the whole array holds fewer than `k`
missing numbers) the answer falls beyond the last element.

**Complexity:** `O(log n)` time, `O(1)` space.
