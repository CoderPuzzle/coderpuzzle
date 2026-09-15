# Solutions — Maximum Difference Between Even and Odd Frequency I

The difference `freq(a1) - freq(a2)` splits into two independent extremes:
the numerator wants the largest frequency among characters appearing an odd
number of times, the denominator the smallest frequency among characters
appearing an even number of times.

## One counting pass, two extremes

Tally the 26 lowercase letters in a single scan. Then walk the tallies,
ignoring absent letters, and keep the maximum odd count and the minimum even
count; their difference is the answer. The constraints guarantee both
extremes exist, so the sentinels are always overwritten, and every value
involved sits between 0 and 100 — no overflow concerns in any language.

**Complexity:** `O(n)` time, `O(1)` extra space.
