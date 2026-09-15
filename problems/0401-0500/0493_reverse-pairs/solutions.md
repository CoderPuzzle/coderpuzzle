# Solutions — Reverse Pairs

Both methods replace the quadratic pair scan with a per-entry question —
standing on one entry, how many later entries does it more than double?
Merge sort answers wholesale: halving the array, sorting the halves, and
letting one two-pointer sweep per merge level count every cross pair at
once. The Fenwick tree answers online instead: walking in from the right
end, it asks a rank structure over the compressed values how many entries
already gone by the current one more than doubles.

## Merge-Sort Counting

A reverse pair links an earlier element to a later one, so the array can be split in half: pairs wholly inside either half are counted by recursing, and only the cross pairs — `left[i] > 2 * right[j]` — need dedicated work. That is exactly the merge-sort skeleton: the function recursively sorts both halves, counts pairs inside each, then counts cross pairs between the two now-sorted halves, then merges them and returns the sorted run upward.

The cross count exploits both halves being sorted with a two-pointer sweep that never moves backward. For each `left[i]` in increasing order, the pointer `j` advances over `right` while `left[i] > 2 * right[j]`; the value of `j` when the loop stops is the number of right-half elements satisfying the condition, added to the total. Because the next `left[i]` is at least as large, every element the pointer already passed also qualifies for it, so `j` continues from where it stopped instead of restarting — the whole pass over a merge level is linear. Using Python integers also sidesteps the overflow trap that `2 * nums[j]` sets in fixed-width languages, since values reach both int32 extremes.

The subsequent merge is the standard stable one (`left[i] <= right[j]` takes from the left), and the identity of elements is irrelevant beyond their values — only counts matter, so sorting loses nothing. Each recursion level does linear counting plus linear merging, and there are `log n` levels over `n` elements; the extra memory is the half-slices and merged lists, which along any active recursion path sum to the array size.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Fenwick over Compressed Ranks

Walking in from the right end inverts the question just as neatly as halving
the array does: by the time the walker arrives at an entry, every value it
has already processed is precisely the suffix to that entry's right, so the
tally grows by a rank query — "how many held values `v` satisfy
`2 * v < x`?" — and rank queries are what a Fenwick tree answers in
logarithmic time. Each step is query-then-insert: the prefix total below the
qualifying cut is added, and only then does `x` join the structure, which is
also what keeps an element from being counted against itself.

The full 32-bit value range rules out an offset table, so the ranks come
from sorting the distinct values — an `m`-slot universe with `m` at most
`n`. The beyond-double twist then moves the cut off `x`'s own rank: the
qualifying entries are those with `2 * v < x`, so the cut is binary-searched
over the doubled values (kept in a wide type, since doubling either int32
extreme wraps in 32 bits) and the prefix below it counts exactly the
right-hand entries `x` more than doubles; `x` itself is then inserted at its
own rank. On the first example the walk seats `2`, `5`, and `1` before `8`
arrives: the cut falls between values `3` and `5`, since `2 · 5 = 10` is not
below `8`, so the sweep credits `1` and `2` but not `5`; the final `3` finds
only `1` below its cut — four pairs, matching the merge.

No recursion and no merging: the array is never reordered, the order
statistics accumulate one insertion at a time, and each entry costs two
binary searches and two low-bit walks — `update` climbs with
`i += i & -i`, `query` descends with `i -= i & -i` — all logarithmic in
`m`. The extra memory is the sorted ranks, the doubled thresholds, and the
`m + 1` tree slots.

**Complexity:** `O(n log n)` time, `O(n)` space.
