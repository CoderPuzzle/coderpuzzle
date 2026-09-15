# Solutions — Strange Printer

## Interval DP on the stroke that fixes the left end

Let `dp[i][j]` be the fewest turns that print `s[i..j]`, with `dp[i][i] = 1`
and empty ranges free. Some stroke must leave `s[i]` standing, and pricing
it alone gives the baseline `dp[i][j] = dp[i+1][j] + 1`. But a stroke may
start and end anywhere, so this one can run on to any later `k` with
`s[k] == s[i]` at no extra cost: the suffix `s[k..j]` then reuses it as its
own stroke fixing `s[k]`, while the cells between are overwritten
afterwards and price as the gap on their own:
`dp[i][j] = min(dp[i][j], dp[i+1][k-1] + dp[k][j])`. Taking `k = i + 1`
merges equal neighbors — `aa` costs one turn, not two — so a whole run of
one letter falls to a single stroke: `aaabbb` is 2, and `aba` is 2, stroke
`aaa` first, then `b` over the middle.

Why the two options suffice: in any schedule for `s[i..j]`, look at the
last stroke whose ink survives on cell `i`, and let `k` be the last cell
where that same ink survives — `s[k] == s[i]` by definition. No later
stroke repaints `i` or `k`, and no later stroke can touch both a gap cell
and a suffix cell without crossing, and thereby repainting, the surviving
`k`; the turns after it finish the gap and the suffix independently, and
the two pieces meet only in the shared stroke. The schedule therefore
splits the way the recurrence prices — gap plus suffix when the ink
survives past `i`, the baseline when it survives on `i` alone.

The table fills bottom-up: `i` runs downward so row `i+1` is already
complete, `j` runs upward, and every `dp[k][j]` consulted lives in a
finished row `k > i`. Singleton ranges cost 1; chaining the merge through
a uniform run answers any all-equal string with 1 and two runs like
`aaabbb` with 2, while an alternating `abab…` of length `n` needs
`floor(n/2) + 1` — every second cell pins a fresh stroke. At the
`n = 100` ceiling the three nested loops stay under `10^6` inner steps,
comfortably inside the limits, and the whole table is `10^4` integers.

**Complexity:** `O(n^3)` time, `O(n^2)` space.
