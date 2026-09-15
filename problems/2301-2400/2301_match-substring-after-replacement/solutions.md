# Solutions — Match Substring After Replacement

## Matched-position bitmasks with a bit-parallel window sweep

A replacement never chains: each character of sub is rewritten at most once,
straight to one of the targets its own pairs name. So everything reduces to a
two-argument predicate — `matched(old, new)` holds when `old == new` or the
pair `[old, new]` appears in mappings — and the answer is whether some start
`a` makes `matched(sub[j], s[a + j])` true for every position `j`. That
predicate is exactly what an O(1)-lookup boolean table over byte pairs would
encode, one probe per window position; it is also why transitive chains must
not compose: a character mapped to `b`, with `b` itself mapped to `c`, can
still only ever become `b`.

The sweep runs all windows at once, 64 positions per machine word. For every
byte value build one bitmask over the positions of s: bit `p` of `base[t]`
marks that `s[p]` is `t`; OR-ing `base[new]` into `matched[old]` for each
declared pair leaves bit `p` of `matched[old]` set exactly when
`matched(old, s[p])` — identity pairs come free because `matched` starts as a
copy of `base`. One wide integer `seen` then carries every surviving window:
bit `e` after `j + 1` characters marks a window whose first `j + 1`
positions match and that ends at `e`. Seeding is just `seen =
matched[sub[0]]`; each later character shifts the whole cohort one position
deeper into s and ANDs with that character's mask, so bit `e` survives step
`j` precisely when bit `e - 1` survived step `j - 1` for the prefix ending
there and `matched(sub[j], s[e])` holds — an induction on the window. Any
bit left after the last character is a full match.

Duplicate pairs just re-OR an existing mask; empty mappings leave `matched`
as plain character positions, so the sweep degenerates to exact substring
search. Whole alignments move per machine word, so the scan costs word ops
per pattern character instead of the `n * m` probes a window-by-window
table walk needs.

**Complexity:** `O((n + m + k) · n / 64)` time, `O(σ · n / 64)` space, for
`n = s.length`, `m = sub.length`, `k = mappings.length`, and the alphabet
size `σ <= 62`.
