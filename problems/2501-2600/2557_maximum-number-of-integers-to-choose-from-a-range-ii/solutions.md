# Solutions — Maximum Number of Integers to Choose From a Range II

## Greedy Smallest Available Values

Taking the smallest available integer first is always safe: swapping any
chosen number for a smaller unchosen one frees budget without losing
count, so an optimal answer is exactly a prefix of the sorted allowed
integers. That reduces the search to walking the gaps between consecutive
banned values — `n` itself can be 10⁹, but only `banned.length ≤ 10⁵`
boundaries ever matter, because between bans every candidate is one run
of consecutive integers.

Each run starting at `lo` of length `avail` costs the arithmetic ladder
`avail · (2·lo + avail − 1) / 2`. Runs are swallowed whole while the
budget holds; the first run that cannot fit contains the cutoff, and
because every later candidate is strictly larger, nothing after it can be
afforded either — so a single binary search for the largest fitting
prefix inside that one run finishes the walk. Cost terms peak near
`avail · n ≈ 3·10¹⁸`: still inside signed 64-bit (the JavaScript and
TypeScript ports do their ladder arithmetic on bigint since that value
exceeds the exact-Number limit 2⁵³ ≈ 9·10¹⁵). The returned count is
bounded by the staircase identity — taking `c` items costs at least
`c(c+1)/2`, so `c ≤ √(2·10¹⁵) ≈ 4.5·10⁷`, comfortably below 2³¹.

Sorting dominates at `O(m log m)` for `m = banned.length`; the gap walk
adds `O(m)` plus one `O(log n)` search.

**Complexity:** `O(m log m)` time, `O(m)` space.
