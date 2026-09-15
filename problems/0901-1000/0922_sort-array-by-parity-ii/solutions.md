# Solutions — Sort Array By Parity II

The condition pairs every index with a parity rather than ordering the values
globally: even indices need even values, odd indices need odd ones, and the
pinned answer adds that each parity group arrives sorted ascending. Splitting
the values into evens and odds, sorting each group, and dealing them
alternately into the answer produces exactly that — values are compared only
inside their own group, and the half-even/half-odd guarantee makes the two
deals land together.

## Sort each half and deal by index

Walk `nums` once, test `value % 2 == 0`, and append to the even group or the
odd group accordingly. Sorting each group ascending is the only magnitude
comparison anywhere in the algorithm — evens and odds never cross paths. Zero
joins the evens — `0 % 2 == 0` — and the bounds need no care: parities of `0`
through `1000` are well defined for any 32-bit integer.

The guarantee that exactly half the integers are even gives both groups the
same length `n / 2`, so a single dealing loop writes `answer[2 * i] =
evens[i]` and `answer[2 * i + 1] = odds[i]` for every `i` and fills the whole
answer: even indices receive ascending evens, odd indices ascending odds —
precisely the pinned form.

The classic in-place alternative, a two-pointer scan that swaps the next
misindexed even with the next misindexed odd, meets the follow-up's goal
without a second array, but it leaves each parity group in a scrambled order
rather than ascending, so it does not produce the pinned answer. Sorting the
two groups dominates the work; everything else is a linear number of writes.

**Complexity:** `O(n log n)` time, `O(n)` space.
