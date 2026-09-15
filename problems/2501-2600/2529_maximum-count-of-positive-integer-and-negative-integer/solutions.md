# Solutions — Maximum Count of Positive Integer and Negative Integer

Both approaches tally the same two numbers — `neg` for the entries strictly
below zero, `pos` for the entries strictly above zero, the zeros in between
belonging to neither camp — and return the larger. The scan is the
statement's own reading: one walk over `nums`, one increment per nonzero
sign, blind to the order the input arrives in. Sortedness then upgrades it,
because each camp occupies a contiguous run — a negative prefix and a
positive suffix — so the two counts reduce to two boundaries, and a
boundary in ordered data is one binary search away.

## Linear scan of the signs

The statement defines the answer outright: `neg` counts the entries strictly
below zero, `pos` counts the entries strictly above zero, and the return
value is the larger of the two. Reading it off needs no cleverness — one
pass over `nums`, adding one to `neg` for every value below zero and one to
`pos` for every value above zero, with the zeros falling through both
branches because they join neither camp.

That reading is completely blind to the order: the loop never compares an
element with its neighbor, so it would return the same tallies over an
unsorted array. The obliviousness is the price. Sorted data lets both
boundaries be found after inspecting only a couple of dozen entries; the
scan insists on visiting all `n` of them. At `n <= 2000` that is still one
cheap sweep, comfortably inside the limits — it is exactly the obvious scan
the follow-up names as its baseline, not an answer to it. Both tallies are
bounded by the array length, so 32-bit arithmetic suffices everywhere and
JavaScript numbers stay exact far below `2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.

## Binary search for the two boundaries

Sorting hands us the counts almost for free. The negative integers are a
prefix of `nums` — everything before the first element that is not below
zero — and the positive integers are a suffix, everything from the first
element that reaches one onward. Zeros, which belong to neither group,
occupy whatever sits between those two boundary points.

So two lower-bound style binary searches settle it in `O(log n)`: one at
`0` gives `neg`, the length of the all-negative prefix, and one at `1`
gives the index where the positive suffix begins, so `pos` is `n` minus
that index. The answer is simply the larger of the two. An all-positive,
all-negative, or all-zero array degenerates cleanly to one empty side and
the search returns an endpoint.

Counting linearly would also pass at these constraints, but the follow-up
asks for logarithmic time and this delivers it: ~20 comparisons per
boundary even at `n = 2000`. Counts are bounded by the array length, so
32-bit arithmetic suffices everywhere and JavaScript numbers stay exact
far below `2⁵³`.

**Complexity:** `O(log n)` time, `O(1)` space.
