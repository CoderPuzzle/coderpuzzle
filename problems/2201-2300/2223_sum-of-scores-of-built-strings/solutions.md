# Solutions — Sum of Scores of Built Strings

Both methods score the suffix starting at position `i` by how far it agrees
with the front of `s` — that agreement length is the Z-array entry `z[i]`,
with the convention `z[0] = n` for the whole-string suffix, and the answer is
the sum of the array. The hashing route never builds the array: it asks each
suffix one monotone question per bisection step — do these `L` characters
equal the first `L`? — and a pair of rolling hashes prices every question in
constant time. The Z-function pass earns the whole array in one sweep
instead, proving each character comparison once and reusing every match it
has already certified.

## Double-Hash LCPs with Per-Suffix Binary Search

The score of the suffix at `i` is the largest `L` with `s[i..i+L)` equal to
`s[0..L)`. Agreement for `L` characters implies agreement at every shorter
length — break the agreement at some character and every shorter window is
unaffected — so feasibility is monotone in `L`, and a binary search over
`[0, n - i]` locates each suffix's score with `O(log n)` probes instead of a
character-by-character crawl.

Each probe is substring equality, which rolling hashes answer from tables:
the hash of `s[0..L)` is the prefix-hash entry `pre[L]` outright, and the
hash of `s[i..i+L)` is `pre[i+L] - pre[i] * BASE^L`, normalized into range.
The tables are maintained under two independent moduli, `10^9+7` and
`10^9+9`, over a fixed base of 26 — deterministic constants, no randomized
choices anywhere. A window is accepted exactly when both moduli agree; a
coincidental double match is a collision, roughly one chance in `10^18` per
probe, so a wrong score anywhere across the `n log n` probes is vanishingly
unlikely. The fixed-width languages run the arithmetic in 64 bits
throughout; JavaScript and TypeScript split each multiply into 16-bit halves
so no intermediate exceeds `2^53`, where double arithmetic is still exact.

For `s = "xhyxhx"`: the suffix at position 3 bisects to `L = 2` (`"xh"`
matches the front), the suffix at position 5 to `L = 1`, the rest to 0, and
`s` itself scores 6 — the total 9 of the statement's second example. The
`n == 0` guard only keeps the allocations sane; the constraints promise
`n >= 1`.

**Complexity:** `O(n log n)` time, `O(n)` space, exact except for a
~1-in-`10^18`-per-probe double-hash collision.

## Z-function

The key observation is that every prefix-built string `s_i` is a suffix of the final string: characters are prepended, so `s_1` is the last character, `s_2` the last two, and `s_n = s` itself. The score of `s_i` — the longest common prefix of `s_i` and `s` — is therefore exactly `z[n - i]`, the length of the longest prefix of `s` that matches the suffix of `s` starting at position `n - i`. Summing all scores is just summing the Z-array, with the special case `z[0] = n` for `s_n` since a string is its own longest prefix.

The code computes the Z-array in the standard linear fashion by maintaining the rightmost-known match window `[left, right)`. For each position `i` inside the window, the already-computed value `z[i - left]` is a lower bound (capped at `right - i` so the claim never extends past verified territory); outside the window it starts at 0. A direct character-comparison loop then extends the match as far as it truly goes, and the window is moved whenever `i + z[i]` pushes past `right`. Every successful comparison strictly advances `right`, and `right` never decreases, so the total comparison work is `O(n)`.

The guard for `n == 0` keeps the array allocations sane, though the constraint promises `n >= 1`. The whole computation is a single left-to-right pass over the string plus one summation, and the only auxiliary storage is the `z` array itself.

**Complexity:** `O(n)` time, `O(n)` space.
