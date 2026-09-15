# Solutions — Find X-Sum of All K-Long Subarrays I

## Per-window recount with sorted top-x

The limits are tiny (`n <= 50`), so the direct reading of the definition is
already the right algorithm: for each of the `n - k + 1` windows, count the
occurrences of every value in that window, order the distinct values by
count descending with the value itself breaking ties, and keep the first
`x` of them. The answer for the window is the sum of `value * count` over
the kept values.

The ordering rule does all the work. Sorting by `(count desc, value desc)`
means ties in frequency are won by the bigger value, exactly as the
procedure demands, and keeping only the first `x` entries degrades
gracefully when the window has fewer than `x` distinct values: all of them
survive the slice, so the result equals the plain window sum, which is
precisely the stated special case. Each window costs `O(k)` to count and
`O(d log d)` to order its `d <= k` distinct values, and the constants stay
minute at these limits.

**Complexity:** `O((n - k + 1) * k log k)` time, `O(k)` space.
