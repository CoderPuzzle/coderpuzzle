# Solutions — Find Beautiful Indices in the Given Array II

## KMP occurrence lists with a merge-style window

Naive scanning is hopeless at these sizes — a periodic text like `"abab..."`
with a short needle matches at nearly every position and drags every naive
rescan into quadratic work. The Knuth–Morris–Pratt failure function removes
that blowup: for each of `a` and `b` it precomputes, in one linear pass over
the pattern, the longest proper prefix that is also a suffix at every offset,
and that table lets a single scan of `s` recover **every** occurrence start
without ever re-examining a character. Both occurrence lists come out
ascending.

An index `i` from the first list is beautiful exactly when the second list
has an entry in the window `[i - k, i + k]`. Because both lists ascend and
`i - k` only grows as `i` advances, the first `b`-occurrence at or after
`i - k` never needs to move backwards: one two-pointer pass over the two
lists tests each window in amortized constant time and emits the beautiful
indices already in ascending order.

**Complexity:** `O(|s| + |a| + |b| + |occ(a)| + |occ(b)|)` time, `O(|occ(a)| + |occ(b)|)` space.
