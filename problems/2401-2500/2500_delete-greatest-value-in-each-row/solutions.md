# Solutions — Delete Greatest Value in Each Row

## Sort each row descending, then take column maxima

Simulating the rounds literally — scanning for each row's greatest
remaining cell, marking it deleted, repeating — costs `O(m · n²)` time in
the naive form. The observation that removes all of that bookkeeping is
that deletion never changes a row's internal order statistics: after a
row has been sorted descending, round `k` deletes exactly its `k`-th
largest element, no matter which of several equal maxima was chosen,
because equal values are interchangeable.

So sort every row descending once, up front. In round `k`, row `i`
contributes its value at position `k-1`, and the round adds `max over i`
of those to the answer, exactly as the statement prescribes. The answer
is one pass of `n` such column-maxima sums.

All values are positive integers up to `100` and there are at most `n ≤
50` rounds, so the answer fits easily below `5000`; 32-bit arithmetic is
exact in every language.

**Complexity:** `O(m · n log n)` time for the per-row sorts, `O(1)`
auxiliary space when rows are sorted in place (`O(m · n)` where
implementations copy rows first).
