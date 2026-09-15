# Solutions — Find Beautiful Indices in the Given Array I

## Occurrence lists with a windowed lookup

An index `i` is beautiful exactly when it is an occurrence of `a` whose
window `[i - k, i + k]` contains an occurrence of `b`. Collecting both
occurrence lists once turns every per-index question into a lookup instead
of a rescan: the lists are built by repeated substring finds, each find
restarting one character past the previous hit so overlapping occurrences
(like `aa` inside `aaa`) are not skipped.

For each occurrence `i` of `a`, the b-list is sorted, so the only candidates
that can sit inside the window are those at or after `i - k`. A binary
search for the leftmost entry `>= i - k` settles the question: if that
entry is also `<= i + k` the index is beautiful, and if even this closest
qualifying candidate overshoots the right edge then no element does,
because everything earlier fell below the left edge. When `a` and `b` are
the same string the found occurrence pairs with itself (`j = i`), which the
lookup handles without special-casing; an empty b-list simply fails every
lookup.

Scanning the a-occurrences in ascending order appends the surviving indices
in ascending order automatically, so the required sorted output needs no
final sort.

**Complexity:** `O(n · (L + log n))` time — collecting the two occurrence
lists costs a scan per position with `L <= 10`, and each of the at most `n`
candidates pays one binary search — with `O(n)` space for the lists.
