# Solutions — 3Sum

Both sweeps rest on the same pin: hold one value of a would-be triple fixed,
and what is left to find is a pair summing to its negation. The hash variant
pins whichever value is in hand and asks a set of already-passed values
whether the partner it needs has shown up; the sorted variant pins the
smallest value and hunts the pair with converging pointers that need ordered
ground to walk. One buys its linear pair-hunt with a table, the other with a
sort — and either way the overall bill is quadratic, because there are `n`
pins to try.

## Hash Pair Scan

Sorting is not the only way to find a pair. A hash set answers "is the value
I need already behind me?" in constant time, and that is all the pair-hunt
actually requires — which is why this variant never orders the array at all.
Pin the value at `i`, scan right, and carry a set `seen` of the values passed
so far. The element in hand, `nums[j]`, closes a triple exactly when
`-(nums[i] + nums[j])` sits in `seen`; since `seen` only ever holds positions
strictly between `i` and `j`, the three values always occupy three different
positions. And unlike the converging pointers, which must meet the partners
in sorted order, this sweep does not care what order the values arrived in.

Duplicates are handled at both ends. Pinning the same value twice would only
re-scan a suffix the first occurrence already saw in full — its suffix is a
superset of every later one — so each distinct value is pinned once, at its
first occurrence. On the closing side, one value triple can close at several
different `j`: pinning `0` in `[0, 5, -5, 5, -5]` closes the same triple
twice. So triples are collected into a set keyed by their three sorted
values, and repeats collapse on arrival.

What the sorted walk gave the other variant for free, this one buys at the
till: the collected set is sorted once at the end, putting each triple's
values ascending and the triples themselves in lexicographic order. Each of
the at most `n` distinct pins runs one linear scan of constant-time set
operations, so the sweep is quadratic overall — the same bill as the
two-pointer walk, paid in hashing instead of sorting.

**Complexity:** `O(n²)` time, `O(n)` space beyond the triples it collects.

## Sort, then two pointers

After sorting a copy of the array, fix the smallest element of a candidate triplet at index `i` and find the other two with a two-pointer scan over the suffix: `left` just after `i`, `right` at the end. If the total is below zero the sum must grow, so `left` moves right; if above zero, `right` moves left; on zero the triplet is recorded. Working on a sorted array means every emitted triplet `[nums[i], nums[left], nums[right]]` is already in ascending order, and scanning `i` left to right emits the triplets themselves in lexicographic order, as the statement asks.

Duplicate suppression falls out of the sorted order. Reusing the same value for the fixed element would re-find the same pairs, so `i` skips forward whenever `nums[i] == nums[i-1]`. After a hit, both pointers advance and then run past any runs of equal values, so the same pair is never emitted twice for one `i`. There is also an early exit: once `nums[i] * 3 > 0`, the smallest remaining value is already positive and no triplet from here on can sum to zero, so the loop breaks.

The `sorted(nums)` call builds a fresh list, leaving the caller's array untouched. Sorting costs `O(n log n)` and each of the `n` fixed positions does one linear two-pointer sweep, which dominates.

**Complexity:** `O(n^2)` time, `O(n)` space.
