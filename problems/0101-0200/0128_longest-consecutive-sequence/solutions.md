# Solutions — Longest Consecutive Sequence

Both variants begin the same way: strip away what the chains do not care
about — positions and duplicates — and then measure the maximal runs that
remain. The sorted variant orders a copy and finds every chain already laid
out end to end as a contiguous run of `+1` steps; the hash variant pours the
values into a set and walks each chain from its one true bottom. The sort
spends `O(n log n)` to make the measuring itself trivial; the hash walk is
the one that meets the statement's linear-time aim.

## Sort Scan

Sorted order is another way to answer "does `v + 1` exist?" In a sorted array
the question becomes "is the very next entry one larger?", which needs no table
at all. Pour the values into a sorted copy and each maximal chain turns into a
physical object: one contiguous run of entries stepping up by exactly one, with
a gap or an equal repeat marking where runs break.

The walk carries a single counter. An entry one larger than its predecessor
extends the current run; a jump of two or more is a gap, so the chain broke and
the run restarts at one; an equal entry is a duplicate of a value already
counted, and the run simply keeps its length. The largest value the counter
ever reaches is the answer. An empty array never enters the loop, so `0` falls
out for free.

The trade is stated openly in the problem: sorting costs `O(n log n)` against
the hash walk's linear sweep, which is why the statement calls this the easier
but slower route. What the sort buys is that no chain-bottom guard, no
membership test, and no nested walk remain — just neighbours compared — and it
is the natural shape whenever the input must be ordered anyway.

**Complexity:** `O(n log n)` time, `O(n)` space for the sorted copy.

## Sequence-Start Walking in a Hash Set

Dump all numbers into a hash set, which collapses duplicates and makes membership an O(1) test. A number can be the start of a consecutive run only when `value - 1` is absent from the set — every maximal run has exactly one such start — so walking upward from each start (value, value + 1, value + 2, ...) measures that run's full length without sorting anything.

The guard `value - 1 not in values` is what makes the nested loop linear. The inner walk runs only from true sequence starts, so each member of each run is stepped over once inside some walk and inspected once more by the outer loop: every element is touched at most twice overall, despite the algorithm's appearance.

An empty array leaves the set empty and returns 0. Duplicates cannot inflate any count because the set keeps one copy, and negative values intermix freely since only plus-or-minus-one arithmetic is involved.

**Complexity:** `O(n)` time, `O(n)` space.
