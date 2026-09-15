# Solutions — First Element with Unique Frequency

## Two maps, then a left-to-right scan

Whether an element qualifies depends on a global property of the array —
how many distinct values share its frequency — so no prefix-only scan can
decide it. Two hash maps capture that global picture in one counting pass
each: `freq` maps each value to how often it appears, and `freqCount` maps
each frequency to how many distinct values have it. A value's frequency is
unique exactly when `freqCount[freq[x]] == 1`, i.e. it is the only value
in the entire array with that appearance count.

The final pass walks `nums` in index order and returns the first `x` whose
entry passes that test, so the leftmost qualifying element wins even when
several values have unique frequencies (Example 2 returns the leading 20)
and even when a smaller qualifying value shows up later. If the walk ends
without a hit, every value's frequency is shared and the method returns
-1, as in Example 3 where both values appear exactly twice.

Everything stays small: values are bounded by `10⁵`, so frequencies are at
most `10⁵` and at most `10⁵` distinct values exist to be counted — every
map key, map value, and the returned element fit comfortably in 32-bit
integers, and JavaScript's numbers hold them all exactly, far inside
`2⁵³`.

**Complexity:** `O(n)` time, `O(n)` space.
