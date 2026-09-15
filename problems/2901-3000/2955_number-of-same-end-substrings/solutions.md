# Solutions — Number of Same-End Substrings

A same-end substring is fully determined by choosing its first and last
position, so a query `[l, r]` really asks for the number of position pairs
`l <= i <= j <= r` with `s[i] == s[j]`. Every single position pairs with
itself, and each character appearing `t` times contributes `t * (t + 1) / 2`
pairs — so the answer is one frequency census of the range, not an
enumeration of substrings.

## Prefix counts per character

Building the answer per query by scanning the range is `O(n)` per query
and `O(n * q)` overall, which is too slow at the constraint maximum of
`3 * 10⁴` for both. Instead, precompute for each of the 26 letters a prefix
count over `s`: `cnt[c][j]` is how many times letter `c` occurs in the
first `j` characters. The table costs `O(26 * n)` time and space, and is
built once.

Each query `[l, r]` then reads, for every letter, the range frequency
`x = cnt[c][r + 1] - cnt[c][l]` in constant time and adds `x * (x + 1) / 2`
to the answer. The `+ 1` in the binomial counts the length-1 substrings,
which are same-end by definition. The largest possible answer is
`30000 * 30001 / 2 = 450015000`, comfortably inside signed 32-bit range, so
plain 32-bit integers carry every intermediate.

**Complexity:** `O(26 · (n + q))` time, `O(26 · n)` space.
