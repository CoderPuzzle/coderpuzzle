# Solutions — Number of Good Ways to Split a String

## Prefix and suffix distinct-letter counts

A good split at position `i` compares the number of distinct letters in
`s[0..i]` against the number of distinct letters in `s[i+1..n-1]`, for
every `i` from `0` to `n - 2`. Recomputing each side's distinct count from
scratch at every split point costs `O(n)` per split, so the key
observation is to precompute both sides once: a forward scan builds
`prefix[i]`, the count of distinct letters in `s[0..i]`, and a backward
scan builds `suffix[i]`, the count of distinct letters in `s[i..n-1]`.

Both scans use the same trick with a fixed 26-slot "seen" array (the
alphabet is only lowercase English letters, so a bitmask or boolean array
works instead of a hash map): walking one character at a time, a running
distinct counter increments only the first time a letter is seen, and the
counter's value after each step is recorded as that position's prefix (or
suffix) count. Once both arrays are built, a single pass over the `n - 1`
split points counts how many satisfy `prefix[i] == suffix[i + 1]`, which
is exactly the good-split condition with `sleft = s[0..i]` and
`sright = s[i+1..n-1]`.

**Complexity:** `O(n)` time, `O(n)` space for the two prefix/suffix
count arrays (the per-character bookkeeping itself is `O(1)`, bounded by
the 26-letter alphabet).
