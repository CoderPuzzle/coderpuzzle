# Solutions — Maximize Consecutive Elements in an Array After Modification

## Sort, then grow chains by ending value

Bumping an element by 1 only ever helps when the bumped value slots onto a run
that already ends just below it, so track runs by where they end: let `dp[v]`
be the longest stretch of consecutive distinct values ending at `v` that the
elements seen so far can occupy, each used element increased by 0 or 1.

Sort `nums` ascending and sweep it once. For the current element `a`, first
consider bumping it: any run ending at `a` extends to `a + 1`, so
`dp[a+1] = max(dp[a+1], dp[a] + 1)`. Then consider keeping it at `a`: any run
ending at `a - 1` extends to `a`, so `dp[a] = max(dp[a], dp[a-1] + 1)`. Both
updates must read the table before either write lands — otherwise the single
element would be counted on both sides of its own bump. Duplicates drive the
cascade: the first copy of `a` fills or extends the run ending at `a`, and
each later copy reads that updated entry and bumps past it, which is how
`[7,7,8,9,10]` becomes `{7,8,9,10,11}` in one pass. The answer is the largest
table value ever produced.

**Complexity:** `O(n log n)` time, `O(n)` space.
