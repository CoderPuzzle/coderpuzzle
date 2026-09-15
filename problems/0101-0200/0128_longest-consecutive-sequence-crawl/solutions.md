# Solutions — Longest Consecutive Sequence

Both variants begin the same way: strip away what the chains do not care
about — positions and duplicates — and then measure the maximal runs that
remain. The sorted variant orders a copy and finds every chain already laid
out end to end as a contiguous run of `+1` steps; the hash variant pours the
values into a set and walks each chain from its one true bottom. The sort
spends `O(n log n)` to make the measuring itself trivial; the hash walk is
the one that meets the statement's linear-time aim.

## Hash set, walking from each sequence start

Pour every value into a hash set and "is x present?" becomes a constant-time question, so a consecutive run can be recognized from any of its members. The obvious move — walk forward from every element — looks quadratic, because a run of length L gets re-traversed by each of its L members. The escape is that every maximal run has exactly one beginning, and the set alone can identify it: `value` starts its run precisely when `value - 1` is absent.

The code iterates the set itself, which collapses duplicates before any walking happens. For each value with no predecessor it counts upward — `value`, `value + 1`, `value + 2`, … — while the set keeps answering, and keeps the largest count. Because the predecessor check skips every non-initial member, the inner climb runs at full length exactly once per maximal run: every value is probed once as a candidate and stepped on by at most one walk. Each element is touched a constant number of times, which is what the statement's `O(n)` demand actually requires — the other natural plan, sorting first, pays `O(n log n)` before it even starts scanning.

No port needs a wider integer: values sit inside ±10⁹, so both the predecessor probe `value - 1` and the final one-past-the-end probe stay comfortably inside 32-bit range, and JavaScript's doubles hold every integer here exactly. The set holds at most `n` distinct values, so memory stays linear in the input.

**Complexity:** `O(n)` time, `O(n)` space.

## Hash Set Streak

The chains we are measuring are a property of the _set_ of values, not of their
positions, and duplicates are irrelevant to them. So the first move is to pour
`nums` into a hash set: repeats collapse, and "is `x` here?" becomes a constant
time question.

With that in hand, the tempting plan — for each value, walk upward as far as
the set allows — looks quadratic, and it would be if every value started a
walk. The fix is a one-line guard. A value `v` can only be the bottom of a
maximal chain when `v - 1` is missing from the set, and every maximal chain has
exactly one such bottom. Restricting walks to those values means each chain is
traversed once in total rather than once per member, so across the whole run
each value is stepped over at most once inside a walk and inspected once by the
outer loop. Linear, despite the nesting.

Measuring is then just counting: from a chain bottom, keep incrementing while
the next value is present, and remember the largest count seen.

Nothing else needs special handling. An empty array yields an empty set and a
best of `0`. In `[-3,9,-2,-1,0,9,1]` the second `9` never survives into the set,
so it cannot inflate anything, and `9` itself is its own chain of length `1`
while `-3` opens the winning chain of `5`. Negative values are no different
from positive ones — the algorithm only ever adds or subtracts one.

**Complexity:** `O(n)` time, `O(n)` space.
