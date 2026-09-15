# Solutions — Count Substrings With K-Frequency Characters I

A substring is valid as soon as any letter inside it accumulates `k`
occurrences, and validity only grows toward the left: extending a valid
substring keeps every count it had. So for each right end there is a
threshold start — everything starting at or before it is valid, everything
after it is not — and the answer is the sum of those thresholds.

## Two pointers over the saturation threshold

Sweep the right end once, keeping a 26-slot frequency table of the current
window plus a counter of how many letters are saturated (frequency `>=
k`). While any letter is saturated, pop from the left — the start being
popped is still valid, and it takes one count off exactly one letter. When
the counter hits zero, the window just turned invalid, so the last popped
start was the smallest valid one for this right end: precisely `left`
starts (all indices before it) yield valid substrings ending here, and
`left` is added to the answer. The popped start never moves backward
between rights — appending a character can only push the first saturation
further left — so the whole sweep is linear despite counting quadratic
numbers of substrings.

The answer peaks at all substrings valid, `n(n+1)/2 = 4,501,500` for `n =
3000` — comfortably inside 32-bit range in every language, so plain int
arithmetic suffices; only the constant-size frequency table lives beyond
the loop.

**Complexity:** `O(n)` time, `O(1)` space (26 counters).
