# Solutions — Good Indices in a Digit String

## Length-anchored suffix comparison

The definition pins the candidate down to one window: a matching substring must
equal the decimal representation of `i`, and that representation has exactly
`len(str(i))` characters, so of all the substrings ending at `i` at most the
suffix of that one length can qualify. The scan visits each index `i` from
left to right, forms `str(i)`, and compares that single window against it;
a match records `i`, and because the visit order is increasing the result
comes out sorted with no post-processing.

Leading zeros resolve themselves rather than needing a rule: `str(i)` never
begins with a zero digit — the sole zero-leading representation is the
single character `"0"` for `i = 0` — so equality is a plain byte-for-byte
comparison and a window like `"01"` simply is not `"1"`. Indices 0 through 9
therefore test one character, two-digit indices test two, and so on; a window
that would start before the string does is skipped outright.

Within the constraint ceiling `n <= 10⁵` an index is at most six digits wide,
so the per-index comparison is a bounded constant and the whole pass is
effectively linear. The only storage beyond the returned array is the current
representation, a handful of characters reused at every step.

**Complexity:** `O(n · d)` time (d <= 6, the index width), `O(1)` auxiliary space.
